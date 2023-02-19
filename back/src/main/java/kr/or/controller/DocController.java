package kr.or.controller;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.service.DocService;
import kr.or.vo.CommonBoard;
import kr.or.vo.Doc;
import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;

@RestController
@RequestMapping("/doc")
public class DocController {
	
	private DocService docservice;
	@Autowired
	public void setDocService(DocService docservice) {
		this.docservice = docservice;
	}
	
	//전체 일정 조회
	@RequestMapping(value="/list", method=RequestMethod.POST)
	public List<Doc> getDoc(@RequestBody Doc doc) {
		
		System.out.println("doc 전체일정조회");
		List<Doc> doclist = new ArrayList<Doc>();
	
		doclist = docservice.getDoc(doc.getUrl());
		
		System.out.println(doclist);
		return doclist;
	}
	
	//이미지 조회
	@RequestMapping(value="/viewImage", method=RequestMethod.POST)
	public void viewImage(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {
		
		docservice.getImge(url, content, request, response);
		
	}

	//문서 저장소 링크 등록
	@RequestMapping(value="/addDocLink", method=RequestMethod.POST)
	public int addDocLink(@RequestBody Doc doc) {
		System.out.println("컨트롤러 adddoclink");
		return docservice.addDocLink(doc);
	}
	
	
	@RequestMapping(value="/addDoc", method=RequestMethod.POST)
	public int addDoc(@RequestParam(value="doc") String docJson, @RequestParam(value="file") MultipartFile[] files, HttpServletRequest request) throws IOException {
		
		Doc doc = null;
	    ObjectMapper mapper = new ObjectMapper();
		
	    try {
	         //String to DTO
	         doc = mapper.readValue(docJson, Doc.class);
	         
	      } catch (Exception e) {
	         e.printStackTrace();
	      }
	    
	    //파일 명
		String filename = files[0].getOriginalFilename();
		//확장자
		String extension = filename.substring(filename.lastIndexOf("."));
		//확장자를 제외한 파일 명
		String onlyFileName = filename.substring(0, filename.lastIndexOf("."));
		
		//저장할 파일 명
		String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis())).concat(extension);
		String savePath = request.getServletContext().getRealPath("/resources/upload/docStorage_") + doc.getUrl() + "/" + saveFileName;
		
		// 파일이 저장될 경로
		String path = request.getServletContext().getRealPath("/resources/upload/docStorage_") + doc.getUrl();
		// 폴더 생성
		File folder = new File(path);
		if (!folder.exists()) {
		   folder.mkdirs();
		}
		
		System.out.println(savePath);
		
		// 썸네일 생성
	    byte[] bytes = files[0].getBytes();
	    String formatName = filename.substring(filename.lastIndexOf(".") + 1);
	    if (MediaType.IMAGE_JPEG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_PNG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_GIF.getSubtype().equals(formatName)) {
	    	
	    	String thumbnailSaveName = request.getServletContext().getRealPath("/resources/upload/docStorage_") + doc.getUrl() + "/thumb_" + saveFileName;
			File thumbnailFile = new File(thumbnailSaveName);
			Path savePath2 = Paths.get(savePath);
			doc.setUpload_type("image");
			
			try {
				Thumbnailator.createThumbnail(savePath2.toFile(), thumbnailFile, 100, 100);
				doc.setThumb(thumbnailSaveName);
			} catch (IOException e) {
				e.printStackTrace();
			}
	    }
		
		
		try {
		  File dest = new File(savePath);
		  files[0].transferTo(dest);
		} catch (IOException e) {
		   e.printStackTrace();
		   return -1;
		}
		
		doc.setOri_filename(files[0].getOriginalFilename());
		doc.setSave_filename(saveFileName);
		
		int result = docservice.addDoc(doc);
		System.out.println(result);
		return result;
	}
	
	
	
	
	
	// 파일 다운로드 전 사전 토큰 확인
	@RequestMapping(value = "/api/token", method = RequestMethod.GET)
	public int isToekn() {

		return 1;
	}

	// 파일 다운로드
	@RequestMapping(value = "/fileDown", method = RequestMethod.GET)
	public void downFile(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println(url);
		System.out.println(content);
		File file = new File(
				request.getServletContext().getRealPath("/resources/upload/docStorage_") + url + "/" + content);

		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ServletOutputStream sos = null;

		try {

			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			sos = response.getOutputStream();

			String reFilename = "";

			// IE로 실행한 경우인지 -> IE는 따로 인코딩 작업을 거쳐야 한다. request헤어에 MSIE 또는 Trident가 포함되어 있는지
			// 확인
			boolean isMSIE = request.getHeader("user-agent").indexOf("MSIE") != -1
					|| request.getHeader("user-agent").indexOf("Trident") != -1;

			if (isMSIE) {
				reFilename = URLEncoder.encode(content, "utf-8");
				reFilename = reFilename.replaceAll("\\+", "%20");
			} else {
				reFilename = new String(content.getBytes("utf-8"), "ISO-8859-1");
			}

			response.setContentType("application/octet-stream;charset=utf-8");
			response.addHeader("Content-Disposition", "attachment;filename=\"" + reFilename + "\"");
			response.setContentLength((int) file.length());

			int read = 0;
			while ((read = bis.read()) != -1) {
				sos.write(read);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	
 
 
	
}

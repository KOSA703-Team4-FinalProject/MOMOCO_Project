package kr.or.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
	public List<Doc> getDoc(@RequestBody Doc url) {
		
		System.out.println("doc 전체일정조회");
		List<Doc> doc = new ArrayList<Doc>();
	
		doc = docservice.getDoc(url.getUrl());
		System.out.println(doc);
		return doc;
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
		
	    byte[] bytes = files[0].getBytes();
	    String formatName = filename.substring(filename.lastIndexOf(".") + 1);
	    if (MediaType.IMAGE_JPEG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_PNG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_GIF.getSubtype().equals(formatName)) {
	      // 썸네일 생성
	      File thumbnail = new File(savePath);
	      Thumbnails.of(new ByteArrayInputStream(bytes)).size(100, 100).toFile(thumbnail);
	    }
		
		
		try {
		  File dest = new File(savePath);
		  files[0].transferTo(dest);
		} catch (IOException e) {
		   e.printStackTrace();
		   return -1;
		}
		
		doc.setOri_filename(files[0].getOriginalFilename());
		doc.setThumb("thumb_" + files[0].getOriginalFilename());
		doc.setSave_filename(saveFileName);
		
		int result = docservice.addDoc(doc);
		System.out.println(result);
		return result;
	}
	
	@RequestMapping("/download")
	public void downDoc(String url, String filename, HttpServletRequest request , HttpServletResponse response) throws IOException {
		  docservice.downDoc(url, filename, request, response);
	}
	
 
 
	
}

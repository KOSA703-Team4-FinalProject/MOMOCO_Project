package kr.or.service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.dao.DocDao;
import kr.or.vo.Doc;
import net.coobird.thumbnailator.Thumbnails;

@Service
public class DocService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 문서저장소 리스트
	public List<Doc> getDoc(String url) {

		List<Doc> doc = new ArrayList<Doc>();

		try {

			DocDao docdao = sqlsession.getMapper(DocDao.class);
			doc = docdao.getDoc(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return doc;
	}
	
	
//	public int addDoc(String docJson, MultipartFile file, HttpServletRequest request) {
//		try {
//			DocDao docDao = sqlsession.getMapper(DocDao.class);
//			String fileName = "";
//			
//			System.out.println("docJson : " + docJson);
//			Doc doc = null;
//			ObjectMapper mapper = new ObjectMapper();
//			try {
//				doc = mapper.readValue(docJson, Doc.class);
//				doc.setFile(file);
//				System.out.println("매핑후 doc : " + doc);
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//			
//			
//			if (file.isEmpty()) {
//		        return -2;
//		    }
//
//		    String originalFileName = file.getOriginalFilename();
//		    String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
//		    String onlyFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
//
////		    // 파일 타입 제한
////		    if (!extension.equals(".exe")) {
////		        return -3;
////		    }
//		    
//		    // 파일 저장
//		    String saveFileName = onlyFileName + "_" + System.currentTimeMillis() + extension;
//		    String savePath = request.getServletContext().getRealPath("/resources/upload/docStorage_" + doc.getUrl() + "/" + saveFileName);
//		    
//		    // 파일이 저장될 경로
//	 		String saveFolderPath = request.getServletContext().getRealPath("/resources/upload/docStorage_" + doc.getUrl());
//	 		
//	 		// 폴더 생성
//	 		File folder = new File(saveFolderPath);
//	 		if (!folder.exists()) {
//	 			folder.mkdirs();
//	 		}
//
//		    // 이미지 일 경우
//		    byte[] bytes = file.getBytes();
//		    String formatName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
//		    if (MediaType.IMAGE_JPEG.getSubtype().equals(formatName) ||
//		        MediaType.IMAGE_PNG.getSubtype().equals(formatName) ||
//		        MediaType.IMAGE_GIF.getSubtype().equals(formatName)) {
//		      // 썸네일 생성
//		      File thumbnail = new File(savePath);
//		      Thumbnails.of(new ByteArrayInputStream(bytes)).size(100, 100).toFile(thumbnail);
//		    }
//		    
//		    try {
//		        File dest = new File(savePath);
//		        file.transferTo(dest);
//		    } catch (IOException e) {
//		        e.printStackTrace();
//		        return -1;
//		    }
//			
//			doc.setOri_filename(file.getOriginalFilename());
//			doc.setSafe_filename(fileName);
//			doc.setThumb("thumb_" + file.getOriginalFilename());
//			System.out.println("service doc : " + doc);
//			
//			//int result = docDao.addDoc(doc, file);
//			
//			//return result;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return -1;
//		}
//	}

	
	// 파일 다운로드 서비스 함수
		public void downDoc(String url, String filename, HttpServletRequest request, HttpServletResponse response)
			throws IOException {

				String fname = new String(filename.getBytes("euc-kr"), "8859_1");
				response.setHeader("Content-Disposition", "attachment;filename=" + fname + ";");

				String fullpath = request.getServletContext().getRealPath("/resources/upload/docStorage_" + url + "/" + filename);
				System.out.println(fullpath);
				FileInputStream fin = new FileInputStream(fullpath);

				ServletOutputStream sout = response.getOutputStream();
				byte[] buf = new byte[1024]; // 전체를 다읽지 않고 1204byte씩 읽어서
				int size = 0;
				while ((size = fin.read(buf, 0, buf.length)) != -1) {
					sout.write(buf, 0, size);
				}
				fin.close();
				sout.close();
			}


}
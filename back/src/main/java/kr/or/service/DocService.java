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
	
	
	public int addDoc(Doc doc, MultipartFile file) {
		try {
			DocDao docDao = sqlsession.getMapper(DocDao.class);
			
			String fileName = saveFile(file, doc.getUrl());
			doc.setOri_filename(file.getOriginalFilename());
			doc.setSafe_filename(fileName);
			doc.setThumb("thumb_" + file.getOriginalFilename());
			
			int result = docDao.addDoc(doc, file);
			
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}

	private String saveFile(MultipartFile file, String url) throws IOException {
	    // 파일이 존재하지 않으면 null을 return 한다.
	    if (file.isEmpty()) {
	        return null;
	    }

	    String originalFileName = file.getOriginalFilename();
	    String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
	    String onlyFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));

	    // 파일 타입 제한
	    if (!extension.equals(".exe")) {
	        return null;
	    }

	    // 파일 저장
	    String saveFileName = onlyFileName + "_" + System.currentTimeMillis() + extension;
	    String savePath = "/docStorage_" + url + "/" + saveFileName;

	    // 이미지 일 경우
	    byte[] bytes = file.getBytes();
	    String formatName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
	    if (MediaType.IMAGE_JPEG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_PNG.getSubtype().equals(formatName) ||
	        MediaType.IMAGE_GIF.getSubtype().equals(formatName)) {
	      // 썸네일 생성
	      File thumbnail = new File(savePath);
	      Thumbnails.of(new ByteArrayInputStream(bytes)).size(100, 100).toFile(thumbnail);
	      return "thumb_" + originalFileName;
	    }
	    
	    try {
	        File dest = new File(savePath);
	        file.transferTo(dest);
	    } catch (IOException e) {
	        e.printStackTrace();
	        return null;
	    }

	    return saveFileName;
	}
	
	// 파일 다운로드 서비스 함수
		public void downDoc(String url, String filename, HttpServletRequest request, HttpServletResponse response)
			throws IOException {

				String fname = new String(filename.getBytes("euc-kr"), "8859_1");
				response.setHeader("Content-Disposition", "attachment;filename=" + fname + ";");

				String fullpath = request.getServletContext().getRealPath("/docStorage_" + url + "/" + filename);
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
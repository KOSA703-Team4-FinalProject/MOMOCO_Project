package kr.or.service;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import kr.or.dao.CalendarDao;
import kr.or.dao.DocDao;

import kr.or.vo.Doc;

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
	
	/*
	
	// 문서저장소 글쓰기
	public int addDoc(Doc doc, MultipartFile file) {
		
		String filePath = saveFile(file);		
		
		Map<Doc, Object> postData = new HashMap()<>();
		
		
		if(file != null) {  //1개라 업로드된 파일이 존재하면
			
			filename = file.getOriginalFilename(); //db에 입력될 파일명
			String path = request.getServletContext().getRealPath("/docStorage_" + doc.getUrl() + "/upload"); 
			String fpath = path + "\\" + filename;
			System.out.println(fpath);
			
			if(!filename.equals("")) {  //실 파일 업로드 (웹서버)
				FileOutputStream fs =null;
				try {
				     fs = new FileOutputStream(fpath);
				     fs.write(file.getBytes());
					     
				} catch (Exception e) {
					e.printStackTrace();
				}finally {
					 try {
						fs.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
	    }
		//파일명 (DTO)
		doc.setOri_filename(filename);
		try {
				//동기화/////////////////////////////////////////////////////
			 	DocDao docdao = sqlsession.getMapper(DocDao.class);
				///////////////////////////////////////////////////////////	
			    result = docdao.addDoc(doc);	//DB 인서트
		} catch (Exception e) {
			e.printStackTrace();
		} 
	  return result;
	}
	
	//문서 다운로드
	public void downDoc(String url, String p, String f, HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		String fname = new String(f.getBytes("euc-kr"), "8859_1");
		response.setHeader("Content-Disposition", "attachment;filename=" + fname + ";");
	
		String fullpath = request.getServletContext().getRealPath("/docStorage_" + url + "/" + p + "/" + f);
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

	// 일정 읽기
	public CalendarAll readCalendar(CalendarAll all) {
		CalendarAll cal = new CalendarAll();

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			cal = calendardao.getCalendarByTitle(all);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cal;
	}
*/
}
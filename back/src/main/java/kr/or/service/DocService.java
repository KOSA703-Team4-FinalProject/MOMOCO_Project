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

import kr.or.dao.CommonBoardDao;
import kr.or.dao.DocDao;
import kr.or.vo.CommonBoard;
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
	
	
	public int addDoc(Doc doc) {
		int result =0;
		try {
			DocDao docdao = sqlsession.getMapper(DocDao.class);
			result=docdao.addDoc(doc);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	
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
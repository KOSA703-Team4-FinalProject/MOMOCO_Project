package kr.or.service;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.dao.CommonBoardDao;
import kr.or.dao.DocDao;
import kr.or.vo.Board;
import kr.or.vo.CommonBoard;
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

	public int addDocLink(Doc doc) {
		int result =0;
		try {
			DocDao docdao = sqlsession.getMapper(DocDao.class);
			result=docdao.addDocLink(doc);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@Transactional
	public int updateDoc(Doc doc) {
		int result = 0;
	    try {
	        Board board = new Board();
	        board.setNickname(doc.getNickname());
	        board.setTitle(doc.getTitle());
	        board.setContent(doc.getContent());
	        board.setLabel(doc.getLabel());
	        board.setU_idx(doc.getU_idx());
	        
	        DocDao docdao = sqlsession.getMapper(DocDao.class);
	        result = docdao.updateDoc(doc);
	        result = docdao.updateBoard(doc);

	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return result;
	}
	
	@Transactional
	public int updateDocLink(Doc doc) {
		int result = 0;
	    try {
	        Board board = new Board();
	        board.setNickname(doc.getNickname());
	        board.setTitle(doc.getTitle());
	        board.setContent(doc.getContent());
	        board.setLabel(doc.getLabel());
	        board.setU_idx(doc.getU_idx());
	        
	        DocDao docdao = sqlsession.getMapper(DocDao.class);
	        result = docdao.updateDocLink(doc);
	        result = docdao.updateBoard(doc);

	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return result;
	}
	
	//삭제
	public int deleteDoc(Doc doc) {
		int result =0;
		try {
			DocDao docdao = sqlsession.getMapper(DocDao.class);
			result = docdao.deleteDoc(doc);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	// 이미지 파일 보기
	public void getImge(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {

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
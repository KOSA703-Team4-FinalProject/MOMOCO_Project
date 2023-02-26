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

import kr.or.dao.BoardDao;
import kr.or.dao.CommonBoardDao;
import kr.or.vo.Board;
import kr.or.vo.CommonBoard;

@Service
public class CommonBoardService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 글 전체 확인
	public List<CommonBoard> getBoard(CommonBoard commonboard) {

		List<CommonBoard> board = new ArrayList<CommonBoard>();

		try {

			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board = boarddao.getBoard(commonboard);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return board;
	}

	// 글읽기
	public CommonBoard getBoardByIdx(CommonBoard commonboard) {
		CommonBoard cmm = new CommonBoard();

		try {

			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			cmm = commonboarddao.getBoardByIdx(commonboard);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return cmm;
	}

	// 글쓰기
	public int addCommonBoard(CommonBoard all) {
		int result = 0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result = commonboarddao.addCommonBoard(all);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	// 글 수정하기
	public int updateCommonBoard(CommonBoard idx) {
		int result = 0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result = commonboarddao.updateCommonBoard(idx);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	// 삭제
	public int delectCommonboard(CommonBoard com) {
		int result = 0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result = commonboarddao.deletecommonboard(com);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	// 알림보낼 사람 선택하기
	public List<CommonBoard> boardalramlist(String url) {
		List<CommonBoard> board = new ArrayList<CommonBoard>();
		try {
			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board = boarddao.boardalramlist(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;
	}

	// 검색
	public List<CommonBoard> commonboardSearch(CommonBoard string) {
		List<CommonBoard> board = new ArrayList<CommonBoard>();
		try {
			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board = boarddao.commonboardSearch(string);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;

	}

	// 글 수정하기
	@Transactional
	public int modifyCommonBoard(CommonBoard all) {
		int result = 0;
		try {
			Board board = new Board();
			board.setIdx(all.getIdx());
			board.setContent(all.getContent());
			board.setLabel(all.getLabel());
			board.setU_idx(all.getU_idx());
			board.setTitle(all.getTitle());

			CommonBoardDao commboard = sqlsession.getMapper(CommonBoardDao.class);
			result = commboard.updateCommonBoard(all);
			result = commboard.updateBoard(all);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	// 답글쓰기
	public int replyCommonBoard(CommonBoard all) {
		int result = 0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result = commonboarddao.replyCommonBoard(all);
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

		File file = new File(request.getServletContext().getRealPath("/resources/upload/board_") + url + "/" + content);

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

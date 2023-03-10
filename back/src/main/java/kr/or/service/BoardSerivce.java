package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.BoardDao;
import kr.or.dao.CommonBoardDao;
import kr.or.vo.Board;
import kr.or.vo.CommonBoard;

@Service
public class BoardSerivce {
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;

	}

	// 알람에서 사용, 해당 알람이 발생할 게시글 찾기
	public Board getBoardByTitle(Board board) {

		Board reboard = new Board();

		try {

			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			reboard = boarddao.getBoardByTitle(board);
			System.out.println("reboardgetbytitle : " + reboard);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return reboard;
	}

	// 모든보드검색
	public List<Board> allBoardList(Board url) {
		List<Board> board = new ArrayList<Board>();

		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.allBoardList(url);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;
	}

	// 보드번호 검색
	public List<Board> searchboardnumber(Board search) {
		List<Board> board = new ArrayList<Board>();
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.searchboardnumber(search);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return board;
	}

	// 검색
	public List<Board> boardSearch(Board string) {
		List<Board> board = new ArrayList<Board>();
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.boardSearch(string);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;
	}

	// 자신이 읽지 않은글
	public List<Board> notread(Board url) {
		List<Board> board = new ArrayList<Board>();
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.notread(url);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return board;
	}
	
	//최신글 4개 불러오기
	public List<Board> getNewBoardList(String url) {
		List<Board> boardlist = new ArrayList<Board>();
		
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			boardlist = boarddao.getNewBoardList(url);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return boardlist;
	}
	
	//안읽은 데이터 4개 불러오기
	public List<Board> getNotReadBoardList(String url, int u_idx) {
List<Board> boardlist = new ArrayList<Board>();
		
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			
			Board board = new Board();
			board.setUrl(url);
			board.setU_idx(u_idx);
			
			boardlist = boarddao.getNotReadBoardList(board);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return boardlist;
	}
	
}

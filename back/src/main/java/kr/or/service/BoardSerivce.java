package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.BoardDao;
import kr.or.vo.Board;

@Service
public class BoardSerivce {
	private SqlSession sqlsession;
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession =sqlsession;
		
	}
	
	//알람에서 사용, 해당 알람이 발생할 게시글 찾기
	public Board getBoardByTitle(Board board) {
		
		Board reboard = new Board();
		
		try {
			
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			reboard = boarddao.getBoardByTitle(board);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return reboard;
	}
	
	//allboardlist
	public List<Board>allBoardList(String url){
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
	
}

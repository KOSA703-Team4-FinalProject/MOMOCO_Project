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
public class BoardService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//글 전체 확인
	public List<Board> getBoard() {
		
		List<Board> board = new ArrayList<Board>();
		
		try {
			
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.getBoard();
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return board;
	}
	
}

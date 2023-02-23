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
	
	//모든보드검색
	public List<Board>allBoardList(Board url){
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
	
	//보드번호 검색
	public List<Board>searchboardnumber(Board search){
		List<Board> board = new ArrayList<Board>();
		try {
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			board = boarddao.searchboardnumber(search);
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
			}catch (SQLException e) {
			e.printStackTrace();
			}
	
		return board;
	}
	
	//검색
		public List<Board>boardSearch(Board string){
			List<Board> board = new ArrayList<Board>();
			try {
				BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
				board =boarddao.boardSearch(string);
				
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
				}catch (SQLException e) {
				e.printStackTrace();
				}
			return board;
		}

}

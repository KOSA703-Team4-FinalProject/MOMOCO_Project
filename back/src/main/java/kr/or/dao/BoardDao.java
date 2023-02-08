package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Board;
import lombok.Data;


public interface BoardDao {

	//전체 글 확인
	public List<Board> getBoard() throws ClassNotFoundException, SQLException;
	
	//특정 글 확인
	public Board getBoardByIdx() throws ClassNotFoundException, SQLException;
	
	//글 추가
	public int addBoard(Board board) throws ClassNotFoundException, SQLException;
	
	//글 수정
	public int updateBoard(Board board) throws ClassNotFoundException, SQLException;
	
	//글 삭제
	public int deleteBoard(int idx) throws ClassNotFoundException, SQLException;
	
}

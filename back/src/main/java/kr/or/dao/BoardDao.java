package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.Board;

public interface BoardDao {
	 
	//알람에서 사용, 해당 알람이 발생할 게시글 찾기
	public Board getBoardByTitle(Board board) throws ClassNotFoundException, SQLException;
	
}

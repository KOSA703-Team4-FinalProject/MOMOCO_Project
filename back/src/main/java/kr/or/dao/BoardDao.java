package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.Board;

public interface BoardDao {
	
	//수정
	public int modifyBoard(Board board) throws ClassNotFoundException, SQLException;

}

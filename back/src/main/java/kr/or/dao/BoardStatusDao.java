package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.BoardStatus;

public interface BoardStatusDao {

	//게시글 - 상태 수정
	public int modifyBoardStatus(BoardStatus boardstatus) throws ClassNotFoundException, SQLException;
	
}

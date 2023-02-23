package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Board;
import kr.or.vo.CommonBoard;

public interface BoardDao {
	 
	//알람에서 사용, 해당 알람이 발생할 게시글 찾기
	public Board getBoardByTitle(Board board) throws ClassNotFoundException, SQLException;
	
	//전체 보드 리스트 
	public List<Board> allBoardList(String url) throws ClassNotFoundException, SQLException;

	//보드번로호로 검색
	public List<Board> searchboardnumber (Board search)throws ClassNotFoundException, SQLException;
	
	//타이틀 + 제목으로 검색
	public List<Board> boardSearch (Board search) throws ClassNotFoundException, SQLException;
	

}

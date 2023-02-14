package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.CommonBoard;

public interface CommonBoardDao {
	
	//전체게시판 리스트 
	public  List<CommonBoard> getBoard(String url) throws ClassNotFoundException, SQLException;
	
	//글읽기
	public CommonBoard getBoardByIdx(CommonBoard idx) throws ClassNotFoundException, SQLException;
	
	//글쓰기
	public int addCommonBoard(CommonBoard all) throws ClassNotFoundException, SQLException;
	
	//글삭제
	public int deletecommonboard(CommonBoard cmm)throws ClassNotFoundException, SQLException;
	
	
}

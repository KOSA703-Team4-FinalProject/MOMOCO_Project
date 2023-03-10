package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Checked;
import kr.or.vo.CommonBoard;

public interface CommonBoardDao {
	
	//전체게시판 리스트 
	public  List<CommonBoard> getBoard(CommonBoard cmm) throws ClassNotFoundException, SQLException;
	
	//글읽기
	public CommonBoard getBoardByIdx(CommonBoard idx) throws ClassNotFoundException, SQLException;
	
	//글쓰기
	public int addCommonBoard(CommonBoard all) throws ClassNotFoundException, SQLException;
	
	//글삭제
	public int deletecommonboard(CommonBoard cmm)throws ClassNotFoundException, SQLException;
	
	//알림보낼 사람 선택하기
	public List<CommonBoard> boardalramlist(String url) throws ClassNotFoundException, SQLException;
	
	//글수정하기
	public int updateCommonBoard (CommonBoard idx) throws ClassNotFoundException, SQLException;
	//board업데이트
	public int updateBoard (CommonBoard idx) throws ClassNotFoundException, SQLException;
	//검색
	public List<CommonBoard> commonboardSearch (CommonBoard search) throws ClassNotFoundException, SQLException;

	//답글쓰기
	public int replyCommonBoard (CommonBoard all)throws ClassNotFoundException, SQLException;

	//글쓰기 2
	public int writeBoard(CommonBoard all) throws ClassNotFoundException, SQLException;
	
		
}

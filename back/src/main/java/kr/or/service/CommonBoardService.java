package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.CommonBoardDao;
import kr.or.vo.CommonBoard;

@Service
public class CommonBoardService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 글 전체 확인
	public List<CommonBoard> getBoard(String url) {

		List<CommonBoard> board = new ArrayList<CommonBoard>();

		try {

			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board = boarddao.getBoard(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return board;
	}

	// 글읽기
	public CommonBoard getBoardByIdx(CommonBoard commonboard) {
		CommonBoard cmm = new CommonBoard();

		try {

			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			cmm = commonboarddao.getBoardByIdx(commonboard);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return cmm;
	}
	//글쓰기
	public int addCommonBoard(CommonBoard all) {
		int result =0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result=commonboarddao.addCommonBoard(all);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	//삭제
	public int delectCommonboard(CommonBoard com) {
		int result =0;
		try {
			CommonBoardDao commonboarddao =sqlsession.getMapper(CommonBoardDao.class);
			result = commonboarddao.deletecommonboard(com);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	//알림보낼 사람 선택하기
	public List<CommonBoard> boardalramlist(String url){
		List<CommonBoard> board = new ArrayList<CommonBoard>();
		try {
			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board = boarddao.boardalramlist(url);
			
			}catch (ClassNotFoundException e) {
			e.printStackTrace();
			}catch (SQLException e) {
			e.printStackTrace();
			}
		return board;
	}
	
	
}

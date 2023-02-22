package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.BoardDao;
import kr.or.dao.CommonBoardDao;
import kr.or.vo.Board;
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
	
	//글 수정하기
	public int updateCommonBoard(CommonBoard idx) {
		int result = 0;
		try {
			CommonBoardDao commonboarddao = sqlsession.getMapper(CommonBoardDao.class);
			result= commonboarddao.updateCommonBoard(idx);
			
		}catch (ClassNotFoundException e) {
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
	//검색
	public List<CommonBoard>commonboardSearch(CommonBoard string){
		List<CommonBoard> board = new ArrayList<CommonBoard>();
		try {
			CommonBoardDao boarddao = sqlsession.getMapper(CommonBoardDao.class);
			board =boarddao.commonboardSearch(string);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			}catch (SQLException e) {
			e.printStackTrace();
			}
		return board;
		
	}

	//글 수정하기
	@Transactional
	public int modifyCommonBoard( CommonBoard all) {
	    int result = 0;
	    try {
	        Board board = new Board();
	        board.setIdx(all.getIdx());
	        board.setContent(all.getContent());
	        board.setLabel(all.getLabel());
	        board.setU_idx(all.getU_idx());
	        board.setTitle(all.getTitle());

	        System.out.println("이거뭐임" + board.toString());

	        CommonBoardDao commboard = sqlsession.getMapper(CommonBoardDao.class);
	        result = commboard.updateCommonBoard(all);
	        result = commboard.updateBoard(all);

	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return result;
	}
	
}

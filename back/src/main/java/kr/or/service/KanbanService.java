package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.BoardDao;
import kr.or.dao.BoardStatusDao;
import kr.or.dao.CalendarDao;
import kr.or.dao.CommonBoardDao;
import kr.or.dao.KanbanDao;
import kr.or.dao.WorkSpaceDao;
import kr.or.vo.Board;
import kr.or.vo.BoardStatus;
import kr.or.vo.CommonBoard;
import kr.or.vo.Kanban;

@Service
public class KanbanService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 칸반 전체 목록 불러오기
	public List<Kanban> getKanban(String url) {
		List<Kanban> kanban = new ArrayList<Kanban>();

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			kanban = kanbandao.getKanban(url);
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return kanban;
	}

	// 상태값으로 쓰여진 캘린더, 칸반 아이템 모두 불러오기
	public List<Board> getItembyStatus(String url, int s_idx) {
		List<Board> itembyStatus = new ArrayList<Board>();

		try {
			KanbanDao kanbanDao = sqlsession.getMapper(KanbanDao.class);
			itembyStatus = kanbanDao.getItembyStatus(url, s_idx);
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return itembyStatus;
	}

	// 칸반 아이템 추가
	public int addKanban(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.addKanban(kanban);
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return result;
	}

	public int addKanbanColumn(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.addKanbanColumn(kanban);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return result;
	}

	// 칸반 위치 수정 임시
	public int updateLocation(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.updateKanbanLocation(kanban);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}

	// 칸반 모든 아이템 삭제
	public int deleteAllKanbanItem(Kanban kanban) {
		int result = 0;

		try {

			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.deleteAllKanbanItem(kanban);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	// 칸반 아이템 삭제
	public int KanbanItemDelete(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.KanbanItemDelete(kanban);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	public int deleteKanbanColumn(Kanban kanban) {
		int result = 0;

		try {

			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.deleteKanbanColumn(kanban);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	public int modifyKanbanColumnName(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.modifyKanbanColumnName(kanban);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	public Kanban GetKanbanItemDetail(Kanban kanban) {
		Kanban kanbandetail = new Kanban();

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			kanbandetail = kanbandao.GetKanbanItemDetail(kanban);
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return kanbandetail;
	}



	// 칸반 아이템 수정
	public int modifyKanbanItem(Kanban kanban) {
		int result = 0;

		try {
			KanbanDao kanbandao = sqlsession.getMapper(KanbanDao.class);
			result = kanbandao.modifyKanbanItem(kanban);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

}

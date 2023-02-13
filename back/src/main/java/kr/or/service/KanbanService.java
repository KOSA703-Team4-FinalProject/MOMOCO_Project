package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.KanbanDao;
import kr.or.vo.Kanban;

@Service
public class KanbanService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

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
	
	

}

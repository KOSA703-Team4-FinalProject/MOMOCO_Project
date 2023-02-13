package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Kanban;

//CRUD123
public interface KanbanDao {

	// 전체 칸반 조회
	public List<Kanban> getKanban(String url) throws ClassNotFoundException, SQLException;

	public int addKanban(Kanban kanban) throws ClassNotFoundException, SQLException;

}

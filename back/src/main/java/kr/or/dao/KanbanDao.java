package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Kanban;

//CRUD
public interface KanbanDao {

	// 전체 칸반 조회
	public List<Kanban> getKanban(String url) throws ClassNotFoundException, SQLException;

	// 칸반 아이템 추가
	public int addKanban(Kanban kanban) throws ClassNotFoundException, SQLException;

	// 칸반 컬럼 추가
	public int addKanbanColumn(Kanban kanban) throws ClassNotFoundException, SQLException;

	// 칸반 위치 옮기기 임시
	public int updateKanbanLocation(Kanban kanban)throws ClassNotFoundException, SQLException;
	
	

}

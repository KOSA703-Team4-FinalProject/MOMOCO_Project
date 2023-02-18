package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Board;
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

	
	// 칸반 전체삭제 
	public int deleteAllKanbanItem(Kanban kanban)throws ClassNotFoundException, SQLException;
	// 칸반 컬럼 삭제
	public int deleteKanbanColumn(Kanban kanban)throws ClassNotFoundException, SQLException;
	// 칸반 컬럼명 수정
	public int modifyKanbanColumnName(Kanban kanban)throws ClassNotFoundException, SQLException;

	public List<Board> getItemByStatus(String url, String s_idx)throws ClassNotFoundException, SQLException;

	
	

}

package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.or.vo.Board;
import kr.or.vo.CommonBoard;
import kr.or.vo.Kanban;

//CRUD
public interface KanbanDao {

	// 전체 칸반 조회
	public List<Kanban> getKanban(String url) throws ClassNotFoundException, SQLException;
	
	// 상태값으로 캘린더, 칸반 조회
	
	public List<Board> getItembyStatus(@Param("url") String url, @Param("s_idx") int s_idx) throws ClassNotFoundException, SQLException;

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
	
	// 칸반 아이템 개별 삭제
	public int KanbanItemDelete(Kanban kanban)throws ClassNotFoundException, SQLException;
	// 칸반 컬럼명 수정
	public int modifyKanbanColumnName(Kanban kanban)throws ClassNotFoundException, SQLException;

	// 칸반 상세보기
	public Kanban GetKanbanItemDetail(Kanban kanban) throws ClassNotFoundException, SQLException;

	


}

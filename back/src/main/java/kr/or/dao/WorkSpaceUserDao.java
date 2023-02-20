package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.WorkSpaceUser;

public interface WorkSpaceUserDao {
	
	//유저가 가진 워크스페이스 권한 탐색
	public WorkSpaceUser getWorkSpaceUser(WorkSpaceUser workspaceuser) throws ClassNotFoundException, SQLException;

	//워크스페이스 안의 팀원들 조회
	public List<WorkSpaceUser> getWorkSpaceUserList(WorkSpaceUser workspaceuser) throws ClassNotFoundException, SQLException;
	
	//워크스페이스에 일반 유저 삽입 
	public int insertWorkUser(WorkSpaceUser workspaceuser) throws ClassNotFoundException, SQLException;
	
}

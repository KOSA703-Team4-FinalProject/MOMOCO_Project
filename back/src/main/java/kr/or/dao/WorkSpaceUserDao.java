package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.WorkSpaceUser;

public interface WorkSpaceUserDao {
	
	//유저가 가진 워크스페이스 권한 탐색
	public WorkSpaceUser getWorkSpaceUser(WorkSpaceUser workspaceuser) throws ClassNotFoundException, SQLException;

}

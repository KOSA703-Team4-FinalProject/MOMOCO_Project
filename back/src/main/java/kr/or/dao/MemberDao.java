package kr.or.dao;

import java.sql.SQLException;

public interface MemberDao {
	
	//해당 회원이 존재한는지 여부 확인
	public int isMember(int u_idx) throws ClassNotFoundException, SQLException;

}

package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Status;

public interface StatusDao {
	
	//상태 전체 불러오기
	public List<Status> getStatus(String url) throws ClassNotFoundException, SQLException;

}

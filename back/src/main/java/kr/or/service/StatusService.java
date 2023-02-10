package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.StatusDao;
import kr.or.vo.Status;

@Service
public class StatusService {

	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//상태 전체 조회
	public List<Status> getStatus(String url){
		List<Status> statusList = new ArrayList<Status>();
		
		try {
			
			StatusDao dao = sqlsession.getMapper(StatusDao.class);
			statusList = dao.getStatus(url);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return statusList;
	}
	
}

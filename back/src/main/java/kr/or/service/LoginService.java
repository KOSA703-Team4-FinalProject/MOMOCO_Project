package kr.or.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import kr.or.dao.MemberDao;

@Service
public class LoginService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 해당하는 유저가 존재하는 지 여부 확인
	public int isMember(int u_idx) {
		int result = 0;
		try {
			MemberDao memberdao = sqlsession.getMapper(MemberDao.class);
			result = memberdao.isMember(u_idx);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	


}

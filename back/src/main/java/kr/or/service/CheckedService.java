package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.CheckedDao;
import kr.or.vo.Checked;

@Service
public class CheckedService {
	
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//체크 추가
	public int addChecked(Checked checked) {
		
		int result = 0;
		
		try {
			
			CheckedDao checkeddao = sqlsession.getMapper(CheckedDao.class);
			result = checkeddao.addChecked(checked);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
		
	}

}

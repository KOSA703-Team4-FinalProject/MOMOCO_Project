package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.CheckedDao;
import kr.or.vo.Checked;
import kr.or.vo.CommonBoard;

@Service
public class CheckedService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	// 글읽기체크
	@Transactional
	public int addChecked(Checked checked) {
	  int result = 0;
	  try {
	    CheckedDao checkeddao = sqlsession.getMapper(CheckedDao.class);
	    Integer readCount = checkeddao.getread(checked.getIdx(), checked.getU_idx() ,checked.getUrl());
	    if (readCount == null || readCount < 1) {
	      result = checkeddao.addChecked(checked);
	    }
	  } catch (ClassNotFoundException e) {
	    e.printStackTrace();
	  } catch (SQLException e) {
	    e.printStackTrace();
	  }
	  return result;
	}
	

	
}

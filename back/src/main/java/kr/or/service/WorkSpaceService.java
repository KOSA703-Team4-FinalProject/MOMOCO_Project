package kr.or.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.WorkSpaceDao;
import kr.or.vo.WorkSpace;

@Service
public class WorkSpaceService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 해당하는 도메인 존재하는 지 여부 확인
	public int isDomain(String url) {
		int result = 0;
		try {
			WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
			result = workspacedao.isDomain(url);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	// 워크스페이스 생성
		@Transactional
		public int makeWorkSpace(WorkSpace workspace) {
			int result = 0;
			try {
				WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
				result = workspacedao.makeWorkSpace(workspace);
				workspacedao.createTable(workspace.getUrl());
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			
			return result;
		}
	


}

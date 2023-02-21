package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.WorkSpaceDao;
import kr.or.dao.WorkSpaceUserDao;
import kr.or.vo.WorkSpace;
import kr.or.vo.WorkSpaceUser;

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
			result = workspacedao.isDomain(workspace.getUrl());
			
			result = workspacedao.insertWorkSpaceOwner(workspace);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	//워크스페이스 전체 조회
	public List<WorkSpace> getWorkSpace(int u_idx) {
		List<WorkSpace> workspacelist = new ArrayList<WorkSpace>();
		
		try {
			WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
			
			workspacelist = workspacedao.getWorkSpace(u_idx);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return workspacelist;
	}

	//워크스페이스 안의 유저 탐색
	public List<WorkSpaceUser> getWorkSpaceUser(WorkSpaceUser workspaceuser) {
		List<WorkSpaceUser> userlist = new ArrayList<WorkSpaceUser>();
		
		try {
			
			WorkSpaceUserDao dao = sqlsession.getMapper(WorkSpaceUserDao.class);
			userlist = dao.getWorkSpaceUserList(workspaceuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return userlist;
	} 
	
	//해당하는 레포지토리가 연결된 레포지토리인지 확인
	public int isRepo(String linked_repo) {
		int result = 0;
		
		try {
			WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
			result = workspacedao.isRepo(linked_repo);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//워크스페이스에 팀원 추가
	public int insertWorkUser(WorkSpaceUser workspaceuser) {
		
		int result = 0;
		
		try {
			
			WorkSpaceUserDao dao = sqlsession.getMapper(WorkSpaceUserDao.class);
			result = dao.insertWorkUser(workspaceuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//해당 워크스페이스 해당 유저의 권한 탐색
	public WorkSpaceUser getWorkSpaceUserByUser(WorkSpaceUser workspaceuser) {
		WorkSpaceUser work = new WorkSpaceUser();
		
		try {
			
			WorkSpaceUserDao dao = sqlsession.getMapper(WorkSpaceUserDao.class);
			work = dao.getWorkSpaceUser(workspaceuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return work;
	}
	
	//해당 워크스페이스 해당 유저가 있는지 탐색
	public int isWorkSpaceUser(WorkSpaceUser workspaceuser) {
		int result = 0;
		
		try {
			
			WorkSpaceUserDao dao = sqlsession.getMapper(WorkSpaceUserDao.class);
			result = dao.isWorkSpaceUser(workspaceuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//워크스페이스의 정보 불러오기
	public WorkSpace getWorkSpaceByUrl(String url) {
		WorkSpace workspace = new WorkSpace();
		
		try {
			
			WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
			workspace = workspacedao.getWorkSpaceByUrl(url);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return workspace;
	}
	
	//워크스페이스 소유자 확인
	public WorkSpace getWorkSpaceOwner(String url) {
		WorkSpace workspace = new WorkSpace();
		
		try {
			
			WorkSpaceDao workspacedao = sqlsession.getMapper(WorkSpaceDao.class);
			workspace = workspacedao.getWorkSpaceOwner(url);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return workspace; 
	}
	
}

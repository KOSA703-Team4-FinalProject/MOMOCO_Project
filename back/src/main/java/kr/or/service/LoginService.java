package kr.or.service;

import java.sql.SQLException;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.MemberDao;
import kr.or.vo.Member;
import kr.or.vo.UserDetail;

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
	
	// 신규 유저 추가
	@Transactional
	public int addMember(Member member, UserDetail userDetail) {
		int result = 0;
		try {
			
			MemberDao memberdao = sqlsession.getMapper(MemberDao.class);
			result = memberdao.addMember(member);
			
			System.out.println("result: " + result);
			
			result = memberdao.addUserDetail(userDetail);
			
			System.out.println("result: " + result);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//기존 유저 정보 수정
	@Transactional
	public int updateMember(Member member, UserDetail userDetail) {
		int result = 0;
		try {
			
			MemberDao memberdao = sqlsession.getMapper(MemberDao.class);
			memberdao.updateMember(member);
			memberdao.updateUserDetail(userDetail);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result; 
	}

}

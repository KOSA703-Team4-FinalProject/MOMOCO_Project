package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.Member;
import kr.or.vo.MemberAll;
import kr.or.vo.UserDetail;

public interface MemberDao {
   
   //해당 회원이 존재한는지 여부 확인
   public int isMember(int u_idx) throws ClassNotFoundException, SQLException;

	//신규 유저 삽입
	public int addMember(Member member) throws ClassNotFoundException, SQLException;
	
	//신규 유저 세부 정보 삽입
	public int addUserDetail(UserDetail userDetail) throws ClassNotFoundException, SQLException;
	
	//기존 유저 정보 수정
	public int updateMember(Member member) throws ClassNotFoundException, SQLException;
	
	//기존 유저 세부 정보 수정
	public int updateUserDetail(UserDetail userDetail) throws ClassNotFoundException, SQLException;
	
	//유저 정보 확인
	public MemberAll getMemberByIdx(int u_idx) throws ClassNotFoundException, SQLException;
	
}
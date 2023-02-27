package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.or.vo.Member;
import kr.or.vo.MemberAll;
import kr.or.vo.WorkSpace;
import kr.or.vo.WorkSpaceUser;

public interface WorkSpaceDao {
   
   //워크스페이스 생성
   public int makeWorkSpace(WorkSpace workspace) throws ClassNotFoundException, SQLException;
     
   //워크스페이스 생성시 도메인 중복 체크
   public int isDomain(String url) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 생성시 테이블 create 프로시저 호출
   public void createTable(String URL) throws ClassNotFoundException, SQLException;

   //워크스페이스 전체 조회
   public List<WorkSpace> getWorkSpace(Member member) throws ClassNotFoundException, SQLException;
 
   //해당하는 레포지토리가 연결된 레포지토리인지 확인
   public int isRepo(String linked_repo) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 정보 불러오기
   public WorkSpace getWorkSpaceByUrl(String url) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 소유자 저장
   public int insertWorkSpaceOwner(WorkSpace workspace) throws ClassNotFoundException, SQLException;

   //워크스페이스 소유자 불러오기
   public WorkSpace getWorkSpaceOwner(String url) throws ClassNotFoundException, SQLException;

   // 워크스페이스 멤버 불러오기
   public List<MemberAll> getWorkSpaceMember(String url)throws ClassNotFoundException, SQLException;

   // 워크스페이스 오너 체크
   public List<WorkSpaceUser> checkOwner(WorkSpaceUser workspaceuser)throws ClassNotFoundException, SQLException;
   // 워크스페이스 유저 삭제
   public int DeleteWorkSpace(@Param("url") String url, @Param("u_idx") int u_idx)throws ClassNotFoundException, SQLException;
   // 워크스페이스 삭제
   public int DeleteSpace(WorkSpace workspace)throws ClassNotFoundException, SQLException;
   // 워스크스페이스 수정
   public int RestoreWorkSpace(WorkSpace workspace)throws ClassNotFoundException, SQLException;

}
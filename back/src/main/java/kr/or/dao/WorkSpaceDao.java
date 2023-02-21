package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.WorkSpace;

public interface WorkSpaceDao {
   
   //워크스페이스 생성
   public int makeWorkSpace(WorkSpace workspace) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 생성시 도메인 중복 체크
   public int isDomain(String url) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 생성시 테이블 create 프로시저 호출
   public void createTable(String URL) throws ClassNotFoundException, SQLException;

   //워크스페이스 전체 조회
   public List<WorkSpace> getWorkSpace(int u_idx) throws ClassNotFoundException, SQLException;
 
   //해당하는 레포지토리가 연결된 레포지토리인지 확인
   public int isRepo(String linked_repo) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 정보 불러오기
   public WorkSpace getWorkSpaceByUrl(String url) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 소유자 저장
   public int insertWorkSpaceOwner(WorkSpace workspace) throws ClassNotFoundException, SQLException;

   //워크스페이스 소유자 불러오기
   public WorkSpace getWorkSpaceOwner(String url) throws ClassNotFoundException, SQLException;

}
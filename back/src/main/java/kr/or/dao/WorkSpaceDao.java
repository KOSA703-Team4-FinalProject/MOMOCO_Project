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
   
}
package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.WorkSpace;

public interface WorkSpaceDao {
   
   //워크스페이스 생성
   public int makeWorkSpace(WorkSpace workspace) throws ClassNotFoundException, SQLException;
   
   //워크스페이스 생성시 도메인 중복 체크
   public int isDomain(String url) throws ClassNotFoundException, SQLException;
   
}
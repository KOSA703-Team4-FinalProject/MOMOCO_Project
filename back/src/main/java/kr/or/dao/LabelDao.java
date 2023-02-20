package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Label;

public interface LabelDao {
	
	//라벨 조회
	public List<Label> listLabel(String url) throws ClassNotFoundException, SQLException;
	
	//라벨 추가
	public int addLabel(Label label) throws ClassNotFoundException, SQLException;
	
}

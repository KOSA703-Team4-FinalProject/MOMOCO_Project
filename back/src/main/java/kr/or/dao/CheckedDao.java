package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.Checked;

public interface CheckedDao {
	
	//체크에 추가
	public int addChecked(Checked checked) throws ClassNotFoundException, SQLException;

}

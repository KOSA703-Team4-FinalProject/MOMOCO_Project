package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Checked;

public interface CheckedDao {
	
	//체크에 추가
	public int addChecked(Checked checked) throws ClassNotFoundException, SQLException;

	//해당 글의 체크된 리스트 확인
	public List<Checked> getCheckedByIdx(Checked checked) throws ClassNotFoundException, SQLException;
	
}

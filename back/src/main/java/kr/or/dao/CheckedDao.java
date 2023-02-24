package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Checked;
import kr.or.vo.CommonBoard;

public interface CheckedDao {

	// 체크에 추가
	public int addChecked(Checked checked) throws ClassNotFoundException, SQLException;

	// 해당 글의 체크된 리스트 확인
	public List<Checked> getCheckedByIdx(Checked checked) throws ClassNotFoundException, SQLException;

	// 글읽기 체크
	public List<CommonBoard> getCheck(Checked checked) throws ClassNotFoundException, SQLException;

	// checked테이블에 있는이 유뮤 판별
	public Integer getread(int idx, int u_idx, String url) throws ClassNotFoundException, SQLException;

}

package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.CheckedDao;
import kr.or.vo.Checked;
import kr.or.vo.CommonBoard;

@Service
public class CheckedService {
	
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//체크 추가
	public int addChecked(Checked checked) {
		
		int result = 0;
		
		try {
			
			CheckedDao checkeddao = sqlsession.getMapper(CheckedDao.class);
			result = checkeddao.addChecked(checked);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
		
	}
	
	//글읽기체크
		public List<CommonBoard> getCheck(Checked checked) {

			List<CommonBoard> board = new ArrayList<CommonBoard>();

			try {

				CheckedDao checkeddao = sqlsession.getMapper(CheckedDao.class);
				board = checkeddao.getCheck(checked);

			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			return board;
		}

}

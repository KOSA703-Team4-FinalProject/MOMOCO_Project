package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.LabelDao;
import kr.or.vo.Label;

@Service
public class LabelService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// Label 리스트
	public List<Label> labellist(String url) {

		List<Label> listlabel = new ArrayList<Label>();

		try {

			LabelDao labeldao = sqlsession.getMapper(LabelDao.class);
			listlabel = labeldao.listLabel(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return listlabel;
	}
	
	
	public int addLabel(Label label) {
		int result =0;
		try {
			LabelDao labeldao = sqlsession.getMapper(LabelDao.class);
			result=labeldao.addLabel(label);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}


}
package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.CalendarDao;
import kr.or.vo.Board;
import kr.or.vo.Calendar;
import kr.or.vo.CalendarAll;

@Service
public class CalendarService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 일정 전체 확인
	public List<CalendarAll> getCalendar(String url) {

		List<CalendarAll> calendar = new ArrayList<CalendarAll>();

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			calendar = calendardao.getCalendar(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return calendar;
	}

	// 일정 추가
	public int addCalendar(CalendarAll all) {

		int result = 0;

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			result = calendardao.addCalendar(all);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	// 일정 읽기
	public CalendarAll readCalendar(CalendarAll all) {
		CalendarAll cal = new CalendarAll();

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			cal = calendardao.getCalendarByTitle(all);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cal;
	}

}
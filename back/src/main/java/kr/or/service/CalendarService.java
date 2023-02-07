package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.CalendarDao;
import kr.or.vo.Board;
import kr.or.vo.Calendar;

@Service
public class CalendarService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//일정 전체 확인
	public List<Calendar> getCalendar() {
		
		List<Calendar> calendar = new ArrayList<Calendar>();
		
		try {
			
			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			calendar = calendardao.getCalendar();
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return calendar;
	}
	
	//일정 추가
	public int addCalendar(Calendar calendar, Board board) {
		
		int result = 0;
		
		try {
			
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("calendar", calendar);
			map.put("board", board);
			
			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			result = calendardao.addCalendar(map);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

}

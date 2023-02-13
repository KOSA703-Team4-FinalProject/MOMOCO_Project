package kr.or.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.or.vo.Calendar;

public interface CalendarDao {
	
	//전체 일정 조회
	public List<Calendar> getCalendar(String url) throws ClassNotFoundException, SQLException;
	
	//특정 일정 조회
	public Calendar getCalendarByTitle(Calendar cal) throws ClassNotFoundException, SQLException;
	
	//일정 추가
	public int addCalendar(Calendar all) throws ClassNotFoundException, SQLException;
	
	//일정 수정
	public int updateCalendar(Calendar calendar) throws ClassNotFoundException, SQLException;
	
	//일정 삭제
	public int deleteCalendar(Calendar calendar) throws ClassNotFoundException, SQLException;

}

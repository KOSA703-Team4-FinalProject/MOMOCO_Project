package kr.or.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import kr.or.vo.Calendar;
import kr.or.vo.CalendarAll;

public interface CalendarDao {
	
	//전체 일정 조회
	public List<CalendarAll> getCalendar(String url) throws ClassNotFoundException, SQLException;
	
	//특정 일정 조회
	public Calendar getCalendarByB_idx(int b_idx) throws ClassNotFoundException, SQLException;
	
	//일정 추가
	public int addCalendar(CalendarAll all) throws ClassNotFoundException, SQLException;
	
	//일정 수정
	public int updateCalendar(Calendar calendar) throws ClassNotFoundException, SQLException;
	
	//일정 삭제
	public int deleteCalendar(int b_idx) throws ClassNotFoundException, SQLException;

}

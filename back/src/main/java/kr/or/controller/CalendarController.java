package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.CalendarService;
import kr.or.utils.AlarmSocket;
import kr.or.vo.Calendar;

@RestController
@RequestMapping("/cal")
public class CalendarController {
	
	private CalendarService calendarservice;
	
	@Autowired
	public void setCalendarService(CalendarService calendarservice) {
		this.calendarservice = calendarservice;
	}
	
	private AlarmSocket alarmsocket;
	
	@Autowired
	public void setAlarmSocket(AlarmSocket alarmsocket) {
		this.alarmsocket = alarmsocket;
	}
	
	//전체 일정 조회
	@RequestMapping(value="/get", method=RequestMethod.POST)
	public List<Calendar> getCalendar(@RequestBody Calendar url) {
		
		
		List<Calendar> calendar = new ArrayList<Calendar>();
	
		calendar = calendarservice.getCalendar(url.getUrl());
		
		
		return calendar;
	}
	
	//일정 추가
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addCalendar(@RequestBody Calendar calendarAll) {
		
		int result = calendarservice.addCalendar(calendarAll);
		
		String[] u_idxList = calendarAll.getU_idxList().split(",");
		
		alarmsocket.sendAlarm(calendarAll, u_idxList);
	
		return result;
	}
	
	//일정 확인
	@RequestMapping(value="/read", method=RequestMethod.POST)
	public Calendar getCalendarByTitle(@RequestBody Calendar cal) {
		
		Calendar calendar = new Calendar();
	
		calendar = calendarservice.readCalendar(cal);
		
		
		return calendar;
	}
	
	//일정 수정
	@RequestMapping(value="/modify", method=RequestMethod.POST)
	public int modifyCalendar(@RequestBody Calendar calendar) {
		
		int result = calendarservice.modifyCalendar(calendar);
		
		return result;
	}
	
	//일정 삭제
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public int deleteCalendar(@RequestBody Calendar calendar) {
		
		int result = calendarservice.deleteCalendar(calendar);
		
		return result;
	}
	
}

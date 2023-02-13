package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.CalendarService;
import kr.or.vo.Calendar;
import kr.or.vo.CalendarAll;

@RestController
@RequestMapping("/cal")
public class CalendarController {
	
	private CalendarService calendarservice;
	
	@Autowired
	public void setCalendarService(CalendarService calendarservice) {
		this.calendarservice = calendarservice;
	}
	
	//전체 일정 조회
	@RequestMapping(value="/get", method=RequestMethod.POST)
	public List<CalendarAll> getCalendar(@RequestBody CalendarAll url) {
		
		
		List<CalendarAll> calendar = new ArrayList<CalendarAll>();
	
		calendar = calendarservice.getCalendar(url.getUrl());
		
		
		return calendar;
	}
	
	//일정 추가
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addCalendar(@RequestBody CalendarAll calendarAll) {
		
		int result = calendarservice.addCalendar(calendarAll);
	
		return result;
	}
	
	//일정 확인
	@RequestMapping(value="/read", method=RequestMethod.POST)
	public CalendarAll getCalendarByTitle(@RequestBody CalendarAll cal) {
		
		CalendarAll calendar = new CalendarAll();
	
		calendar = calendarservice.readCalendar(cal);
		
		
		return calendar;
	}
	
}

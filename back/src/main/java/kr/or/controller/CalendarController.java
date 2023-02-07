package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.BoardService;
import kr.or.service.CalendarService;
import kr.or.vo.Board;
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
	
	private BoardService boardservice;
	
	@Autowired
	public void setBoardService(BoardService boardservice) {
		this.boardservice = boardservice;
	}
	
	//전체 일정 조회
	@RequestMapping(value="/", method=RequestMethod.GET)
	public JSONObject getCalendar() {
		
		List<Calendar> calendar = new ArrayList<Calendar>();
		List<Board> board = new ArrayList<Board>();
	
		calendar = calendarservice.getCalendar();
		board = boardservice.getBoard();
		
		JSONObject jsonObject = new JSONObject();
		
		jsonObject.put("calendar", calendar);
		jsonObject.put("board", board);
		
		return jsonObject;
	}
	
	//일정 추가
	@RequestMapping(value="/", method=RequestMethod.POST)
	public int addCalendar(@RequestBody  CalendarAll calendarAll) {
		
		Calendar calendar = new Calendar();
		calendar.setStart_date(calendarAll.getStart_date());
		calendar.setEnd_date(calendarAll.getEnd_date());
		calendar.setS_idx(calendarAll.getS_idx());
		
		Board board = new Board();
		board.setNickname(calendarAll.getNickname());
		board.setTitle(calendarAll.getTitle());
		board.setContent(calendarAll.getContent());
		board.setB_code(calendarAll.getB_code());
		board.setLabel(calendarAll.getLabel());
		board.setU_idx(calendarAll.getU_idx());
		
		int result = calendarservice.addCalendar(calendar, board);
	
		return result;
	}
	
	
}

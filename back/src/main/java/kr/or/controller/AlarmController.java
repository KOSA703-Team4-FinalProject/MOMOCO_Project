package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.AlarmService;
import kr.or.vo.Alarm;
import kr.or.vo.CommonBoard;
import kr.or.vo.Doc;
import kr.or.vo.Kanban;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AlarmController {
	
	private AlarmService alarmservice;
	@Autowired
	public void setAlarmService(AlarmService alarmservice) {
		this.alarmservice = alarmservice;
	}
	// 특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;

	//알림 내용 불러오기
	@RequestMapping(value = "/api/alarm/alarmList", method = RequestMethod.POST)
	public List<Alarm> getAlarmList(@RequestBody Alarm alarm){
		System.out.println(alarm.getU_idx());
		List<Alarm> alarmList = new ArrayList<Alarm>();
		alarmList = alarmservice.getAlarmList(alarm);
		System.out.println(alarmList);
		return alarmList;
	}
	
	//워크스페이스 팀원 불러오기(알림 대상자)
	@RequestMapping(value = "/api/alarm/teamlist", method = RequestMethod.GET)
	public List<Alarm> u_idxList(@RequestParam(value = "url") String url){
	
		List<Alarm> alarmlist = alarmservice.u_idxList(url);
		
		return alarmlist;
	}
	
	//알림 체크
	@RequestMapping(value="/api/alarm/check", method=RequestMethod.PUT)
	public int checkAlarm(@RequestBody Alarm alarm) {
		
		int result = alarmservice.checkAlarm(alarm.getA_idx());
		
		return result;
	}
	
	//알림 전부 체크
	@RequestMapping(value="/api/alarm/checkAll", method=RequestMethod.PUT)
	public int checkAllAlarm(@RequestBody Alarm alarm) {
		
		int result = alarmservice.checkAllAlarm(alarm.getU_idx());
		
		return result;
	}
	
	// 칸반 컬럼의 모든 아이템 삭제
	@RequestMapping(value = "/api/alarm/deleteAll", method = RequestMethod.POST)
	public int deleteAllAlarm(@RequestBody Alarm alarm) {
		
		int result = alarmservice.deleteAll(alarm.getU_idx());

		return result;
	}

	// 칸반 아이템 삭제
	@RequestMapping(value = "/api/alarm/delete", method = RequestMethod.POST)
	public int deleteAlarm(@RequestBody Alarm alarm) {
		
		int result = alarmservice.delete(alarm.getA_idx());
				
		return result;
	}
	
}

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
	public List<Alarm> getAlarmList(@RequestParam(value = "u_idx") int u_idx){
		
		List<Alarm> alarmList = new ArrayList<Alarm>();
		alarmList = alarmservice.getAlarmList(u_idx);

		return alarmList;
	}
	
	//워크스페이스 팀원 불러오기(알림 대상자)
	@RequestMapping(value = "/api/alarm/teamlist", method = RequestMethod.POST)
	public List<Alarm> u_idxList(@RequestParam(value = "url") String url){
	
		List<Alarm> alarmlist = alarmservice.u_idxList(url);
		
		return alarmlist;
	}
	
}

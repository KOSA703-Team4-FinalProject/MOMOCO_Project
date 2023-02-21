package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.vo.Alarm;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AlarmController {
	
	// 특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;
	
	//알림 내용 불러오기
	@RequestMapping(value = "/api/alarm/alarmList", method = RequestMethod.GET)
	public List<Alarm> getAlarmList(@RequestBody Alarm alarm){
		
		List<Alarm> alarmList = new ArrayList<Alarm>();
		
		
		
		return alarmList;
	}
	

}

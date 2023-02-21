package kr.or.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import kr.or.service.AlarmService;
import kr.or.service.BoardSerivce;
import kr.or.vo.Alarm;
import kr.or.vo.Board;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AlarmSocket {
	
	// 특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;
	
	private BoardSerivce boardservice;
	
	@Autowired
	public void setAlarmService(BoardSerivce boardservice) {
		this.boardservice = boardservice;
	}
	
	private AlarmService alarmservice;
	
	@Autowired
	public void setAlarmService(AlarmService alarmservice) {
		this.alarmservice = alarmservice;
	}
	
	//알림 생성
	public void sendAlarm(Board board, String[] u_idx) {
		//알람에 전달할 객체
		Board reboard = boardservice.getBoardByTitle(board);
		
		Alarm alarm = new Alarm();
		alarm.setIdx(reboard.getIdx());
		alarm.setContent(reboard.getContent());
		alarm.setCheckalarm(0);
		alarm.setUrl(reboard.getUrl());
		alarm.setLink("/ws/" + reboard.getUrl() + "/" + reboard.getIdx());
		
		//전송받을 사람
		for(String u : u_idx) {
			//알람 DB에 insert
			alarm.setU_idx(Integer.parseInt(u));
			alarmservice.addAlarm(alarm);
			
			//알람 메시지 userIdx 기준으로 전송
			template.convertAndSend("/one/alarm/" + u, alarm);
		}
	}
	
	
	
}

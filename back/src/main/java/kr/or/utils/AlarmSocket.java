package kr.or.utils;

import java.util.List;

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
		System.out.println("sendAlarm1");
		//알람에 전달할 객체
		Board reboard = boardservice.getBoardByTitle(board);
		
		Alarm alarm = new Alarm();
		alarm.setIdx(reboard.getIdx());
		alarm.setContent("(WS: " + board.getUrl() + ") " + reboard.getNickname() + "님께서 " + reboard.getTitle() + " 글을 " + reboard.getB_name() + "에 등록했어요.");
		alarm.setCheck_alarm(0);
		alarm.setUrl(board.getUrl());
		alarm.setLink("/ws/" + board.getUrl() + "/" + reboard.getIdx());
		
		//전송받을 사람
		for(String u : u_idx) {
			//알람 DB에 insert
			System.out.println("u_idx : " + u_idx);
			System.out.println("u : " + Integer.parseInt(u));
			alarm.setU_idx(Integer.parseInt(u));
			alarmservice.addAlarm(alarm);
			
			//알람 메시지 userIdx 기준으로 전송
			template.convertAndSend("/sub/one/alarm/" + u, alarm);
			System.out.println("useridx : " + u);
		}
	}
	
	
	
}

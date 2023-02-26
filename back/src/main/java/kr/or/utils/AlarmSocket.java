package kr.or.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import kr.or.service.AlarmService;
import kr.or.service.BoardSerivce;
import kr.or.service.ChatService;
import kr.or.vo.Alarm;
import kr.or.vo.Board;
import kr.or.vo.Chat;
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
	
	private ChatService chatservice;

	@Autowired
	public void setCharService(ChatService chatservice) {
		this.chatservice = chatservice;
	}

	// 알림 생성
	public void sendAlarm(Board board, String[] u_idx) {
		// 알람에 전달할 객체
		System.out.println("board : ---" + board);
		Board reboard = boardservice.getBoardByTitle(board);
		System.out.println("reboard : ---" + reboard);
		Alarm alarm = new Alarm();
		alarm.setIdx(reboard.getIdx());
		alarm.setNickname(reboard.getNickname());
		alarm.setB_name(reboard.getB_name());
		alarm.setW_date(reboard.getW_date());
		alarm.setContent(reboard.getNickname() + "님께서 " + reboard.getTitle() + " 글을 "
				+ reboard.getB_name() + "에 등록했어요.");
		alarm.setCheck_alarm(0);
		alarm.setUrl(board.getUrl());
		if (reboard.getB_name().equals("kanban") || reboard.getB_name().equals("calendar")) {
			alarm.setLink("/ws/" + board.getUrl() + "/" + reboard.getB_name());
		} else {
			alarm.setLink("/ws/" + board.getUrl() + "/" + reboard.getB_name() + "/" + reboard.getIdx());
		}

		// 전송받을 사람
		for (int i = 1; i < u_idx.length; i++) {

			// 알람 DB에 insert
			alarm.setU_idx(Integer.parseInt(u_idx[i]));
			alarmservice.addAlarm(alarm);

			// 알람 메시지 userIdx 기준으로 전송
			template.convertAndSend("/sub/one/alarm/" + u_idx[i], alarm);
		}
	}

}

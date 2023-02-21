package kr.or.vo;

import lombok.Data;

@Data
public class Alarm {
	
	private int a_idx;			//알람 식별 번호
	private int idx;			//게식글 식별 번호
	private String content;		//알람 내용
	private int checkalarm;		//알람 확인 여부
	private String url;			//워크스페이스 주소
	private int u_idx;			//유저 식별 번호
	private String link;		//알림 근원지 가기
	
	
	private String nickname;
	private String profilephoto;
}

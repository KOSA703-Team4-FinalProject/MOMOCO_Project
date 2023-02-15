package kr.or.vo;

import lombok.Data;

@Data
public class ChatUser {

	private int u_idx;				//유저 식별 번호
	private int r_idx;				//채팅방 식별 번호
	private String entrance_time;	//접속 시간
	private String nickname;		//닉네임
	
	private String url;				//워크스페이스 url
	
}

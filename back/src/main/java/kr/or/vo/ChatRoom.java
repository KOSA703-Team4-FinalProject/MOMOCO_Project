package kr.or.vo;

import lombok.Data;

@Data
public class ChatRoom {

	private int r_idx;		//채팅방 식별번호
	private String r_name;	//채팅방 이름
	
	private int u_idx;
	private String nickname;
	
	private int to_u_idx;
	private String to_nickname;
	
	private String url; 	//워크스페이스 주소
}

package kr.or.vo;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import lombok.Data;

@Data
public class Chat {

	private int ch_idx;				//채팅 식별 번호
	private String w_date;			//채팅 작성시간
	private String content;			//채팅 내용
	private String content_type;	//채팅 타입
	private int ref;				//답글
	private String nickname;		//작성자 닉네임
	private int r_idx;				//채팅방 식별 번호
	private int u_idx;				//작성자 깃헙 키
	
	private String url;				//워크스페이스 주소
	
	private CommonsMultipartFile file; //업로드한 파일을 받는 객체
	
}

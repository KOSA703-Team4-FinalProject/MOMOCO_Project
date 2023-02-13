package kr.or.vo;

import lombok.Data;

@Data
public class Comments {

	private int co_idx;			//댓글 식별 번호
	private int idx;			//게시글 식별 번호
	private	String content;		//내용
	private int ref;			//들여쓰기
	private String nickname;	//닉네임
	private int u_idx;			//유저 식별 번호
	
}

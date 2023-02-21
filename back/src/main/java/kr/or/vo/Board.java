package kr.or.vo;

import java.util.List;

import lombok.Data;

@Data
public class Board {
	
	private int idx;			//글번호
	private String nickname;	//닉네임
	private String title;		//글 제목
	private String content;		//글 내용
	private String w_date;		//작성 일자
	private int b_code;			//게시판 코드
	private String b_name;		//게시판 이름
	private String label;		//라벨 키워드
	private int u_idx;			//깃헙 키
	
	private String url;			//워크스페이스 url
	
	private List<Comments> comments; 	//댓글
	private List<Checked> checked;	//확인
}

package kr.or.vo;

import lombok.Data;

@Data
public class CalendarAll {
	
	private int b_idx;				//식별 번호
	private String start_date;		//시작일
	private String end_date;		//종료일
	private int s_idx;				//상태 순번

	private int idx;			//글번호
	private String nickname;	//닉네임
	private String title;		//글 제목
	private String content;		//글 내용
	private String w_date;		//작성 일자
	private int b_code;			//게시판 코드
	private String label;		//라벨 키워드
	private int u_idx;			//깃헙 키

}

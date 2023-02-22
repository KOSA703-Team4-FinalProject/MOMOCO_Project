package kr.or.vo;

import lombok.Data;

@Data
public class Calendar extends Board {
	
	private int b_idx;				//식별 번호
	private String start_date;		//시작일
	private String end_date;		//종료일
	private int idx;				//글 번호
	private int s_idx;				//상태 순번
	
	private String s_name;			//상태 이름
	
	private String u_idxList;		//메일 전달할 유저 식별키 리스트

}

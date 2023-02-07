package kr.or.vo;

import lombok.Data;

@Data
public class Calendar {
	
	private int b_idx;				//식별 번호
	private String start_date;		//시작일
	private String end_date;		//종료일
	private int idx;				//글 번호
	private int s_idx;				//상태 순번

}

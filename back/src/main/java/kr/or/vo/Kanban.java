package kr.or.vo;

import lombok.Data;

@Data
public class Kanban extends Board{

	private int b_idx;	
	private int issue;	
	private int side;
	private int idx;
	private int s_idx;
	
	private String s_name;
	
	private String u_idxList;      //메일 전달할 유저 식별키 리스트
	
	private String label;
	private String style;
}

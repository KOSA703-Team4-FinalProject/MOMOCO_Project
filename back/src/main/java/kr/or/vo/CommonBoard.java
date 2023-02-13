package kr.or.vo;

import lombok.Data;

@Data
public class CommonBoard extends Board {

	private String ori_filename;  //원래 파일이름
	private String save_filename; //변경된 파일이름
	private int volume;    		  //용량
	private String filetype;      //파일타입
	private int ref;			//ref
	private int depth;			//depth
	private int step;			//step	
	private String thumb;		//썸네일
	private int idx;			//글번호
	
}

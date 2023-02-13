package kr.or.vo;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import lombok.Data;

@Data
public class Doc extends Board {
	
	private int b_idx;				//글번호
	private String ori_filename;	//파일원본이름
	private String safe_filename;	//파일서버저장이름
	private int ref;				//상위글번호
	private int depth;				//들여쓰기
	private int step;				//표시순서
	private String thumb;			//썸네일
	private int idx;				//글 번호(보드)
	
	private CommonsMultipartFile file;
	
	
}

package kr.or.vo;

import lombok.Data;

@Data
public class BoardStatus {

	private int idx;		//게시글 식별 번호
	private int s_idx;		//상태 식별 번호
	
	private String url;		//워크스페이스 url
	
}

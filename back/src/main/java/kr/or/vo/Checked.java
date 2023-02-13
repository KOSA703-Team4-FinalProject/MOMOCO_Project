package kr.or.vo;

import lombok.Data;

@Data
public class Checked {

	private int c_idx;			//확인 식별번호
	private int idx;			//글 식별번호
	private String nickname;	//닉네임
	private int u_idx;		//유저 식별 번호
	
	private String url;			//워크스페이스 주소
}

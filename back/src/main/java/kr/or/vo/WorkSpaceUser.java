package kr.or.vo;

import lombok.Data;

@Data
public class WorkSpaceUser {

	private String url;			//워크스페이스 주소
	private int u_idx;			//유저 식별 키
	private String role;		//유저 권한
	private String nickname;	//유저 닉네임
	private String profilephoto; //유저 프로필 사진
	
}

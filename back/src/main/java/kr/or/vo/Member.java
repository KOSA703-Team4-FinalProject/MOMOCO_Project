package kr.or.vo;

import lombok.Data;

@Data
public class Member {

	private int u_idx;			//깃헙 키 (id)
	private String nickname;	//닉네임 (login)
	private String leave_date;	//탈퇴 시기 
	private String github_url;	//깃헙 링크 (html_url)
	private String profilephoto;	//프로필 사진(avatar_url)
	
}

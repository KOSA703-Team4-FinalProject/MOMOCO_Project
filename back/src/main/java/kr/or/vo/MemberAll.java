package kr.or.vo;

import lombok.Data;

@Data
public class MemberAll {

	private int u_idx;			//깃헙 키 (id)
	private String nickname;	//닉네임 (login)
	private String leave_date;	//탈퇴 시기 
	private String github_url;	//깃헙 링크 (html_url)
	private String profilephoto;	//프로필 사진(avatar_url)
	
	private String company;		//소속(company)
	private String bio;			//유저 설명 (bio)
	private String email;		//이메일(email)
	private String location;	//위치(location)
	private String blog;		//블로그(blog)
	
	private String role;		//권한
	private String workspace;	//워크스페이스
	
}

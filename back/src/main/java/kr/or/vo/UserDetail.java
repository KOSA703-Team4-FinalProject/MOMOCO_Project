package kr.or.vo;

import lombok.Data;

@Data
public class UserDetail {

	private int u_idx;			//깃헙 키(id)
	private String company;		//소속(company)
	private String bio;			//유저 설명 (bio)
	private String email;		//이메일(email)
	private String location;	//위치(location)
	private String blog;		//블로그(blog)
	
}

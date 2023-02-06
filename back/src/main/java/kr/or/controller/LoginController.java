package kr.or.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.LoginService;
import kr.or.vo.Member;
import kr.or.vo.MemberAll;
import kr.or.vo.UserDetail;

@RestController
@RequestMapping("/backlogin")
public class LoginController {
	
	private LoginService loginservice;
	
	@Autowired
	public void setLoginService(LoginService loginservice) {
		this.loginservice = loginservice;
	}
	
	//front에서 깃헙 키 가져와서 신규유저 or 기존유저 판별 해서 
	//신규 유저면 데이터 insert
	//기존 유저면 데이터 update
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public int isMember(@RequestBody  MemberAll memberAll) {
		
		System.out.println(memberAll.toString());
		
		Member member = new Member();
		member.setU_idx(memberAll.getU_idx());
		member.setNickname(memberAll.getNickname());
		member.setGithub_url(memberAll.getGithub_url());
		member.setProfilephoto(memberAll.getProfilephoto());
		
		UserDetail userDetail = new UserDetail();
		userDetail.setU_idx(memberAll.getU_idx());
		userDetail.setCompany(memberAll.getCompany());
		userDetail.setBio(memberAll.getBio());
		userDetail.setEmail(memberAll.getEmail());
		userDetail.setLocation(memberAll.getLocation());
		userDetail.setBlog(memberAll.getBlog());
		
		
		//신규유저인지 기존 유저 인지 판별
		int result = loginservice.isMember(member.getU_idx());
		
		int result2 = 0;
		
		if(result == 0) { //신규 유저 인 경우 insert
			
			result2 = loginservice.addMember(member, userDetail);
			
		}else { //기존 유저 인경우 update
			
			result2 = loginservice.updateMember(member, userDetail);
			
		}
		
		return result2;
	}
	

}

package kr.or.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.LoginService;
import kr.or.service.WorkSpaceService;
import kr.or.vo.Member;
import kr.or.vo.MemberAll;
import kr.or.vo.UserDetail;
import kr.or.vo.WorkSpaceUser;

@RestController
@RequestMapping("/backlogin")
public class LoginController {
	
	private LoginService loginservice;
	
	@Autowired
	public void setLoginService(LoginService loginservice) {
		this.loginservice = loginservice;
	}
	
	private WorkSpaceService workspaceservice;
	
	@Autowired
	public void setWorkSpaceUser(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}
	
	//front에서 깃헙 키 가져와서 신규유저 or 기존유저 판별 해서 
	//신규 유저면 데이터 insert
	//기존 유저면 데이터 update
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public int isMember(@RequestBody  MemberAll memberAll, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		session.setAttribute("login", memberAll.getU_idx());
		
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
		
		if(memberAll.getRole().equals("user")) {	//권한이 user일 경우 워크스페이스에 추가해주기
			
			WorkSpaceUser workuser = new WorkSpaceUser();
			workuser.setUrl(memberAll.getWorkspace());
			workuser.setU_idx(member.getU_idx());
			workuser.setRole(memberAll.getRole());
			
			System.out.println("haha");
			System.out.println(workuser.toString());
			
			result2 = workspaceservice.insertWorkUser(workuser);
		}
		
		return result2;
	}
	
	//멤버 정보 확인
	@RequestMapping(value="/getmember", method=RequestMethod.GET)
	public MemberAll getMemberByIdx(@RequestParam(value="u_idx") int u_idx) {
		
		MemberAll member = loginservice.getMemberByIdx(u_idx);
		
		return member;
	}
	

}

package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.WorkSpaceService;
import kr.or.vo.Member;
import kr.or.vo.WorkSpace;
import kr.or.vo.WorkSpaceUser;

@RestController
@RequestMapping("/api")
public class WorkSpaceController {
	
	private WorkSpaceService workspaceservice;

	@Autowired
	public void setWorkspaceservice(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}
	
	//워크스페이스 생성
	@RequestMapping(value = "/makeWorkSpace", method=RequestMethod.POST)
	public int makeWorkSpace(@RequestBody WorkSpace workspace) {
			
		int result = workspaceservice.makeWorkSpace(workspace);
		
		return result;
	}
	
	//워크스페이스 중복 조회
	@RequestMapping(value = "/isDomain", method=RequestMethod.POST)
	public int isDomain(@RequestBody WorkSpace workspace) {
			
		int result = workspaceservice.isDomain(workspace.getUrl());
		
		return result;
	}
	
	//해당 유저가 소속된 워크스페이스 전체 조회
	@RequestMapping(value="/getWorkSpace", method=RequestMethod.POST)
	public List<WorkSpace> getWorkSpace(@RequestBody Member member) {
		
		List<WorkSpace> workspacelist = workspaceservice.getWorkSpace(member.getU_idx());
		
		return workspacelist;
	}
	
	//워크스페이스 안 팀원 확인
	@RequestMapping(value="/getWorkSpaceUser", method=RequestMethod.GET)
	public List<WorkSpaceUser> getWorkSpaceUser(@RequestParam("url") String url){
		
		List<WorkSpaceUser> userList = new ArrayList<WorkSpaceUser>();
		
		WorkSpaceUser workspaceuser = new WorkSpaceUser();
		workspaceuser.setUrl(url);
		
		userList = workspaceservice.getWorkSpaceUser(workspaceuser);
		
		return userList;
	}
}

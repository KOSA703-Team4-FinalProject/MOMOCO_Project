package kr.or.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.WorkSpaceService;
import kr.or.vo.WorkSpace;

@RestController
@RequestMapping("/api")
public class WorkSpaceController {
	
	private WorkSpaceService workspaceservice;

	@Autowired
	public void setWorkspaceservice(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}
	
	@RequestMapping(value = "/makeWorkSpace", method=RequestMethod.POST)
	public int makeWorkSpace(@RequestBody WorkSpace workspace) {
		
		System.out.println("===========워크스페이스 생성===========");
		System.out.println(workspace.toString());
			
		int result = workspaceservice.makeWorkSpace(workspace);
		
		return result;
	}
	
	@RequestMapping(value = "/isDomain", method=RequestMethod.POST)
	public int isDomain(@RequestBody String url) {
		
		System.out.println("===========워크스페이스 중복조회===========");
		System.out.println(url);
			
		int result = workspaceservice.isDomain(url);
		System.out.println(result);
		return result;
	}
	
	
	
	
}

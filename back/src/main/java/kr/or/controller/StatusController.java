package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.StatusService;
import kr.or.vo.Status;

@RestController
@RequestMapping("/api/status")
public class StatusController {
	
	private StatusService statusService;

	@Autowired
	public void setWorkspaceservice(StatusService statusService) {
		this.statusService = statusService;
	}
	
	//전체 상태 확인
	@RequestMapping(value="/getStatus", method=RequestMethod.POST) 
	public List<Status> getStatus(@RequestBody Status status){
		
		List<Status> list = new ArrayList<Status>();
		
		System.out.println(status.getUrl());
		
		list = statusService.getStatus(status.getUrl());
		
		return list;
	}

}

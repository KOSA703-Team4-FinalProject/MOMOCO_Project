package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.CheckedService;
import kr.or.vo.Checked;

@RestController
@RequestMapping("/api/check")
public class CheckedController {
	
	private CheckedService checkedservice;
	
	@Autowired
	public void setCheckedService(CheckedService checkedservice) {
		this.checkedservice = checkedservice;
	}
	
	//체크 추가
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addChecked(@RequestBody Checked checked) {
		
		int result = checkedservice.addChecked(checked);
		
		return result;
	}
	
}

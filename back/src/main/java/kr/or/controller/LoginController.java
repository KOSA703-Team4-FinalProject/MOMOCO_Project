package kr.or.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.LoginService;

@RestController
@RequestMapping("/oauth")
public class LoginController {
	
	private LoginService loginservice;
	
	@Autowired
	public void setLoginService(LoginService loginservice) {
		this.loginservice = loginservice;
	}
	
	// 프론트에서 인가코드 받아오는 url
	

}

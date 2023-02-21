package kr.or.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.HandlerInterceptor;

import kr.or.service.WorkSpaceService;
import kr.or.vo.WorkSpaceUser;

public class LoginInterceptor implements HandlerInterceptor {
	
	private WorkSpaceService workspaceservice;

	@Autowired
	public void setWorkspaceservice(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		boolean result = false;

		
		System.out.println("preHandler 실행해서 로그인 유무 확인할 거임");
		System.out.println(request.getRequestURI());
		

		String u_idx = "";
		String url = "";

		// 로그인 하는 경우
		if (request.getRequestURI().equals("/controller/backlogin/login")) {
			result = true;
		} else {
			
			if (request.getHeader(HttpHeaders.AUTHORIZATION) != null) {	//토큰이 존재함
				
				for (Cookie cookie : request.getCookies()) {
					if (cookie.getName().equals("u_idx")) {
						u_idx = cookie.getValue();
					} else if (cookie.getName().equals("url")) {
						url = cookie.getValue();
					}
				}
				
				WorkSpaceUser work = new WorkSpaceUser();
				work.setU_idx(Integer.parseInt(u_idx));
				work.setUrl(url);
				
				// 권한 판별
				if (!u_idx.equals("") && !url.equals("")) {	//어떠한 레포지토리에 들어감
					
					int isuser = workspaceservice.isWorkSpaceUser(work);
					
					if(isuser >= 1) {	//해당 워크스페이스의 권한이 admin이거나 user인 경우
						result = true;
					}else {
						result = false;
					}
					
					System.out.println("url : " + url + ", u_idx: " + u_idx + ", role: " + isuser);
					
				}else if(url.equals("") || url == null) { //워크스페이스 안에 들어가기 전 접근
					result = true;
				}
				
			}
		}

		if (request.getRequestURI().equals("/controller/api/chat/fileDown") || request.getRequestURI().equals("/controller/doc/fileDown")) {
			result = true;
		}

		System.out.println("result : " + result);
		System.out.println("--------------------------------------");

		return result;
	}

}
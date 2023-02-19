package kr.or.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("preHandler 실행해서 로그인 유무 확인할 거임");
		boolean result = false;

		System.out.println(request.getRequestURI());
		
		String url = request.getRequestURI();
		String[] urlList = url.split("/");
		
		System.out.println(urlList[2]);
		
		// 로그인 하는 경우
		if (request.getRequestURI().equals("/controller/backlogin/login")) {
			result = true;
		}else {
			
			if(request.getHeader(HttpHeaders.AUTHORIZATION) != null) {
				result = true;
			}
			
		}
		
		if(request.getRequestURI().equals("/controller/api/chat/fileDown")) {
			result = true;
		}
		
		if(request.getRequestURI().equals("/controller/doc/fileDown")) {
			result = true;
		}
		
		System.out.println("result : " + result);

		return result;
	}

}
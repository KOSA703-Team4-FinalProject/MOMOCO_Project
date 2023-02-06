package kr.or.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {
	
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		System.out.println("preHandler 실행해서 로그인 유무 확인할 거임");
		boolean result = false;
		
		Cookie[] cookies = request.getCookies();
		
		for(Cookie c : cookies) {
			System.out.println(c.getName());
			System.out.println(c.getValue());
			if(c.getName() == "githubToken") {
				result = true;
			}
		}
		
		return result;
	}

}

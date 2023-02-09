package kr.or.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		System.out.println("preHandler 실행해서 로그인 유무 확인할 거임");
		boolean result = true;

		System.out.println(request.getRequestURI());

		// 로그인 하는 경우
		if (request.getRequestURI().equals("/controller/backlogin/login")) {
			
			
			result = true;
		}

		System.out.println("result : " + result);

		return result;
	}

}
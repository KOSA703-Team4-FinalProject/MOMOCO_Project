package kr.or.utils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

   @Override
   public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
         throws Exception {
      System.out.println("preHandler �����ؼ� �α��� ���� Ȯ���� ����");
      boolean result = false;

      Cookie[] cookies = request.getCookies();

      for (Cookie c : cookies) {
         if (c.getName().equals("githubToken")) {
            result = true;
         }
      }

      System.out.println(request.getRequestURI());
      
      if(request.getRequestURI().equals("/controller/backlogin/login")) {
         result = true;
      }
      
      System.out.println("result : " + result);

      return result;
   }

}
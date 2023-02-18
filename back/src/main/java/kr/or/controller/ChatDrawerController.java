package kr.or.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.ChatService;
import kr.or.vo.Chat;

@RestController
@RequestMapping("/api/chat")
public class ChatDrawerController {

	private ChatService chatservice;

	@Autowired
	public void setCharService(ChatService chatservice) {
		this.chatservice = chatservice;
	}

	// 파일 불러오기
	@RequestMapping(value = "/getFileList", method = RequestMethod.GET)
	public List<Chat> getFileList(@RequestParam(value = "url") String url, @RequestParam(value = "r_idx") int r_idx,
			@RequestParam(value = "content_type") String content_type) {

		Chat chat = new Chat();
		chat.setUrl(url);
		chat.setContent_type(content_type);
		chat.setR_idx(r_idx);

		List<Chat> fileList = new ArrayList<Chat>();
		fileList = chatservice.getFileList(chat);

		return fileList;
	}

}

package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.ChatRoomService;
import kr.or.vo.Calendar;
import kr.or.vo.ChatRoom;

@RestController
@RequestMapping("/api/chatroom")
public class CharRoomController {
	
	private ChatRoomService chatroomservice;
	
	@Autowired
	public void setCharRoomService(ChatRoomService chatroomservice) {
		this.chatroomservice = chatroomservice;
	}
	
	//전체 채팅방 조회
	@RequestMapping(value="/get", method=RequestMethod.POST)
	public List<ChatRoom> getCharRoom(@RequestBody ChatRoom chatroom){
		List<ChatRoom> chatroomlist = new ArrayList<ChatRoom>();
		
		chatroomlist = chatroomservice.getChatRoom(chatroom);
		
		return chatroomlist;
	}

}

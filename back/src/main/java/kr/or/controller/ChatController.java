package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.ChatRoomService;
import kr.or.service.ChatService;
import kr.or.vo.Chat;
import kr.or.vo.ChatRoom;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private ChatService chatservice;
	
	@Autowired
	public void setCharService(ChatService chatservice) {
		this.chatservice = chatservice;
	}
	
	private ChatRoomService chatroomservice;
	
	@Autowired
	public void setCharRoomService(ChatRoomService chatroomservice) {
		this.chatroomservice = chatroomservice;
	}
	
	//채팅방 기록 & 채팅방 정보 불러오기
	@RequestMapping(value="/get", method=RequestMethod.POST)
	public List<Object> getChat(@RequestBody Chat chat){
		
		List<Chat> chatlist = new ArrayList<Chat>();
		chatlist = chatservice.getChat(chat);
		
		ChatRoom tmp = new ChatRoom();
		tmp.setR_idx(chat.getR_idx());
		tmp.setUrl(chat.getUrl());
		
		//채팅방 정보 가져오기
		ChatRoom room = chatroomservice.selectRoom(tmp);
		
		List<Object> result = new ArrayList<Object>();
		result.add(chatlist);
		result.add(room);
		
		return result;
	}
	
	//Client가 send할 수 있는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	//	/pub/chat/enter
	
	
}

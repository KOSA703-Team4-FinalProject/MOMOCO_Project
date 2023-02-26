package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.ChatRoomService;
import kr.or.service.ChatService;
import kr.or.service.ChatUserService;
import kr.or.vo.Chat;
import kr.or.vo.ChatRoom;
import kr.or.vo.ChatUser;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatroom")
public class CharRoomController {

	private ChatRoomService chatroomservice;

	@Autowired
	public void setCharRoomService(ChatRoomService chatroomservice) {
		this.chatroomservice = chatroomservice;
	}
	
	private ChatService chatservice;

	@Autowired
	public void setChatService(ChatService chatservice) {
		this.chatservice = chatservice;
	}
	
	private ChatUserService chatuserservice;

	@Autowired
	public void setCharUserService(ChatUserService chatuserservice) {
		this.chatuserservice = chatuserservice;
	}

	// 특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;

	// 전체 채팅방 조회
	@RequestMapping(value = "/get", method = RequestMethod.POST)
	public List<ChatRoom> getCharRoom(@RequestBody ChatRoom chatroom) {
		List<ChatRoom> chatroomlist = new ArrayList<ChatRoom>();

		chatroomlist = chatroomservice.getChatRoom(chatroom);

		return chatroomlist;
	}

	// 채팅방 생성
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public int createRoom(@RequestBody ChatRoom chatroom) {

		int result = chatroomservice.createRoom(chatroom);

		return result;
	}

	// 채팅방 삭제
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public int deleteRoom(@RequestBody ChatRoom chatroom) {

		int result = chatroomservice.deleteRoom(chatroom);

		return result;
	}

	// 2인 채팅 생성
	@RequestMapping(value="/pairRoomCreate", method=RequestMethod.POST)
	public int pairRoom(@RequestBody ChatRoom chatroom) {
		
		//2인 채팅 생성
		int result = chatroomservice.pairRoomCreate(chatroom);
		
		return result;
	}
	
	//채팅방 초대
	@RequestMapping(value="/invite", method=RequestMethod.POST)
	public int inviteRoom(@RequestBody ChatUser chatuser) {
		
		int result = chatuserservice.addChatUser(chatuser);
	
		return result;
	}

}

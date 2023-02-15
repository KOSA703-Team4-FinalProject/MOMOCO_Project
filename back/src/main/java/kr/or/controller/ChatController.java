package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
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
	
	private ChatUserService chatuserservice;
	
	@Autowired
	public void setChatUserService(ChatUserService chatuserservice) {
		this.chatuserservice = chatuserservice;
	}
	
	//특정 Broker로 메세지를 전달
	private final SimpMessagingTemplate template;
	
	//채팅방 퇴장
	@RequestMapping(value="/api/chat/del", method=RequestMethod.DELETE)
	public int deleteChatUser(@RequestBody ChatUser chatuser) {
		int result = chatuserservice.deleteChatUser(chatuser);
		
		return result;
	}
	
	//Client가 send할 수 있는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	//	/pub/chat/enter
	@MessageMapping("/chat/enter")
	public void enter(Chat chat) {
		
		System.out.println("여기");
		
		ChatUser chatuser = new ChatUser();
		chatuser.setU_idx(chat.getU_idx());
		chatuser.setR_idx(chat.getR_idx());
		chatuser.setNickname(chat.getNickname());
		chatuser.setUrl(chat.getUrl());
		
		int result = chatuserservice.isChatUser(chatuser);
		
		if(result >= 1) {	//기존 유저
			
			//채팅 기록 불러오기
			List<Chat> chatlist = new ArrayList<Chat>();
			chatlist = chatservice.getChat(chat);
			
			//채팅방 정보 가져오기
			ChatRoom tmp = new ChatRoom();
			tmp.setR_idx(chat.getR_idx());
			tmp.setUrl(chat.getUrl());
			ChatRoom room = chatroomservice.selectRoom(tmp);
			
			List<Object> resultList = new ArrayList<Object>();
			resultList.add(chatlist);
			resultList.add(room);
			
			template.convertAndSend("/sub/chat/postInfo/" + chat.getR_idx(), resultList);
			
		} else { //신규 유저
			
			chatuserservice.addChatUser(chatuser); //DB 채팅방 유저에 추가
			
			chat.setContent(chat.getNickname() + "님이 채팅방에 참여하였습니다.");
			chat.setNickname("sys");
			template.convertAndSend("/sub/chat/room/" + chat.getR_idx(), chat);
		}
		
	}
	
	//채팅 전송
	@MessageMapping("/chat/message")
	public void message(Chat chat) {
		
		chatservice.sendChat(chat);
		
		template.convertAndSend("/sub/chat/room/" + chat.getR_idx(), chat);
	}
	
	
}

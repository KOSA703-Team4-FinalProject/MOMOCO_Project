package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.ChatUser;

public interface ChatUserDao {
	
	//해당 채팅방에 해당 유저가 있는지 판별
	public int isChatUser(ChatUser chatuser) throws ClassNotFoundException, SQLException;

	//채팅방 입장
	public int addChatUser(ChatUser chatuser) throws ClassNotFoundException, SQLException;
	
	//채팅방 퇴장
	public int deleteChatUser(ChatUser chatuser) throws ClassNotFoundException, SQLException; 
	
	//채팅방 안의 유저 리스트
	public List<ChatUser> getChatUserList(ChatUser chatuser) throws ClassNotFoundException, SQLException;
	
}

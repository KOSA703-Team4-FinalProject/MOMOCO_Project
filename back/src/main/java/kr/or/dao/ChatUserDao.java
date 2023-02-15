package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.ChatUser;

public interface ChatUserDao {

	//채팅방 입장
	public int addChatUser(ChatUser chatuser) throws ClassNotFoundException, SQLException;
	
}

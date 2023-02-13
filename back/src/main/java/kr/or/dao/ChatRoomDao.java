package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.ChatRoom;

public interface ChatRoomDao {

	//채팅방 전체 확인
	public List<ChatRoom> getChatRoom(ChatRoom chatroom) throws ClassNotFoundException, SQLException;
	
}

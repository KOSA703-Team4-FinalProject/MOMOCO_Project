package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Chat;

public interface ChatDao {
	
	//채팅방 기록 불러오기
	public List<Chat> getChat(Chat chat) throws ClassNotFoundException, SQLException;

}

package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Chat;

public interface ChatDao {
	
	//채팅방 기록 불러오기
	public List<Chat> getChat(Chat chat) throws ClassNotFoundException, SQLException;

	//채팅 전송
	public int sendChat(Chat chat) throws ClassNotFoundException, SQLException;
	
	//채팅방 파일 기록 불러오기
	public List<Chat> getFileList(Chat chat) throws ClassNotFoundException, SQLException;
	
}

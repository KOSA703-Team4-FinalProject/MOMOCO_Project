package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.ChatRoom;

public interface ChatRoomDao {

	//채팅방 전체 확인
	public List<ChatRoom> getChatRoom(ChatRoom chatroom) throws ClassNotFoundException, SQLException;
	
	//채팅방 생성
	public int createRoom(ChatRoom chatroom) throws ClassNotFoundException, SQLException;
	
	//채팅방 삭제
	public int deleteRoom(ChatRoom chatroom) throws ClassNotFoundException, SQLException; 
	
	//특정 채팅방 조회
	public ChatRoom getChatRoomByRidx(ChatRoom chatroom) throws ClassNotFoundException, SQLException; 
	
	//2인 채팅 생성
	public int pairRoomCreate(ChatRoom chatroom) throws ClassNotFoundException, SQLException; 
	
	//2인 채팅방 생성 전 해당 채팅방이 있는 지 확인
	public int isPairRoom(String r_name) throws ClassNotFoundException, SQLException; 
	
	//특정 채팅방 이름으로 조회
	public ChatRoom getChatRoomByRName(ChatRoom chatroom) throws ClassNotFoundException, SQLException;
	
}

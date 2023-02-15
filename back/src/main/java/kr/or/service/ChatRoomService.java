package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.ChatRoomDao;
import kr.or.vo.ChatRoom;

@Service
public class ChatRoomService {
	
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//채팅방 전체확인
	public List<ChatRoom> getChatRoom(ChatRoom chatroom) {
		
		List<ChatRoom> list = new ArrayList<ChatRoom>();
		
		try {
			
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			list = charroomdao.getChatRoom(chatroom);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}

	//채팅방 생성
	public int createRoom(ChatRoom chatroom) {
		int result = 0;
		
		try {
			
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			result = charroomdao.createRoom(chatroom);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//채팅방 삭제
	public int deleteRoom(ChatRoom chatroom) {
		int result = 0;
		
		try {
			
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			result = charroomdao.deleteRoom(chatroom);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//특정 채팅방 조회
	public ChatRoom selectRoom(ChatRoom chatroom) {
		ChatRoom room = new ChatRoom();
		
		try {
			
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			room = charroomdao.getChatRoomByRidx(chatroom);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return room;
	}
	
	
	
}

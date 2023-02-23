package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.ChatRoomDao;
import kr.or.dao.ChatUserDao;
import kr.or.utils.AlarmSocket;
import kr.or.vo.ChatRoom;

@Service
public class ChatRoomService {
	
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	private AlarmSocket alarmsocket;
	
	@Autowired
	public void setAlarmSocket(AlarmSocket alarmsocket) {
		this.alarmsocket = alarmsocket;
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
			
			//챗룸 생성
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
	
	//2인 채팅 생성
	@Transactional
	public int pairRoomCreate(ChatRoom chatroom) {
		int result = 0;
		
		try {
			
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			
			//2인 채팅방 생성 전 해당 채팅방이 있는 지 확인
			result = charroomdao.isPairRoom(chatroom);
			
			System.out.println("채팅방 유무" + result);
			
			if(result == 0) {
				//2인 채팅방 생성
				System.out.println(chatroom.toString());
				result = charroomdao.pairRoomCreate(chatroom);
			}else {
				//기존 채팅방 유지
			}
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//특정 채팅방 제목으로 조회
	public ChatRoom getChatRoomByRname(ChatRoom chatroom) {
		ChatRoom resultRoom = new ChatRoom();
		
		try {
			ChatRoomDao charroomdao = sqlsession.getMapper(ChatRoomDao.class);
			resultRoom = charroomdao.getChatRoomByRName(chatroom);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return resultRoom;
	}
	
}

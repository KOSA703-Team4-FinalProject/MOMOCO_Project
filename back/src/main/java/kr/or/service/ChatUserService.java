package kr.or.service;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.ChatUserDao;
import kr.or.vo.ChatUser;

@Service
public class ChatUserService {
	
	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	//해당 채팅방에서 유저가 기존유저인지 아닌지 판별
	public int isChatUser(ChatUser chatuser) {
		int result = 0;
		
		try {
			
			ChatUserDao chatuserdao = sqlsession.getMapper(ChatUserDao.class);
			result = chatuserdao.isChatUser(chatuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		System.out.println("유무 결과 + " + result);
		
		return result;
	}

	//채팅방 유저 추가
	public int addChatUser(ChatUser chatuser) {
		int result = 0;
	
		try {
			
			ChatUserDao chatuserdao = sqlsession.getMapper(ChatUserDao.class);
			result = chatuserdao.addChatUser(chatuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//채팅방 유저 퇴장
	public int deleteChatUser(ChatUser chatuser) {
		int result = 0;
		try {
			
			ChatUserDao chatuserdao = sqlsession.getMapper(ChatUserDao.class);
			chatuserdao.deleteChatUser(chatuser);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
}

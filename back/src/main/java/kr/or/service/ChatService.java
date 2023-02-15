package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.ChatDao;
import kr.or.dao.ChatRoomDao;
import kr.or.vo.Chat;

@Service
public class ChatService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 채팅 기록 불러오기
	public List<Chat> getChat(Chat chat) {

		List<Chat> chatlist = new ArrayList<Chat>();

		try {

			ChatDao chatdao = sqlsession.getMapper(ChatDao.class);
			chatlist = chatdao.getChat(chat);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return chatlist;
	}

	// 채팅 전송
	public int sendChat(Chat chat) {

		int result = 0;

		try {
			
			ChatDao chatdao = sqlsession.getMapper(ChatDao.class);
			result = chatdao.sendChat(chat);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

}

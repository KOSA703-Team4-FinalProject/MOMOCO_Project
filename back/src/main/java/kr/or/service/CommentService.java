package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.stream.events.Comment;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.CommentDao;
import kr.or.dao.CommonBoardDao;
import kr.or.vo.Comments;

@Service
public class CommentService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}
	
	
	
	//댓글 입력하기 
	public int addComment(Comments all) {
		int result =0;
		try {
			CommentDao commentdao = sqlsession.getMapper(CommentDao.class);
			result = commentdao.addComment(all);
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return result;
	}
	
	//댓글 내용
	public Comments commentComments (Comments  comment) {
		Comments com = new Comments();
		try {
			CommentDao commentdao = sqlsession.getMapper(CommentDao.class);
			com = commentdao.commentContent(comment);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return com;
		
	}
	//댓글 리스트
	public List<Comments> getComment(Comments  comment){
		List<Comments> comlist = new ArrayList<Comments>();
		System.out.println(comment.getUrl() + comment.getIdx());
		try {
			CommentDao comdao =sqlsession.getMapper(CommentDao.class);
			comlist = comdao.getComment( comment);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return comlist;
		
	}
	//대댓글 작성
	public int replyComment(Comments all) {
		int result =0;
		try {
			CommentDao commentdao = sqlsession.getMapper(CommentDao.class);
			result = commentdao.replyComment(all);
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return result;
	}
	//댓 삭제
	public int deletecomment(Comments co_idx) {
		
		int result =0; 
		try {
			CommentDao commentdao =sqlsession.getMapper(CommentDao.class);
			result =commentdao.deletecomment(co_idx);
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
		
	}
}

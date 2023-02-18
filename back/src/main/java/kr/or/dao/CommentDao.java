package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Comments;
public interface CommentDao {
		//댓글 쓰기 
		public int  addComment (Comments all) throws ClassNotFoundException, SQLException;
		//댓글 내용
		public Comments commentContent (Comments idx) throws ClassNotFoundException, SQLException;
		//댓글 목록
		public List<Comments> getComment (Comments comment) throws ClassNotFoundException, SQLException;
		

}

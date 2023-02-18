package kr.or.dao;

import java.sql.SQLException;

import kr.or.vo.Comments;
import kr.or.vo.CommonBoard;
public interface CommentDao {
		//댓글 쓰기 
		public int  addComment (Comments all) throws ClassNotFoundException, SQLException;
		//댓글 내용
		public Comments commentContent (Comments idx) throws ClassNotFoundException, SQLException;
}

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
		//대댓글 작성
		public int replyComment(Comments all) throws  ClassNotFoundException, SQLException;
		//댓삭제
		public int deletecomment(Comments co_idx) throws  ClassNotFoundException, SQLException;

}

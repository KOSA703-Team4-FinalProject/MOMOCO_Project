package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.CommentService;
import kr.or.vo.Comments;

@RestController
@RequestMapping("/comment")
public class CommentController {
	private CommentService commentservice;
	
	@Autowired
	public void setCommentService(CommentService commentservice) {
		this.commentservice = commentservice;
	}
	
	//댓 쓰기
	@RequestMapping(value="/commentwrite", method =RequestMethod.POST)
	public int addComment(@RequestBody Comments all) {
		int result = commentservice.addComment(all);
		return result;
		
	}
	//댓글 내용
	@RequestMapping(value ="/commentcontent" ,method =RequestMethod.POST)
	public Comments contentComments(@RequestBody Comments comment) {
		Comments  com = new Comments();
		return com = commentservice.commentComments(comment);
	}
	//댓글 리스트
	@RequestMapping(value="/commentlist", method=RequestMethod.POST)
	public List<Comments> commentlist(@RequestBody Comments comment) {
	    List<Comments> commlist = commentservice.getComment(comment);
	    System.out.println(commlist);
	    return commlist;
	}
}

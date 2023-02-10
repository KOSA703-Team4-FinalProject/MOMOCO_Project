package kr.or.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.BoardService;
import kr.or.vo.Board;

@RestController
@RequestMapping("/board")
public class BoardController {
	private BoardService boardservice;
	@Autowired
	public void BoardSerive(BoardService boardservice) {
		this.boardservice = boardservice;
	}
	//게시판 글작성
	@RequestMapping(value="/boardwrite",method=RequestMethod.POST)
	public ResponseEntity<String> insert (@RequestBody Board board){
		
		try {
			System.out.println("게시판 글작성");
			boardservice.addBoard(board);
			return new ResponseEntity<String>("insert success", HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<String>("insert fail", HttpStatus.BAD_REQUEST);
		}
		
		
		
		
		
	}
}

package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

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
	//글 리스트
	@RequestMapping(value="/boardlist",method =RequestMethod.GET)
	public ResponseEntity<List<Board>> boardlist(){
		List<Board> list = new ArrayList<Board>();
		try {
			System.out.println("list 정상실행");
			return new ResponseEntity<List<Board>>(list,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<Board>>(list,HttpStatus.BAD_REQUEST);
		}
		
		}
	
		
		
		
		
	
}

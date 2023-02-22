package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.BoardSerivce;
import kr.or.vo.Board;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/allboard")
public class BoardController {
		
	private BoardSerivce boardservice;
	
	@Autowired
	public void setBoardSerive(BoardSerivce boardservice) {
		this.boardservice = boardservice;
	}
	//전체글 조회
	@RequestMapping(value="/allboardlist",method =RequestMethod.POST)
	public List<Board> allboardlist(@RequestBody Board url){

		 List<Board> boardlist = new ArrayList<Board>();
			
		 boardlist = boardservice.allBoardList(url.getUrl());
		 return boardlist;
	}
	
	
}

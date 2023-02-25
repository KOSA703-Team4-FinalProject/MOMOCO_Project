package kr.or.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.BoardSerivce;
import kr.or.vo.Board;
import kr.or.vo.CommonBoard;
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

	// 전체글 조회
	@RequestMapping(value = "/allboardlist", method = RequestMethod.POST)
	public List<Board> allboardlist(@RequestBody Board url) {

		List<Board> boardlist = new ArrayList<Board>();

		boardlist = boardservice.allBoardList(url);
		return boardlist;
	}

	// 보드번호로 검색하기
	@RequestMapping(value = "/searchboardnumber", method = RequestMethod.POST)
	public List<Board> searchboardnumber(@RequestBody(required = false) Board search) {

		List<Board> searchlist = boardservice.searchboardnumber(search);

		return searchlist;
	}

	// 검색
	@RequestMapping(value = "/boardsearch", method = RequestMethod.POST)
	public List<Board> commonboardSearch(@RequestBody(required = false) CommonBoard search) {

		List<Board> searchboard = boardservice.boardSearch(search);
		return searchboard;

	}

	// 읽지않은글
	@RequestMapping(value = "/notread", method = RequestMethod.POST)
	public List<Board> notread(@RequestBody Board url) {

		List<Board> boardlist = new ArrayList<Board>();

		boardlist = boardservice.notread(url);
		return boardlist;
	}
	
	//대시보드
	@RequestMapping(value="/dashboard", method = RequestMethod.GET)
	public Map<String, List<Board>> getDashBoard(@RequestParam(value="url") String url, @RequestParam(value="u_idx") int u_idx){
		
		Map<String, List<Board>> reMap = new HashMap<String, List<Board>>();
		
		//전체 최신 글 리스트
		List<Board> newboardlist = boardservice.getNewBoardList(url);
		
		//확인 안한 글 리스트
		List<Board> notreadboardlist = boardservice.getNotReadBoardList(url, u_idx);
		
		reMap.put("newList", newboardlist);
		reMap.put("notreadList", notreadboardlist);
		
		return reMap;
	}
	
	
}

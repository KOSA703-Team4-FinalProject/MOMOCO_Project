package kr.or.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.service.CommonBoardService;
import kr.or.vo.Chat;
import kr.or.vo.CommonBoard;

@RestController
@RequestMapping("/board")
public class CommonBoardController {

	
	private CommonBoardService commonboardservice;
	
	@Autowired
	public void setCommonBoardSerive(CommonBoardService commonboardservice) {
		this.commonboardservice = commonboardservice;
	}
	
	//글 리스트
	@RequestMapping(value="/boardlist",method =RequestMethod.POST)
	public List<CommonBoard> boardlist(@RequestBody CommonBoard url){
		
		List<CommonBoard> boardlist = new ArrayList<CommonBoard>();
		
		boardlist = commonboardservice.getBoard(url.getUrl());
	
		return boardlist;
	}
	
	//글읽기
	@RequestMapping(value="/boardcontent",method =RequestMethod.POST)
	public CommonBoard getBoardByIdx(@RequestBody CommonBoard idx) {
		
		CommonBoard common = new CommonBoard();
		
		common = commonboardservice.getBoardByIdx(idx);
		
		return  common;
	}
//	//글쓰기
//	@RequestMapping(value="/boardwrite",method = RequestMethod.POST)
//	public int addCommonBoard(@RequestBody CommonBoard commonboard ) {
//		
//		int result = commonboardservice.addCommonBoard(commonboard);
//		
//		return result;
//		
//	}
	
	
	
	
	 //글쓰기
		@RequestMapping(value = "/boardwrite", method = RequestMethod.POST)
		public int addCommonBoard(@RequestParam(value="file") MultipartFile[] files, @RequestParam(value="boardwrite") String boardwrite, HttpServletRequest request) {
			
			CommonBoard board = null;
		      ObjectMapper mapper = new ObjectMapper();

			 try {
		         //String to DTO
		         board = mapper.readValue(boardwrite, CommonBoard.class);
		         
		      } catch (Exception e) {
		         e.printStackTrace();
		      }
		   
		
		      board.setOri_filename(files[0].getOriginalFilename());
		      String filename = files[0].getOriginalFilename();
		      String path = request.getServletContext().getRealPath("/resources/upload/board"); // 배포된 서버 경로
		      String fpath = path + "\\" + filename;
		      //경로 검색
		      System.out.println(path);
		      
		      FileOutputStream fs = null;
		      try {
		         fs = new FileOutputStream(fpath);
		         fs.write(files[0].getBytes());

		      } catch (Exception e) {
		         e.printStackTrace();
		      } finally {
		         try {
		            fs.close();
		         } catch (IOException e) {
		            e.printStackTrace();
		         }
		      }
		   
		   
		    int result = commonboardservice.addCommonBoard(board);
		    return result;
		}
	//글 삭제 
	@RequestMapping(value="boarddelete", method =RequestMethod.POST)
	public int deleteCommonBoard(@RequestBody CommonBoard commonboard) {
		int result = commonboardservice.delectCommonboard(commonboard);
		return result;
		
	}
	
	//알림보낼 사람 선택하기
	@RequestMapping(value="boardalramlist" ,method=RequestMethod.POST)
	public List<CommonBoard>boardalramlist(@RequestBody CommonBoard url){

		List<CommonBoard> alarmlist = commonboardservice.boardalramlist(url.getUrl());
	
		return alarmlist;
	}
	

}

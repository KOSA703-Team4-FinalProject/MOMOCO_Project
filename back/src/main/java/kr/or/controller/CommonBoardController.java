package kr.or.controller;

import java.io.File;
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


	 //글쓰기
		@RequestMapping(value = "/boardwrite", method = RequestMethod.POST)
		public int addCommonBoard(@RequestParam(value="file") MultipartFile[] files, @RequestParam(value="write1") String boardwrite, HttpServletRequest request) {
			
			CommonBoard board = null;
		      ObjectMapper mapper = new ObjectMapper();

			 try {
		         //String to DTO
		         board = mapper.readValue(boardwrite, CommonBoard.class);
		         
		      } catch (Exception e) {
		         e.printStackTrace();
		      }
		   
		
		  

		      //파일 명
		      String filename = files[0].getOriginalFilename();
		      //확장자
		      String extension = filename.substring(filename.lastIndexOf("."));
		      //확장자를 제외한 파일 명
		      String onlyFileName = filename.substring(0, filename.lastIndexOf("."));
		      
		      //저장할 파일 명
		      String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis())).concat(extension);
		      String savePath = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl() + "/" + saveFileName;
		      
		      // 파일이 저장될 경로
		       String path = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl();
		       // 폴더 생성
		       File folder = new File(path);
		       if (!folder.exists()) {
		          folder.mkdirs();
		       }
		      
		      System.out.println(savePath);
		      
		      try {
		         File dest = new File(savePath);
		         files[0].transferTo(dest);
		      } catch (IOException e) {
		         e.printStackTrace();
		      }
		      

		      board.setOri_filename(files[0].getOriginalFilename());
		      board.setFiletype(files[0].getContentType());
		      board.setVolume(files[0].getSize());
		    int result = commonboardservice.addCommonBoard(board);
		    return result;
		}
	//글 삭제 
	@RequestMapping(value="/boarddelete", method =RequestMethod.POST)
	public int deleteCommonBoard(@RequestBody CommonBoard commonboard) {
		int result = commonboardservice.delectCommonboard(commonboard);
		return result;
		
	}
	//수정하기
	@RequestMapping(value="/boardedit",method =RequestMethod.POST)
	public int updateCommonBoard(@RequestBody CommonBoard idx) {
		
		int common = commonboardservice.updateCommonBoard(idx);
		return  common;
	}
	
	//알림보낼 사람 선택하기
	@RequestMapping(value="/boardalramlist" ,method=RequestMethod.POST)
	public List<CommonBoard>boardalramlist(@RequestBody CommonBoard url){

		List<CommonBoard> alarmlist = commonboardservice.boardalramlist(url.getUrl());
	
		return alarmlist;
	}
	//검색
	@RequestMapping(value="/commonboardsearch",method=RequestMethod.POST)
	public List<CommonBoard> commonboardSearch(@RequestBody(required = false) CommonBoard search){
		System.out.println("아니이건 뭐지"+search.toString());
			List<CommonBoard> searchlist = commonboardservice.commonboardSearch(search);
			
			return searchlist;
		
	
		

	}
}

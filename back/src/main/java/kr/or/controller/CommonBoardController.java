package kr.or.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.service.CommonBoardService;
import kr.or.vo.CommonBoard;

@RestController
@RequestMapping("/board")
public class CommonBoardController {

	//게시판 전체 목록 
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
	public int addCommonBoard(
	    @RequestParam(value = "file", required = false) MultipartFile[] files,
	    @RequestParam("url") String url,
	    @RequestParam("title") String title,
	    @RequestParam("nickname") String nickname,
	    @RequestParam("content") String content,
	    @RequestParam("ori_filename") String ori_filename,
	    @RequestParam("filesize") int filesize
	) {
		System.out.println(files);
	    String fileNames = "";
	    String filePath = "C:/saveFolder/";
	    File folder = new File("C:/saveFolder/");
	    if (!folder.exists()) {
	        folder.mkdir();
	    }
	   
	    // Handle file upload
	    if (files != null) {
	        for (MultipartFile file : files) {
	            String originalFileName = file.getOriginalFilename();
	            long fileSize = file.getSize();

	            String safeFile = System.currentTimeMillis() + originalFileName;
	            fileNames += "," + safeFile;
	            System.out.println("originFileName : " + ori_filename);
	            System.out.println("fileSize : " + fileSize);

	           
	            try {
	                File f1 = new File(filePath + safeFile);
	                file.transferTo(f1);
	            } catch (IllegalStateException e) {
	                e.printStackTrace();
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
	        }
	    }

	    CommonBoard commonboard = new CommonBoard();
	    commonboard.setUrl(url);
	    commonboard.setTitle(title);
	    commonboard.setNickname(nickname);
	   
	    commonboard.setContent(content);
	    commonboard.setVolume(filesize);
	    
	    commonboard.setOri_filename(ori_filename); // Remove first comma

	    int result = commonboardservice.addCommonBoard(commonboard);
	    return result;
	}
	//글 삭제 
	@RequestMapping(value="boarddelete", method =RequestMethod.POST)
	public int deleteCommonBoard(@RequestBody CommonBoard commonboard) {
		int result = commonboardservice.delectCommonboard(commonboard);
		return result;
		
	}
}

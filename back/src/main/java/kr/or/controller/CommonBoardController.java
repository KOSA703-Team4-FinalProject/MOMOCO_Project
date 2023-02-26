package kr.or.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.service.CommonBoardService;
import kr.or.utils.AlarmSocket;
import kr.or.vo.CommonBoard;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class CommonBoardController {

	private CommonBoardService commonboardservice;

	@Autowired
	public void setCommonBoardSerive(CommonBoardService commonboardservice) {
		this.commonboardservice = commonboardservice;
	}

	private AlarmSocket alarmsocket;

	@Autowired
	public void setAlarmSocket(AlarmSocket alarmsocket) {
		this.alarmsocket = alarmsocket;
	}

	// 글 리스트
	@RequestMapping(value = "/boardlist", method = RequestMethod.POST)
	public List<CommonBoard> boardlist(@RequestBody CommonBoard url) {

		List<CommonBoard> boardlist = new ArrayList<CommonBoard>();

		boardlist = commonboardservice.getBoard(url);

		return boardlist;
	}

	// 글읽기
	@RequestMapping(value = "/boardcontent", method = RequestMethod.POST)
	public CommonBoard getBoardByIdx(@RequestBody CommonBoard idx) {

		CommonBoard common = new CommonBoard();

		common = commonboardservice.getBoardByIdx(idx);

		return common;
	}

	// 글쓰기
	@RequestMapping(value = "/boardwrite", method = RequestMethod.POST)
	public int addCommonBoard(@RequestParam(value = "file", required = false) MultipartFile[] files,
			@RequestParam(value = "write1") String boardwrite, HttpServletRequest request) {

		CommonBoard board = null;
		ObjectMapper mapper = new ObjectMapper();

		try {
			// String to DTO
			board = mapper.readValue(boardwrite, CommonBoard.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		if (files != null) {
			// 파일 명
			String filename = files[0].getOriginalFilename();
			// 확장자
			String extension = filename.substring(filename.lastIndexOf("."));
			// 확장자를 제외한 파일 명
			String onlyFileName = filename.substring(0, filename.lastIndexOf("."));

			// 저장할 파일 명
			String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis()))
					.concat(extension);
			String savePath = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl() + "/"
					+ saveFileName;

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
			board.setSave_filename(saveFileName);
			board.setFiletype(files[0].getContentType());
			board.setVolume(files[0].getSize());
			board.setThumb("");

		} else {
			board.setOri_filename("");
			board.setSave_filename("");
			board.setFiletype("");
			board.setVolume(0);
			board.setThumb("");
		}

		int result = commonboardservice.addCommonBoard(board);

		String[] u_idxList = board.getU_idxList().split(",");

		alarmsocket.sendAlarm(board, u_idxList);

		return result;
	}

	// 글 삭제
	@RequestMapping(value = "/boarddelete", method = RequestMethod.POST)
	public int deleteCommonBoard(@RequestBody CommonBoard commonboard) {
		int result = commonboardservice.delectCommonboard(commonboard);
		return result;

	}

	// 글수정

	@RequestMapping(value = "/boardmodify", method = RequestMethod.POST)
	public int modifyCommonBoard(@RequestParam(value = "file", required = false) MultipartFile[] files,
			@RequestParam(value = "edit") String boardwrite, HttpServletRequest request) {
		
		CommonBoard board = null;
		ObjectMapper mapper = new ObjectMapper();

		try {
			// String to DTO
			board = mapper.readValue(boardwrite, CommonBoard.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(files != null) {
			// 새로운 파일이 업로드되었는지 확인
			if (files.length > 0 && !files[0].isEmpty()) {
				// 파일 명
				String filename = files[0].getOriginalFilename();
				// 확장자
				String extension = filename.substring(filename.lastIndexOf("."));
				// 확장자를 제외한 파일 명
				String onlyFileName = filename.substring(0, filename.lastIndexOf("."));

				// 저장할 파일 명
				String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis()))
						.concat(extension);
				String savePath = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl() + "/"
						+ saveFileName;

				// 파일이 저장될 경로
				String path = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl();
				// 폴더 생성
				File folder = new File(path);
				if (!folder.exists()) {
					folder.mkdirs();
				}

				try {
					File dest = new File(savePath);
					files[0].transferTo(dest);
				} catch (IOException e) {
					e.printStackTrace();
				}

				board.setOri_filename(files[0].getOriginalFilename());
				board.setFiletype(files[0].getContentType());
				board.setVolume(files[0].getSize());
				board.setSave_filename(saveFileName);
			}
		}else {
			board.setOri_filename("");
			board.setSave_filename("");
			board.setFiletype("");
			board.setVolume(0);
			board.setThumb("");
		}
		

		int result = commonboardservice.modifyCommonBoard(board);

		String[] u_idxList = board.getU_idxList().split(",");
		alarmsocket.sendAlarm(board, u_idxList);

		return result;
	}

	// 알림보낼 사람 선택하기
	@RequestMapping(value = "/boardalramlist", method = RequestMethod.POST)
	public List<CommonBoard> boardalramlist(@RequestBody CommonBoard url) {

		List<CommonBoard> alarmlist = commonboardservice.boardalramlist(url.getUrl());

		return alarmlist;
	}

	// 검색
	@RequestMapping(value = "/commonboardsearch", method = RequestMethod.POST)
	public List<CommonBoard> commonboardSearch(@RequestBody(required = false) CommonBoard search) {
		System.out.println("아니이건 뭐지" + search.toString());
		List<CommonBoard> searchlist = commonboardservice.commonboardSearch(search);

		return searchlist;

	}

	// 답글글쓰기
	@RequestMapping(value = "/relyboardwrite", method = RequestMethod.POST)
	public int replyCommonBoard(@RequestParam(value = "file") MultipartFile[] files,
			@RequestParam(value = "write1") String boardwrite, HttpServletRequest request) {

		CommonBoard board = null;
		ObjectMapper mapper = new ObjectMapper();

		try {
			// String to DTO
			board = mapper.readValue(boardwrite, CommonBoard.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		// 파일 명
		String filename = files[0].getOriginalFilename();
		// 확장자
		String extension = filename.substring(filename.lastIndexOf("."));
		// 확장자를 제외한 파일 명
		String onlyFileName = filename.substring(0, filename.lastIndexOf("."));

		// 저장할 파일 명
		String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis()))
				.concat(extension);
		String savePath = request.getServletContext().getRealPath("/resources/upload/board_") + board.getUrl() + "/"
				+ saveFileName;

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
		int result = commonboardservice.replyCommonBoard(board);

		String[] u_idxList = board.getU_idxList().split(",");

		alarmsocket.sendAlarm(board, u_idxList);

		return result;
	}

	@RequestMapping(value = "/viewImage", method = RequestMethod.POST)
	public void viewImage(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {

		commonboardservice.getImge(url, content, request, response);

	}

	// 파일 다운로드 전 사전 토큰 확인
	@RequestMapping(value = "/api/token", method = RequestMethod.GET)
	public int isToekn() {

		return 1;
	}

	// 파일 다운로드
	@RequestMapping(value = "/fileDown", method = RequestMethod.GET)
	public void downFile(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println(url);
		System.out.println(content);
		File file = new File(request.getServletContext().getRealPath("/resources/upload/board_") + url + "/" + content);

		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ServletOutputStream sos = null;

		try {

			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			sos = response.getOutputStream();

			String reFilename = "";

			// IE로 실행한 경우인지 -> IE는 따로 인코딩 작업을 거쳐야 한다. request헤어에 MSIE 또는 Trident가 포함되어 있는지
			// 확인
			boolean isMSIE = request.getHeader("user-agent").indexOf("MSIE") != -1
					|| request.getHeader("user-agent").indexOf("Trident") != -1;

			if (isMSIE) {
				reFilename = URLEncoder.encode(content, "utf-8");
				reFilename = reFilename.replaceAll("\\+", "%20");
			} else {
				reFilename = new String(content.getBytes("utf-8"), "ISO-8859-1");
			}

			response.setContentType("application/octet-stream;charset=utf-8");
			response.addHeader("Content-Disposition", "attachment;filename=\"" + reFilename + "\"");
			response.setContentLength((int) file.length());

			int read = 0;
			while ((read = bis.read()) != -1) {
				sos.write(read);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}

package kr.or.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.service.ChatRoomService;
import kr.or.service.ChatService;
import kr.or.service.ChatUserService;
import kr.or.service.WorkSpaceService;
import kr.or.vo.Chat;
import kr.or.vo.ChatRoom;
import kr.or.vo.ChatUser;
import kr.or.vo.WorkSpaceUser;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;

@RestController
@RequiredArgsConstructor
public class ChatController {

	private ChatService chatservice;

	@Autowired
	public void setCharService(ChatService chatservice) {
		this.chatservice = chatservice;
	}

	private ChatRoomService chatroomservice;

	@Autowired
	public void setCharRoomService(ChatRoomService chatroomservice) {
		this.chatroomservice = chatroomservice;
	}

	private ChatUserService chatuserservice;

	@Autowired
	public void setChatUserService(ChatUserService chatuserservice) {
		this.chatuserservice = chatuserservice;
	}

	private WorkSpaceService workspaceservice;

	@Autowired
	public void setWorkspaceservice(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}

	// ?????? Broker??? ???????????? ??????
	private final SimpMessagingTemplate template;

	// ????????? ??????
	@RequestMapping(value = "/api/chat/del", method = RequestMethod.DELETE)
	public int deleteChatUser(@RequestBody ChatUser chatuser) {
		int result = chatuserservice.deleteChatUser(chatuser);

		return result;
	}

	// ?????? ??????
	@RequestMapping(value = "/api/chat/file", method = RequestMethod.POST)
	public int messagefile(@RequestParam(value = "file") MultipartFile[] files,
			@RequestParam(value = "chat") String chat, HttpServletRequest request) {

		Chat mychat = null;
		ObjectMapper mapper = new ObjectMapper();
		try {
			// String to DTO
			mychat = mapper.readValue(chat, Chat.class);

		} catch (Exception e) {
			e.printStackTrace();
		}

		// ?????? ???
		String filename = files[0].getOriginalFilename();
		// ?????????
		String extension = filename.substring(filename.lastIndexOf("."));
		// ???????????? ????????? ?????? ???
		String onlyFileName = filename.substring(0, filename.lastIndexOf("."));

		// ????????? ?????? ???
		String saveFileName = onlyFileName.concat("_").concat(String.valueOf(System.currentTimeMillis()))
				.concat(extension);

		String savePath = "";
		// ????????? ????????? ??????
		String path = "";

		if (mychat.getContent_type().equals("img")) {
			savePath = request.getServletContext().getRealPath("/resources/upload/imgStorage_") + mychat.getUrl() + "/"
					+ saveFileName;
			path = request.getServletContext().getRealPath("/resources/upload/imgStorage_") + mychat.getUrl();
			
		} else {
			savePath = request.getServletContext().getRealPath("/resources/upload/chatStorage_") + mychat.getUrl() + "/"
					+ saveFileName;
			path = request.getServletContext().getRealPath("/resources/upload/chatStorage_") + mychat.getUrl();
		}

		// ?????? ??????
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
		
		//???????????? ?????? ????????? ??????
		if (mychat.getContent_type().equals("img")) {
			String thumbnailSaveName = request.getServletContext().getRealPath("/resources/upload/imgStorage_") + mychat.getUrl() + "/s_" + saveFileName;
			File thumbnailFile = new File(thumbnailSaveName);
			
			Path savePath2 = Paths.get(savePath);
			
			try {
				Thumbnailator.createThumbnail(savePath2.toFile(), thumbnailFile, 100, 100);
				
				
				
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		mychat.setContent(saveFileName);

		// DB??? ??????
		int result = chatservice.sendChat(mychat);

		// ???????????? ?????? ??????
		template.convertAndSend("/sub/chat/room/" + mychat.getR_idx(), mychat);

		return result;
	}

	// ?????? ???????????? ??? ?????? ?????? ??????
	@RequestMapping(value = "/api/token", method = RequestMethod.GET)
	public int isToekn() {

		return 1;
	}

	// ?????? ????????????
	@RequestMapping(value = "/api/chat/fileDown", method = RequestMethod.GET)
	public void downFile(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {

		File file = new File(
				request.getServletContext().getRealPath("/resources/upload/chatStorage_") + url + "/" + content);

		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ServletOutputStream sos = null;

		try {

			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			sos = response.getOutputStream();

			String reFilename = "";

			// IE??? ????????? ???????????? -> IE??? ?????? ????????? ????????? ????????? ??????. request????????? MSIE ?????? Trident??? ???????????? ?????????
			// ??????
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
	
	// ????????? ?????? ??????
	@RequestMapping(value = "/api/chat/imgView", method = RequestMethod.GET)
	public void getImge(@RequestParam(value = "url") String url, @RequestParam(value = "content") String content,
			HttpServletRequest request, HttpServletResponse response) {

		File file = new File(
				request.getServletContext().getRealPath("/resources/upload/imgStorage_") + url + "/" + content);

		FileInputStream fis = null;
		BufferedInputStream bis = null;
		ServletOutputStream sos = null;

		try {

			fis = new FileInputStream(file);
			bis = new BufferedInputStream(fis);
			sos = response.getOutputStream();

			String reFilename = "";

			// IE??? ????????? ???????????? -> IE??? ?????? ????????? ????????? ????????? ??????. request????????? MSIE ?????? Trident??? ???????????? ?????????
			// ??????
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

	// ????????? ?????? ?????? ?????????
	@RequestMapping(value = "/api/chat/userList", method = RequestMethod.GET)
	public List<Object> getChatUserList(@RequestParam("url") String url, @RequestParam("r_idx") int r_idx) {
		List<ChatUser> userList = new ArrayList<ChatUser>();

		ChatUser chatuser = new ChatUser();
		chatuser.setUrl(url);
		chatuser.setR_idx(r_idx);

		// ????????? ?????? ?????? ?????????
		userList = chatuserservice.getChatUserList(chatuser);

		// ????????? ?????? ?????? ????????????????????? ?????? ?????????
		List<WorkSpaceUser> workuserList = new ArrayList<WorkSpaceUser>();
		WorkSpaceUser workspaceuser = new WorkSpaceUser();
		workspaceuser.setUrl(url);
		workuserList = workspaceservice.getWorkSpaceUser(workspaceuser);

		List<WorkSpaceUser> reworkuserList = new ArrayList<WorkSpaceUser>();

		for (WorkSpaceUser work : workuserList) {
			reworkuserList.add(work);
			for (ChatUser chat : userList) {
				if (work.getU_idx() == chat.getU_idx()) {
					reworkuserList.remove(work);
				}
			}
		}

		List<Object> re = new ArrayList<Object>();
		re.add(userList);
		re.add(reworkuserList);

		return re;
	}

	// Client??? send??? ??? ?????? ??????
	// stompConfig?????? ????????? applicationDestinationPrefixes??? @MessageMapping ????????? ?????????
	// /pub/chat/message
	// ?????? ??????
	@MessageMapping("/chat/message")
	public void message(Chat chat) {

		chatservice.sendChat(chat);

		template.convertAndSend("/sub/chat/room/" + chat.getR_idx(), chat);
	}
	
	@RequestMapping(value = "/api/chat/chatList", method = RequestMethod.GET)
	public List<Object> getChatList(@RequestParam(value="url") String url, @RequestParam(value="r_idx") int r_idx){
		
		//?????? ??????
		Chat chat = new Chat();
		chat.setUrl(url);
		chat.setR_idx(r_idx);
		List<Chat> chatLsit = chatservice.getChat(chat);
		
		//????????? ??????
		ChatRoom chatroom = new ChatRoom();
		chatroom.setUrl(url);
		chatroom.setR_idx(r_idx);
		ChatRoom room = chatroomservice.selectRoom(chatroom);
		
		List<Object> result = new ArrayList<Object>();
		result.add(chatLsit);
		result.add(room);
		
		return result;
	}

}

package kr.or.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.WorkSpaceService;
import kr.or.vo.Board;
import kr.or.vo.Kanban;
import kr.or.vo.Member;
import kr.or.vo.MemberAll;
import kr.or.vo.WorkSpace;
import kr.or.vo.WorkSpaceUser;

@RestController
@RequestMapping("/api")
public class WorkSpaceController {

	private WorkSpaceService workspaceservice;
	
	private List<MemberAll> members;
	

	@Autowired
	public void setWorkspaceservice(WorkSpaceService workspaceservice) {
		this.workspaceservice = workspaceservice;
	}

	@Autowired
	private JavaMailSender mailSender;

	// 워크스페이스 생성
	@RequestMapping(value = "/makeWorkSpace", method = RequestMethod.POST)
	public int makeWorkSpace(@RequestBody WorkSpace workspace) {

		int result = workspaceservice.makeWorkSpace(workspace);

		return result;
	}

	// 워크스페이스 중복 조회
	@RequestMapping(value = "/isDomain", method = RequestMethod.POST)
	public int isDomain(@RequestBody WorkSpace workspace) {

		int result = workspaceservice.isDomain(workspace.getUrl());

		return result;
	}
	
	// 워크 스페이스 삭제
	@RequestMapping(value = "/DeleteWorkSpace", method = RequestMethod.POST)
		public int deleteWorkSpace(@RequestBody WorkSpace workspace) {
			System.out.println("워크스페이스 삭제");
					
			System.out.println(workspace.getUrl());
			int result = workspaceservice.DeleteWorkSpace(workspace.getUrl());
					
			return result;
		}


	// 해당 유저가 소속된 워크스페이스 전체 조회
//	@RequestMapping(value = "/getWorkSpace", method = RequestMethod.POST)
//	public List<WorkSpace> getWorkSpace(@RequestBody Member member) {
//
//		List<WorkSpace> workspacelist = workspaceservice.getWorkSpace(member.getU_idx());
//
//		return workspacelist;
//	}
	
	@RequestMapping(value = "/getWorkSpace", method = RequestMethod.POST)
	public  List<Map<String, Object>> getWorkSpace(@RequestBody Member member) {
		// 결과를 저장할 List
	    List<Map<String, Object>> result = new ArrayList<>();

	    // 유저가 가진 워크스페이스 리스트
	    List<WorkSpace> workspace = workspaceservice.getWorkSpace(member);
	    System.out.println(workspace);

	    for (WorkSpace work : workspace) {
	        // 워크스페이스를 가지는 유저 목록
	        List<MemberAll> team = workspaceservice.getWorkSpaceMember(work.getUrl());

	        // 워크스페이스 정보와 해당 워크스페이스의 멤버 정보를 Map으로 저장
	        Map<String, Object> workSpaceMap = new HashMap<>();
	        workSpaceMap.put("workSpace", work);
	        workSpaceMap.put("team", team);

	        result.add(workSpaceMap);
	    }

	    return result;
	}
	

	// 워크스페이스 안 팀원 확인
	@RequestMapping(value = "/getWorkSpaceUser", method = RequestMethod.GET)
	public List<WorkSpaceUser> getWorkSpaceUser(@RequestParam("url") String url) {

		List<WorkSpaceUser> userList = new ArrayList<WorkSpaceUser>();

		WorkSpaceUser workspaceuser = new WorkSpaceUser();
		workspaceuser.setUrl(url);

		userList = workspaceservice.getWorkSpaceUser(workspaceuser);

		return userList;
	}

	// 해당하는 레포지토리가 연결된 레포지토리인지 확인
	@RequestMapping(value = "/isRepo", method = RequestMethod.GET)
	public int isRepo(@RequestParam String linked_repo) {
		int result = workspaceservice.isRepo(linked_repo);
		return result;
	}

	// 팀원에게 메일 전송하기
	@RequestMapping(value = "/sendEmailMem", method = RequestMethod.GET)
	@ResponseBody
	public void sendEmailMember(@RequestParam(value = "email") String sendemail,
			@RequestParam(value = "admin") String admin, @RequestParam(value = "url") String url) {

		String[] email2 = sendemail.split(",");

		String[] email = new String[email2.length - 1];

		// 메일 본문 템플릿
		String text = "<div class='container' style='color: #9c9c9c;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;'>"
				+ "<div class='container__item container__item--bottom'><h1 align='center'>MoMoCo</h1><p align='center'>"
				+ admin + "으로 부터의 초대입니다.</p><p>" + url + "의 워크스페이스에 참여하세요</p></div><div class='container__item'>"
				+ "<form class='form'><input type='email' class='form__field' placeholder='http://localhost:3000/joinWorkSpace/"
				+ url + "/" + admin
				+ "' readonly style='width: 360px; background: #fff; color: #a3a3a3; font: inherit; box-shadow: 0 6px 10px 0 rgba(0, 0, 0 , .1);border: 0;outline: 0;padding: 22px 18px;' />"
				+ "<a href='http://192.168.0.30:3000/joinWorkSpace/" + url + "/" + admin
				+ "' type='button' class='btn btn--primary btn--inside uppercase' style='text-transform: uppercase; display: inline-block; background: transparent; color: white; font: inherit; border: 0; outline: 0; padding: 0; transition: all 200ms ease-in; cursor: pointer; background: #7f8ff4; box-shadow: 0 0 10px 2px rgba(0, 0, 0, .1); border-radius: 2px; padding: 12px 36px; margin-left: -96px;'>Go!</a>"
				+ "</form></div></div>";

		MimeMessage message = mailSender.createMimeMessage(); // MimeMessage객체를 이용해 메시지 구성한 뒤 메일 발송

		System.out.println(sendemail);

		for (int i = 1; i < email2.length; i++) {
			email[i - 1] = email2[i];
		}

		try {
			// MimeMessag를 이용해서 파일첨부가 가능하지만 복잡하고 힘들기에 MimeMessageHelper 도움받아 파일 첨부
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");// true는 멀티파트 메세지를 사용하겠다는 의미

			helper.setFrom("park71405@naver.com"); // 보내는 사람 이메일

			helper.setTo(email); // 수신자 이메일
			helper.setSubject("MoMoCo :: 워크스페이스 초대 메일"); // 제목
			helper.setText(text, true); // 내용. true는 html을 사용하겠다는 의미

			mailSender.send(message);
			System.out.println("메일 보내기 성공");
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}

	// 워크스페이스의 정보 불러오기
	@RequestMapping(value = "/getworkspacebyurl", method = RequestMethod.GET)
	public WorkSpace getWorkSpaceByUrl(@RequestParam(value = "url") String url) {

		System.out.println("haha");

		WorkSpace workspace = workspaceservice.getWorkSpaceByUrl(url);

		return workspace;
	}

	// 워크스페이스의 정보 불러오기
	@RequestMapping(value = "/workspaceowner", method = RequestMethod.GET)
	public WorkSpace getWorkSpaceOwner(@RequestParam(value = "url") String url) {

		System.out.println("haha");

		WorkSpace workspace = workspaceservice.getWorkSpaceOwner(url);

		return workspace;
	}
	
	// 워크스페이스 오너 체크
	@RequestMapping(value = "/checkOwner", method = RequestMethod.POST)
	public List<WorkSpaceUser> CheckOwner(@RequestBody WorkSpaceUser workspaceuser) {

		
		List<WorkSpaceUser> list = new ArrayList<WorkSpaceUser>();
		list = workspaceservice.checkOwner(workspaceuser);

		return list;
	}
	
	

}

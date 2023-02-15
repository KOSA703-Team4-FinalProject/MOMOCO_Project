package kr.or.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.DocService;
import kr.or.vo.Doc;

@RestController
@RequestMapping("/doc")
public class DocController {
	
	private DocService docservice;
	
	@Autowired
	public void setDocService(DocService docservice) {
		this.docservice = docservice;
	}
	
	//전체 일정 조회
	@RequestMapping(value="/list", method=RequestMethod.POST)
	public List<Doc> getDoc(@RequestBody Doc url) {
		
		System.out.println("doc 전체일정조회");
		List<Doc> doc = new ArrayList<Doc>();
	
		doc = docservice.getDoc(url.getUrl());
		System.out.println(doc);
		return doc;
	}
	/*
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public int addDoc(@RequestBody Doc doc, @RequestPart("file") MultipartFile file) {
		
		System.out.println("doc 글입력");
		int result = docservice.addDoc(doc, file);
		System.out.println(result);
		return result;
	}
	
	@RequestMapping("/download")
	public void downDoc(String url, String p , String f , HttpServletRequest request , HttpServletResponse response) throws IOException {
		  docservice.downDoc(url, p, f, request, response);
	}
	
 */
 
 	/*
	 * //일정 확인
	 * 
	 * @RequestMapping(value="/read", method=RequestMethod.POST) public CalendarAll
	 * getCalendarByTitle(@RequestBody CalendarAll cal) {
	 * 
	 * CalendarAll calendar = new CalendarAll();
	 * 
	 * calendar = calendarservice.readCalendar(cal);
	 * 
	 * 
	 * return calendar; }
	 */
	
}

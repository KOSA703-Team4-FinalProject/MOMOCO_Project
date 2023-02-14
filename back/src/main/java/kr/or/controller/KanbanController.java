package kr.or.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.KanbanService;
import kr.or.vo.Kanban;

@RestController
@RequestMapping("/api/kanban")
public class KanbanController {

	private KanbanService kanbanserivce;

	@Autowired
	public void setKanbanService(KanbanService kanbanservice) {
		this.kanbanserivce = kanbanservice;
	}

	// 칸반 전체 조회
	@RequestMapping(value = "/getKanban", method = RequestMethod.POST)
	public ArrayList< ArrayList<Object>> getKanban(@RequestBody Kanban url) {

		List<Kanban> kanban = new ArrayList<Kanban>();

		kanban = kanbanserivce.getKanban(url.getUrl());

		HashMap<String, ArrayList<Object>> myMap = new HashMap<String, ArrayList<Object>>();

		ArrayList<String> conArr = new ArrayList<String>();

		for (Kanban k : kanban) {
			if (myMap.containsKey(k.getS_name())) { // 맵에 해당하는 키가 이미 존재하는 경우

				ArrayList<Object> arr = new ArrayList<Object>();
				arr = myMap.get(k.getS_name()); // 이미 존재하는 배열을 가지고 와
				arr.add(k); // 배열에 새 칸반을 추가하고
				myMap.remove(k.getS_name()); // 기존 해시맵에 있는 컬럼을 지운 다음
				myMap.put(k.getS_name(), arr); // 해시맵에 추가

			} else { // 맵에 해당하는 키가 이미 존재하지 않는 경우
				conArr.add(k.getS_name());
				ArrayList<Object> arr = new ArrayList<Object>(); // 새로운 배열을 만들어
				arr.add(k); // 칸반 내용을 넣고
				myMap.put(k.getS_name(), arr); // 해시맵에 추가
			}
		}
		
		ArrayList< ArrayList<Object>> newArr = new ArrayList< ArrayList<Object>>();
		for(String str : conArr) {
			newArr.add(myMap.get(str));
		}

		return newArr;
	}

	// 칸반 전체 조회
	@RequestMapping(value = "/get", method = RequestMethod.POST)
	public List<Kanban> getKanbans(@RequestBody Kanban url) {

		List<Kanban> kanban = new ArrayList<Kanban>();

		kanban = kanbanserivce.getKanban(url.getUrl());

		return kanban;
	}

	// 칸반 아이템 추가
	@RequestMapping(value = "/addKanban", method = RequestMethod.POST)
	public int addCalendar(@RequestBody Kanban kanban) {
		System.out.println("칸반 컨트롤러");
		int result = kanbanserivce.addKanban(kanban);
		System.out.println("kanban : " + kanban);
		return result;
	}

}

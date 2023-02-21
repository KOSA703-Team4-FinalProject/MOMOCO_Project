package kr.or.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.or.service.KanbanService;
import kr.or.service.StatusService;
import kr.or.vo.Board;
import kr.or.vo.CommonBoard;
import kr.or.vo.Kanban;
import kr.or.vo.Status;

@RestController
@RequestMapping("/api/kanban")
public class KanbanController {

	private KanbanService kanbanserivce;

	@Autowired
	public void setKanbanService(KanbanService kanbanservice) {
		this.kanbanserivce = kanbanservice;
	}
	
	private StatusService statusService;

	@Autowired
	public void setWorkspaceservice(StatusService statusService) {
		this.statusService = statusService;
	}

	// 칸반 전체 조회
	@RequestMapping(value = "/getKanban", method = RequestMethod.POST)
	public ArrayList< ArrayList<Object>> getKanban(@RequestBody Kanban url) {

		List<Kanban> kanban = new ArrayList<Kanban>();

		//칸반 전체 조회
		kanban = kanbanserivce.getKanban(url.getUrl());
		
		HashMap<String, ArrayList<Object>> myMap = new HashMap<String, ArrayList<Object>>();

		HashMap<Integer, String> conArr = new HashMap<Integer, String>();

		for (Kanban k : kanban) {
			if (myMap.containsKey(k.getS_name())) { // 맵에 해당하는 키가 이미 존재하는 경우

				ArrayList<Object> arr = new ArrayList<Object>();
				arr = myMap.get(k.getS_name()); // 이미 존재하는 배열을 가지고 와
				arr.add(k); // 배열에 새 칸반을 추가하고
				myMap.remove(k.getS_name()); // 기존 해시맵에 있는 컬럼을 지운 다음
				myMap.put(k.getS_name(), arr); // 해시맵에 추가

			} else { // 맵에 해당하는 키가 이미 존재하지 않는 경우
				conArr.put(k.getS_idx(), k.getS_name());
				ArrayList<Object> arr = new ArrayList<Object>(); // 새로운 배열을 만들어
				arr.add(k); // 칸반 내용을 넣고
				myMap.put(k.getS_name(), arr); // 해시맵에 추가
			}
		}
		
		List<Status> statusList = new ArrayList<Status>();
		statusList = statusService.getStatus(url.getUrl());
		
		ArrayList< ArrayList<Object>> newArr = new ArrayList< ArrayList<Object>>();
				
		for(int i=0; i<statusList.size(); i++) {
			
			int s_idx = statusList.get(i).getS_idx();
			String s_name = statusList.get(i).getS_name();
			
			if(conArr.get(s_idx) != null) {
				newArr.add(myMap.get(s_name));
			}else {
				ArrayList<Object> temp = new ArrayList<Object>();
				newArr.add(temp);
			}
		}

		return newArr;
	}

	   // 상태값으로 캘린더, 칸반 아이템 리스트 불러오기
	   @RequestMapping(value = "/get", method = RequestMethod.POST)
	   public List<Board> getItemByStatus(@RequestParam(value="url") String url, @RequestParam(value="s_idx") int s_idx) {
	     
		   System.out.println("아이템 리스트");
		   System.out.println(url);
		   System.out.println(s_idx);
		   List<Board> list = new ArrayList<Board>();
	      list = kanbanserivce.getItembyStatus(url, s_idx);

	      return list;
	   }

	// 칸반 아이템 추가
	@RequestMapping(value = "/addKanban", method = RequestMethod.POST)
	public int addKanban(@RequestBody Kanban kanban) {
		
		int result = kanbanserivce.addKanban(kanban);
		
		return result;
	}
	
	
	// 칸반 컬럼 추가
	@RequestMapping(value = "/addKanbanColumn", method = RequestMethod.POST)
	public int addKanbanColumn(@RequestBody Kanban kanban) {
		
		
		int result = kanbanserivce.addKanbanColumn(kanban);
		
		
		
		return result;
	}
	
	// 아이템 위치 변경 임시
	@RequestMapping(value="/updateLocationKanban", method=RequestMethod.PUT)
	public String updateLocation(@RequestBody Kanban kanban) {
		String str = "";
		System.out.println("이거 변경되는거 맞냐..");
		int result = kanbanserivce.updateLocation(kanban);
		
		if(result > 0) {
			str = "success";
		}else {
			str = "false";
		}
		
		return str;
	}
	
	

	
	// 칸반 컬럼의 모든 아이템 삭제 
		@RequestMapping(value="/deleteAllKanbanItem", method=RequestMethod.POST)
		public int deleteKanbanitem(@RequestBody Kanban kanban) {
			System.out.println("칸반 아이템 삭제 컨트롤러");
			int result = kanbanserivce.deleteAllKanbanItem(kanban);
			
			return result;
		}
		
    // 칸반 컬럼 삭제
		@RequestMapping(value = "/deleteKanbanColumn", method = RequestMethod.POST)
		public int deleteKanbancolumn(@RequestBody Kanban kanban) {
			
			int result = kanbanserivce.deleteKanbanColumn(kanban);
			
			return result;
		}
		
   // 칸반 컬럼이름 수정		updateKanbanColumnName
		@RequestMapping(value="/modifyKanbanColumnName", method=RequestMethod.POST)
		public int modifykanbanColumnName(@RequestBody Kanban kanban) {
			
			int result = kanbanserivce.modifyKanbanColumnName(kanban);
			
			return result;
		}
		
		
  // 칸반 아이템 상세보기  GetKanbanItemDetail
		@RequestMapping(value="/GetKanbanItemDetail",method =RequestMethod.POST)
		public Kanban getBoardByIdx(@RequestBody Kanban kanban) {
			
			Kanban kanbandetail = new Kanban();
			
			kanbandetail = kanbanserivce.GetKanbanItemDetail(kanban);
			
			
			return  kanbandetail;
			
		}

		
	
	

}

package kr.or.vo;

import lombok.Data;

@Data
public class Workspace {

	private String url; //워크 스페이스 주소
	private String space_name; //워크 스페이스 이름
	private String startDate;	//워크 스페이스 시작일
	private String endDate; 	//워크 스페이스 종료일
	private String linked_repo; //연동된 레포지토리 주소
	private String del_date;	//워크 스페이스 삭제일
	private String admin; 		//워크 스페이스 관리자
	
}

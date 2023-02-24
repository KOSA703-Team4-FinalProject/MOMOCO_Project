package kr.or.vo;

import lombok.Data;

@Data
public class WorkSpace {

	private String url; // 워크 스페이스 주소
	private String space_name; // 워크 스페이스 이름
	private String linked_repo; // 연동된 레포지토리 주소
	private String start_date; // 워크 스페이스 시작일
	private String end_date; // 워크 스페이스 종료일
	private String del_date; // 워크 스페이스 삭제일
	private int admin; // 워크 스페이스 관리자

	private String owner; // 워크스페이스 소유자
	private String ownerphoto; // 워크스페이스 프로필 사진

}

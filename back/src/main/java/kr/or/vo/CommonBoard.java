package kr.or.vo;

import lombok.Data;

@Data
public class CommonBoard extends Board {

	private String ori_filename;  //원래 파일이름
	private String save_filename; //변경된 파일이름
	private long volume;    		  //용량
	private String filetype;      //파일타입
	private int ref;			//ref
	private int depth;			//depth
	private int step;			//step	
	private String thumb;		//썸네일
	private int b_idx;			//글번호

	private String nickname;	//닉네임 (login)
	private String profilephoto;	//프로필 사진(avatar_url)
	private int u_idx;			//깃헙 키 (id)
	private int u_idx1;         //읽은유저 체크를 위한
	//검색 필터
	private String type;//검색 타입
	private String keyword;//검색 내용
	
	private String u_idxList;      //메일 전달할 유저 식별키 리스트
	
	
	
}

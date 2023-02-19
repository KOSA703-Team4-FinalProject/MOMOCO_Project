package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.vo.Board;
import kr.or.vo.Doc;

public interface DocDao {
	
	//문서저장소 전체 조회
	public List<Doc> getDoc(String url) throws ClassNotFoundException, SQLException;
	
	//문서저장소 글쓰기
	public int addDoc(Doc doc) throws ClassNotFoundException, SQLException;
	
	//문서저장소 링크 글쓰기
	public int addDocLink(Doc doc) throws ClassNotFoundException, SQLException;
}

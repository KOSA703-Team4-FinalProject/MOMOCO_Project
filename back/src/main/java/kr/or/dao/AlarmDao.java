package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Alarm;

public interface AlarmDao {

	//알림 DB 생성
	public int addAlarm(Alarm alarm) throws ClassNotFoundException, SQLException;
	
	//알림 내용 불러오기
	public List<Alarm> getAlarmList(int u_idx) throws ClassNotFoundException, SQLException;
	
	//알림 체크하기 기능
	public int checkAlarm(Alarm alarm) throws ClassNotFoundException, SQLException;
	
	//워크스페이스 유저리스트 불러오기
	public List<Alarm> u_idxList(String url) throws ClassNotFoundException, SQLException;
	
}

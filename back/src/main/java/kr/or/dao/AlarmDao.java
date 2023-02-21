package kr.or.dao;

import java.sql.SQLException;
import java.util.List;

import kr.or.vo.Alarm;

public interface AlarmDao {

	//알림 내용 불러오기
	public List<Alarm> getAlarmList(Alarm alarm) throws ClassNotFoundException, SQLException;
	
}

package kr.or.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.vo.Alarm;

@Service
public class AlarmService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession =sqlsession;
		
	}
	
	//알림 불러오기
	public List<Alarm> getAlarmList(Alarm alarm) {
		
		List<Alarm> alarmList = new ArrayList<Alarm>();
		
		
		return alarmList;
	}

}

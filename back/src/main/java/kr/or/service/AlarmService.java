package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.dao.AlarmDao;
import kr.or.dao.CommonBoardDao;
import kr.or.dao.KanbanDao;
import kr.or.vo.Alarm;
import kr.or.vo.CommonBoard;
import kr.or.vo.Kanban;

@Service
public class AlarmService {
	
	private SqlSession sqlsession;
	
	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession =sqlsession;
		
	}
	
	//알림 DB 생성
	public int addAlarm(Alarm alarm) {
		
		int result = 0;
		System.out.println("addalarm1");
		try {
			System.out.println("addalarm2");
			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			result = alarmdao.addAlarm(alarm);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		
		return result;
	}
	
	//알림 불러오기
	public List<Alarm> getAlarmList(int u_idx) {
		
		List<Alarm> alarmList = new ArrayList<Alarm>();
		
		try {

			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			alarmList = alarmdao.getAlarmList(u_idx);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		
		return alarmList;
	}
	
	
	// 알람 모든 아이템 삭제
	public int deleteAll(int u_idx) {
		int result = 0;

		try {

			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			result = alarmdao.deleteAll(u_idx);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	// 알람 삭제
	public int delete(int a_idx) {
		int result = 0;

		try {
			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			result = alarmdao.delete(a_idx);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	// 알람 체크
	public int checkAlarm(int a_idx) {
		int result = 0;

		try {
			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			result = alarmdao.checkAlarm(a_idx);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	// 알람 체크
	public int checkAllAlarm(int u_idx) {
		int result = 0;

		try {
			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			result = alarmdao.checkAllAlarm(u_idx);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
	
	//알림보낼 사람 선택하기
	public List<Alarm> u_idxList(String url){
		List<Alarm> alarm = new ArrayList<Alarm>();
		try {
			AlarmDao alarmdao = sqlsession.getMapper(AlarmDao.class);
			alarm = alarmdao.u_idxList(url);
			
			}catch (ClassNotFoundException e) {
			e.printStackTrace();
			}catch (SQLException e) {
			e.printStackTrace();
			}
		return alarm;
	}

}

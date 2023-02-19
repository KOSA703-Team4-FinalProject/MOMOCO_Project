package kr.or.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.dao.BoardDao;
import kr.or.dao.BoardStatusDao;
import kr.or.dao.CalendarDao;
import kr.or.dao.CheckedDao;
import kr.or.vo.Board;
import kr.or.vo.BoardStatus;
import kr.or.vo.Calendar;
import kr.or.vo.Checked;

@Service
public class CalendarService {

	private SqlSession sqlsession;

	@Autowired
	public void setSqlsession(SqlSession sqlsession) {
		this.sqlsession = sqlsession;
	}

	// 일정 전체 확인
	public List<Calendar> getCalendar(String url) {

		List<Calendar> calendar = new ArrayList<Calendar>();

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			calendar = calendardao.getCalendar(url);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return calendar;
	}

	// 일정 추가
	public int addCalendar(Calendar all) {

		int result = 0;

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			result = calendardao.addCalendar(all);

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	// 일정 읽기
	@Transactional
	public Calendar readCalendar(Calendar all) {
		Calendar cal = new Calendar();

		try {

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			cal = calendardao.getCalendarByTitle(all);
			
			//해당 글의 체크리스트 확인
			Checked check = new Checked();
			check.setIdx(cal.getIdx());
			check.setUrl(all.getUrl());
			
			List<Checked> checkList = new ArrayList<Checked>();
			
			CheckedDao checkdao = sqlsession.getMapper(CheckedDao.class);
			checkList = checkdao.getCheckedByIdx(check);
			
			cal.setChecked(checkList);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return cal;
	}
	
	//일정 수정
	@Transactional
	public int modifyCalendar(Calendar cal) {
		int result = 0;
		
		try {
			
			Board board = new Board();
			board.setIdx(cal.getIdx());
			board.setNickname(cal.getNickname());
			board.setTitle(cal.getTitle());
			board.setContent(cal.getContent());
			board.setB_code(cal.getB_code());
			board.setLabel(cal.getLabel());
			board.setU_idx(cal.getU_idx());
			board.setUrl(cal.getUrl());
			
			System.out.println(board.toString());
			
			BoardDao boarddao = sqlsession.getMapper(BoardDao.class);
			//result = boarddao.modifyBoard(board);
			
			BoardStatus boardstatus = new BoardStatus();
			boardstatus.setUrl(cal.getUrl());
			boardstatus.setIdx(cal.getIdx());
			boardstatus.setS_idx(cal.getS_idx());
			
			BoardStatusDao boardstatusdao = sqlsession.getMapper(BoardStatusDao.class);
			result = boardstatusdao.modifyBoardStatus(boardstatus);

			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			result = calendardao.updateCalendar(cal);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	//일정 삭제
	public int deleteCalendar(Calendar cal) {
		int result = 0;
		
		try {
			
			CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
			result = calendardao.deleteCalendar(cal);
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

}
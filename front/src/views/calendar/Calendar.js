import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CCollapse,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrap5 from '@fullcalendar/bootstrap5'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import $ from 'jquery'

import { PRIMARY_KEY } from '../../oauth'
import Profile from 'src/components/Profile'

const Calendar = () => {
  let [view, setView] = useState('')
  const [statusList, setStateList] = useState([])
  const [calList, setCalList] = useState({})
  const [readCalList, setReadCalList] = useState({})
  const [start_date, setStart_date] = useState('')
  const [checkList, setCheckList] = useState([])

  const [profileMoal, setProfileModal] = useState(false)
  const [profile, setProfile] = useState({})

  const [u_idxlist, SetU_idxlist] = useState([]) //워크스페이스 유저 id 리스트
  const [alarmList, setAlarmList] = useState('') //알람 보낼 u_idx 리스트

  const params = useParams()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const url = params.url
  const login = JSON.parse(localStorage.getItem('login'))

  //전체 일정 조회
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/cal/get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        idx: 1,
        url: url,
      },
    }).then((res) => {
      const events = []

      res.data.map((response) => {
        const endd = new Date(response.end_date)
        events.push({ title: response.title, start: response.start_date, end: endd })
      })
      setCalList(events)
    })
  }, [view])

  //상태값 불러오기
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/api/status/getStatus',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        s_idx: 2,
        url: url,
      },
    }).then((res) => {
      setStateList(res.data)
    })

    axios({
      method: 'GET',
      url: '/api/alarm/teamlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        url: url,
      },
    }).then((res) => {
      SetU_idxlist([])

      res.data.map((data) => {
        SetU_idxlist((u_idxlist) => [...u_idxlist, data])
      })
    })
  }, [])

  //전체 일정 추가
  const addCal = () => {

    const reqData = {
      start_date: $('#calstart_date').val(),
      end_date: $('#calend_date').val(),
      s_idx: $('#addSelect option:selected').val(),
      nickname: login.nickname,
      title: $('#caltitle').val(),
      content: $('#calcontent').val(),
      b_code: 4,
      label: '.',
      u_idx: login.u_idx,
      url: url,
      u_idxList: alarmList,
    }

    axios({
      method: 'POST',
      url: '/cal/add',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      view == '' ? setView('add') : setView('')
    })
  }

  //일정 읽기
  const readCal = (e) => {
    const clicktitle = e.event._def.title

    const reqData = {
      title: clicktitle,
      url: url,
    }

    axios({
      method: 'POST',
      url: '/cal/read',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      setCheckList(res.data.checked)
      setReadCalList(res.data)
    })
  }

  //일정 수정
  const modifyCal = () => {
    const reqData1 = {
      idx: readCalList.idx,
      start_date: $('#modifystart_date').val(),
      end_date: $('#modifyend_date').val(),
      s_idx: $('#updateSelect option:selected').val(),
      nickname: login.nickname,
      title: $('#modifytitle').val(),
      content: $('#modifycontent').val(),
      b_code: 4,
      label: '.',
      u_idx: login.u_idx,
      url: url,
    }

    axios({
      method: 'POST',
      url: '/cal/modify',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData1,
    }).then((res) => {
      setView('')
    })
  }

  //일정 삭제
  const deleteCal = () => {
    const reqData = {
      idx: readCalList.idx,
      url: url,
    }

    axios({
      method: 'POST',
      url: '/cal/delete',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      setView('')
    })
  }

  //일정 참석하기
  const addCheck = () => {
    const reqData2 = {
      idx: readCalList.idx,
      u_idx: login.u_idx,
      nickname: login.nickname,
      url: url,
    }

    axios({
      method: 'POST',
      url: '/api/check/add',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData2,
    }).then((res) => {
      console.log(res)
      setView('')
    })
  }

  //알림 전송할 u_idx List 생성
  const checkAList = (e) => {

    const result = e.target.checked
    const u_idx = e.target.value

    if(result == true){

      setAlarmList(alarmList+","+u_idx)

    }else{
     const str = alarmList.split(',')
      setAlarmList([])

      str.map((res)=>{
        if(res != u_idx){
          setAlarmList(alarmList+","+u_idx)
        }
      })
    }
  }

  //프로필 조회
  const clickProfile = (e) => {

    const pro = e.target
    const idx = $(pro).attr('value')

    axios({
      method: 'GET',
      url: '/backlogin/getmember',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {u_idx: idx}
    }).then((res) => {
      console.log(res.data)

      setProfile(res.data)
      setProfileModal(true)
    })

  }

  function Component() {
    switch (view) {
      case 'add':
        return (
          <CCol className={'add mt-10 col-md-6 park-card p-3 '}>
            <CCard>
              <CCardBody>
                <CCol className="h4">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <strong className="ms-2 mt-2">일정 추가</strong>
                  </div>
                </CCol>
                <CCol className="mt-3">
                  <CRow className="g-3 mt-2">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        id="caltitle"
                        floatingLabel="일정"
                        defaultValue="일정을 추가해주세요"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        id="calstart_date"
                        floatingLabel="시작일"
                        defaultValue={start_date}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        id="calend_date"
                        floatingLabel="종료일"
                        defaultValue={start_date}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormSelect id="addSelect">
                        {statusList.map((sta) => (
                          <option value={sta.s_idx} key={sta.s_idx}>
                            {sta.s_name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CFormTextarea
                        type="text"
                        id="calcontent"
                        floatingLabel="상세 일정"
                        placeholder="상세 일정"
                        style={{ height: '100px' }}
                      ></CFormTextarea>
                    </CCol>
                    <CCol md={12}>
                      <CRow>
                        <div className="col-sm-12 col-form-label ms-2">
                          <strong>알림</strong>
                        </div>
                        <CCol md={12} className="mx-3">
                          <CRow className='me-2'>
                            {u_idxlist.map((data) => {
                              return (
                                <CCol md={4} className='mb-3' key={data.u_idx}>
                                  <CFormCheck inline 
                                  onChange={checkAList}
                                  className="inlineCheckbox2" value={data.u_idx} />
                                  <CAvatar
                                    className="ms-2"
                                    src={data.profilephoto}
                                  />{' '}
                                  {data.nickname}
                                </CCol>
                              )
                            })}
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="text-center">
                      <CButton
                        color="primary"
                        variant="outline"
                        className="add_btn m-2"
                        onClick={() => {
                          addCal()
                        }}
                      >
                        확인
                      </CButton>
                      <CButton
                        color="primary"
                        variant="outline"
                        className="add_reset m-2"
                        onClick={() => {
                          view == '' ? setView('add') : setView('')
                        }}
                      >
                        취소
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        )
      case 'read':
        return (
          <CCol className={'read mt-10 col-md-6 park-card p-3 '}>
            <CCard>
              <CCardBody>
                <CCol className="h4">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <strong className="ms-2 mt-2">{readCalList.title}</strong>
                  </div>
                </CCol>
                <CCol className="mt-3">
                  <CRow className="g-3 mt-2 mx-3">
                    <CCol md={12}>
                      <h5 className="titlediv">
                        <strong>{readCalList.nickname}</strong>
                      </h5>
                    </CCol>
                    <CCol md={12}>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <strong>시작일</strong>
                        </label>
                        <div className="col-sm-10">{readCalList.start_date}</div>
                      </div>
                    </CCol>
                    <CCol md={12}>
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          <strong>종료일</strong>
                        </label>
                        <div className="col-sm-10">{readCalList.end_date}</div>
                      </div>
                    </CCol>
                    <div className="col-md-12">
                      <CCard>
                        <CCardBody>
                          <p className="readcalcontent" style={contentS}>
                            {readCalList.content}
                          </p>
                        </CCardBody>
                      </CCard>
                    </div>
                    <div className="row mt-5">
                      <div className="col-md-4">
                        <CFormCheck
                          button={{ color: 'primary', variant: 'outline' }}
                          id="gridCheck2"
                          autoComplete="off"
                          label="참석하기"
                          onClick={addCheck}
                        />
                      </div>
                      <div className="col-md-8 mt-1" align="right">
                        <strong>참석 : </strong>
                        {checkList.map((data) => (
                          <CAvatar
                            color="primary"
                            textColor="white"
                            shape="rounded"
                            key={data.u_idx}
                            value={data.u_idx}
                            onClick={clickProfile}
                          >
                            {data.nickname}..
                          </CAvatar>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      {readCalList.u_idx == login.u_idx ? (
                        <>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="modifybtn m-1"
                            onClick={() => {
                              setView('modify')
                            }}
                          >
                            수정
                          </CButton>
                          <CButton
                            color="primary"
                            variant="outline"
                            className="deletebtn m-1"
                            onClick={deleteCal}
                          >
                            삭제
                          </CButton>
                        </>
                      ) : (
                        <></>
                      )}
                      <CButton
                        color="primary"
                        variant="outline"
                        className="read_reset m-1"
                        onClick={() => {
                          setView('')
                        }}
                      >
                        닫기
                      </CButton>
                    </div>
                  </CRow>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        )
      case 'modify':
        return (
          <CCol className={'modify mt-10 col-md-6 park-card p-3 '}>
            <CCard>
              <CCardBody>
                <CCol className="h4">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                    <strong className="ms-2 mt-2">일정 수정</strong>
                  </div>
                </CCol>
                <CCol className="mt-3">
                  <CRow className="g-3 mt-2">
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        id="modifytitle"
                        floatingLabel="일정"
                        defaultValue={readCalList.title}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        id="modifystart_date"
                        floatingLabel="시작일"
                        value={readCalList.start_date}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        id="modifyend_date"
                        floatingLabel="종료일"
                        value={readCalList.end_date}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormSelect id="updateSelect">
                        {statusList.map((sta) => (
                          <option value={sta.s_idx} key={sta.s_idx}>
                            {sta.s_name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CFormTextarea
                        type="text"
                        id="modifycontent"
                        floatingLabel="상세 일정"
                        placeholder="상세 일정"
                        style={{ height: '200px' }}
                        defaultValue={readCalList.content}
                      ></CFormTextarea>
                    </CCol>
                    <CCol className="text-center">
                      <CButton
                        color="primary"
                        variant="outline"
                        className="modify_btn m-2"
                        onClick={modifyCal}
                      >
                        확인
                      </CButton>
                      <CButton
                        color="primary"
                        variant="outline"
                        className="modify_reset m-2"
                        onClick={() => {
                          setView('')
                        }}
                      >
                        취소
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        )
      default:
        return <></>
    }
  }

  const contentS = {
    minHeight: '150px',
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {/* 캘린더 API로 캘린더 그려질 곳 */}
            <CCol className="calendar">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                themeSystem={bootstrap5}
                initialView="dayGridMonth"
                headerToolbar={{
                  //캘린더 상단
                  start: 'today parkCustomButton',
                  center: 'title',
                  end: 'prev,next dayGridMonth,dayGridWeek,dayGridDay',
                }}
                customButtons={{
                  //커스텀 버튼 생성
                  parkCustomButton: {
                    text: '추가',
                    click: function () {
                      //일정 추가
                      {
                        view == '' ? setView('add') : setView('')
                      }
                    },
                  },
                }}
                titleFormat={function (date) {
                  return date.date.year + '년 ' + (parseInt(date.date.month) + 1) + '월'
                }}
                // 날짜 클릭 시 발생하는 이벤트
                dateClick={(e) => {
                  setStart_date(e.dateStr)
                  view == '' ? setView('add') : setView('')
                }}
                nowIndicator="true" // 현재 시간 마크
                locale="ko" //한국어 설정
                dayMaxEventRows="true" //day 그리드에서 지정 일 내 쌓인 최대 일정 수(이벤트 수가 주간 셀의 높이로 제한)
                displayEventEnd="true"
                events={calList} //일정 넣는 부분
                eventClick={(e) => {
                  view == '' ? setView('read') : setView('')
                  readCal(e)
                }} //일정 클릭시 발생하는 이벤트
              />
            </CCol>
            {/* 일정 추가 시작 */}
            {Component()}
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
        <CModal alignment="center" visible={profileMoal} onClose={() => setProfileModal(false)}>
          <CModalHeader onClose={() => setProfileModal(false)}></CModalHeader>
          <CModalBody>
            <Profile user={profile} />
          </CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default Calendar

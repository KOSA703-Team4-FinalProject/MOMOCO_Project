import { CAvatar, CButton, CCard, CCardBody, CCardFooter, CCol, CCollapse, CFormCheck, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import bootstrap5 from "@fullcalendar/bootstrap5"
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'
import { useState } from 'react'

const Calendar = () => {

  let [addView, setAddView] = useState('d-none');
  let [modifyView, setModifyView] = useState('d-none');
  let [readView, setReadView] = useState('d-none');
  let [attend, setAttend] = useState(false);

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {/* 캘린더 API로 캘린더 그려질 곳 */}
            <CCol className="calendar">
              <FullCalendar 
                defaultView="dayGridMonth" 
                plugins={[dayGridPlugin, interactionPlugin ]} 
                themeSystem={bootstrap5}
                headerToolbar={{ //캘린더 상단 
                  start: 'today parkCustomButton',
							    center: 'title',
							    end: 'prev,next dayGridMonth,dayGridWeek,dayGridDay'
                }}
                customButtons={{ //커스텀 버튼 생성
                  parkCustomButton: {
                    text: '추가',
                    click: function() {	//일정 추가
                      {addView == '' ? setAddView('d-none') : setAddView('')}
                    }
                  }
                }}
                titleFormat={function(date){
                  return date.date.year + '년 ' + (parseInt(date.date.month) + 1) + '월';
                }}
                // 날짜 클릭 시 발생하는 이벤트
                dateClick={()=>{
                  console.log("haha");
                  //추후 일정 추가하는 함수 넣을거임
                }}
                nowIndicator='true' // 현재 시간 마크
                locale='ko' //한국어 설정
                dayMaxEventRows='true' //day 그리드에서 지정 일 내 쌓인 최대 일정 수(이벤트 수가 주간 셀의 높이로 제한)
               
                //events={} 일정 넣는 부분
                //eventClick={()=>{}} //일정 클릭시 발생하는 이벤트
              />
            </CCol>
            {/* 일정 추가 시작 */}
            <CCol className={'add mt-10 col-md-6 park-card p-3 ' + addView}>
              <CCard>
                <CCardBody>
                    <CCol className="h4">
                      <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                        <strong className='ms-2 mt-2'>일정 추가</strong>
                        <CButton color="primary" variant="outline" className='me-2 mt-2'>KanBan에서 불러오기</CButton>
                      </div>
										</CCol>
                    <CCol className='mt-3'>
                      <CRow className='g-3 mt-2'>
                        <CCol md={12}>
                          <CFormInput
                            type='text'
                            id='caltitle'
                            floatingLabel="일정"
                            defaultValue="일정을 추가해주세요"
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormInput
                            type='date'
                            id='calstart_date'
                            floatingLabel="시작일"
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormInput
                            type='date'
                            id='calend_date'
                            floatingLabel="종료일"
                          />
                        </CCol>
                        <CCol md={12}>
                          <CFormSelect id="addSelect">
                            <option value="1">ToDo</option>
                            <option value="2">In progress</option>
                            <option value="3">Done</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={12}>
                          <CFormTextarea
                            type='text'
                            id='calcontent'
                            floatingLabel="상세 일정"
                            placeholder="상세 일정"
                            style={{ height: '100px' }}
                          ></CFormTextarea>
                        </CCol>
                        <CCol className='text-center'>
                          <CButton color="primary" variant="outline" className='add_btn m-2'>확인</CButton>
                          <CButton color="primary" variant="outline" className='add_reset m-2' onClick={()=>{addView == '' ? setAddView('d-none') : setAddView('')}}>취소</CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            {/* 일정 추가 끝 */}
            {/* 일정 수정 시작 */}
            <CCol className={'modify mt-10 col-md-6 park-card p-3 ' + modifyView}>
              <CCard>
                <CCardBody>
                  <CCol className="h4">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                      <strong className='ms-2 mt-2'>일정 수정</strong>
                    </div>
									</CCol>
                  <CCol className='mt-3'>
                    <CRow className='g-3 mt-2'>
                      <CCol md={12}>
                        <CFormInput
                          type='text'
                          id='modifytitle'
                          floatingLabel="일정"
                          defaultValue="일정을 추가해주세요"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          type='date'
                          id='modifystart_date'
                          floatingLabel="시작일"
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          type='date'
                          id='modifyend_date'
                          floatingLabel="시작일"
                        />
                      </CCol>
                      <CCol md={12}>
                        <CFormSelect id="addSelect" >
                          <option value="1">ToDo</option>
                          <option value="2">In progress</option>
                          <option value="3">Done</option>
                        </CFormSelect>
                      </CCol>
                      <CCol md={12}>
                        <CFormTextarea
                          type='text'
                          id='modifycontent'
                          floatingLabel="상세 일정"
                          placeholder="상세 일정"
                          style={{ height: '100px' }}
                        ></CFormTextarea>
                      </CCol>
                      <CCol className='text-center'>
                        <CButton color="primary" variant="outline" className='modify_btn m-2'>확인</CButton>
                        <CButton color="primary" variant="outline" className='modify_reset m-2' onClick={()=>{modifyView == '' ? setModifyView('d-none') : setModifyView('')}}>취소</CButton>
                      </CCol>
                    </CRow>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            {/* 일정 수정 끝 */}
            {/* 일정 내용 보기 시작 */}
            <CCol className={'read mt-10 col-md-6 park-card p-3 ' + readView}>
              <CCard>
                <CCardBody>
                  <CCol className="h4">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                      <strong className='ms-2 mt-2'>일정</strong>
                    </div>
									</CCol>
                  <CCol className='mt-3'>
                    <CRow className='g-3 mt-2'>
                      <CCol md={12}>
                        <h5 className='titlediv'><strong>일정 title 적힐 곳</strong></h5>
                      </CCol>
                      <CCol md={12}>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label"><strong>시작일</strong></label>
                          <div className='col-sm-10'>
                            <CFormInput type="date" id="read-startdate" readOnly/>
                          </div>
                        </div>
                      </CCol>
                      <CCol md={12}>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label"><strong>종료일</strong></label>
                          <div className='col-sm-10'>
                            <CFormInput type="date" id="read-enddate" readOnly/>
                          </div>
                        </div>
                      </CCol>
                      <div className='col-md-12'>
                        <CCard>
                          <CCardBody>
                            <p className='readcalcontent'>
                              일정 세부 사항 넣을 거얌!!!!!!!!
                              <br>
                              </br>
                              아하하하하하하ㅏㅎ하
                              <br />
                              나는 아무생각이 없엉~~~~~~~
                              <br />
                              아하하하하하하ㅏㅎ하
                              <br />
                              아하하하하하하ㅏㅎ하
                              <br />
                              아하하하하하하ㅏㅎ하
                              <br />
                              아하하하하하하ㅏㅎ하
                            </p>
                          </CCardBody>
                        </CCard>
                      </div>
                      <div className='row mt-3'>
                        <div className='col-md-4'>
                          <CFormCheck button={{ color: 'primary', variant: 'outline' }} id="gridCheck2" autoComplete="off" label="참석하기"/>
                        </div>
                        <div className='col-md-8 mt-1' align='right'>
                          <strong>참석 : </strong> 
                          <CAvatar color="secondary" status="success">gkg</CAvatar>
                          <CAvatar color="secondary" status="success">humm</CAvatar>
                          <CAvatar color="secondary" status="danger">hi</CAvatar>
                        </div>
                      </div>
                      <div className='col-md-12 text-center'>
                        <CButton color="primary" variant="outline" className='modifybtn m-1'>수정</CButton>
                        <CButton color="primary" variant="outline" className='deletebtn m-1'>삭제</CButton>
                        <CButton color="primary" variant="outline" className='read_reset m-1' onClick={()=>{setReadView('d-none')}}>닫기</CButton>
                      </div>
                    </CRow>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            {/* 일정 내용 보기 끝 */}
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default Calendar

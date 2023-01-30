import { CButton, CCard, CCardBody, CCardFooter, CCol, CFormInput, CFormSelect, CFormTextarea, CRow } from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import bootstrap5 from "@fullcalendar/bootstrap5"
import CIcon from '@coreui/icons-react'
import { cilClipboard } from '@coreui/icons'

// 일정 추가, 수정, 읽기 페이지 보이게 하기
function View() {
  
}

const Calendar = () => {
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
                      View();
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
            <CCol className='add mt-10 col-md-6 park-card p-3 d-none'>
              <CCard>
                <CCardBody>
                  <CRow className='mt-2'>
                    <CCol className="h4 card-title">
											<strong>일정 추가</strong>
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
                          <CFormSelect id="addSelect" floatingLabel="상태" >
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
                          <CButton color="primary" variant="outline" className='add_reset m-2'>취소</CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default Calendar

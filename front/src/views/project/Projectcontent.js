import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormCheck,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
const boxsize = {
  width: '1250px',
  height: '500px',
}
const box1 = {
  height: '100px',
  align: 'left',
  fontsize: 'h1',
}
const box2 = {
  height: '200px',
  color: 'red',
}
const CARDSTYLE = {
  'overflow-y': 'scroll',
  height: '450px',
}
const Projectcontent = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                <strong>프로젝트 상세보기</strong>
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <CCard style={boxsize}>
            <CCol className="container-fluid">
              <CRow className="row">
                <CCol className="col-md-12">
                  <CCol className="row">
                    <CCol className="col-md-4">
                      <CCard>
                        <CCol align="end">
                          <CButton href="#">팀원추가하기</CButton>
                        </CCol>
                        <CCard style={CARDSTYLE}>
                          <CListGroup flush>
                            <CListGroupItem sm={4}>
                              <CRow>
                                <CCol>
                                  <CFormCheck id="flexCheckDefault" />
                                  <CAvatar
                                    className="ms-3"
                                    src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                                  />{' '}
                                  &nbsp; 닉네임
                                </CCol>
                              </CRow>
                            </CListGroupItem>
                            <CListGroupItem sm={4}>
                              <CRow>
                                <CCol>
                                  <CFormCheck id="flexCheckDefault" />
                                  <CAvatar
                                    className="ms-3"
                                    src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                                  />{' '}
                                  &nbsp; 닉네임
                                </CCol>
                              </CRow>
                            </CListGroupItem>
                          </CListGroup>
                        </CCard>
                      </CCard>
                    </CCol>
                    <CCol className="col-md-8">
                      <CCol className="row">
                        <CCol className="col-md-12 p-4" style={box1}>
                          프로젝트 주소
                        </CCol>
                        <hr></hr>
                      </CCol>
                      <CRow className="row">
                        <CCol className="col-md-12 p-4" style={box1}>
                          레파지토리
                        </CCol>
                        <hr></hr>
                      </CRow>
                      <CRow className="row">
                        <CCol className="col-md-12 p-4" style={box1}>
                          프로젝트 기간
                        </CCol>
                        <hr></hr>
                      </CRow>
                      <CRow className="row">
                        <CCol className="col-md-12 p-5" style={box2}>
                          <CIcon icon={cilInfo} size="xl" /> &nbsp; 주의 만약 GitHub상에서 해당
                          레파지토리를 지울경우, 시스템 이용에 문제가 발생할 수 있습니다.
                        </CCol>
                      </CRow>
                    </CCol>
                  </CCol>
                </CCol>
              </CRow>
            </CCol>
          </CCard>
        </CCardBody>
        <CCardFooter align="end">
          <CButton color="primary" variant="outline">
            삭제
          </CButton>{' '}
          &nbsp;
          <CButton color="danger" variant="outline">
            떠나기
          </CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default Projectcontent

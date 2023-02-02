import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'
import { CForm, CFormTextarea } from '@coreui/react'

const docStorage = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-3">
                문서저장소
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <CAccordion alwaysOpen>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <div className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #12-1
                    </strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>유스케이스</strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>UseCase_명세서2.word</strong>
                  </div>
                  <div className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </div>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea rows={5}>로고이미지 입니다.</CFormTextarea>
                <CRow>
                  <CCol align="end">
                    <CButton className="my-3 mx-1" color="dark" shape="rounded-pill">
                      업데이트
                    </CButton>
                    <CButton className="my-3 mx-1" color="danger" shape="rounded-pill">
                      삭제
                    </CButton>
                  </CCol>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <div className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #18
                    </strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>DB exerd 이미지</strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>DB설계도.jpg</strong>
                  </div>
                  <div className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </div>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea rows={5}>로고이미지 입니다.</CFormTextarea>
                <CRow>
                  <CCol align="end">
                    <CButton className="my-3 mx-1" color="dark" shape="rounded-pill">
                      업데이트
                    </CButton>
                    <CButton className="my-3 mx-1" color="danger" shape="rounded-pill">
                      삭제
                    </CButton>
                  </CCol>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={3}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <div className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #24
                    </strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>아이콘 이미지들</strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>파비콘.jpg</strong>
                    <p></p>
                    <strong>로고.png</strong>
                  </div>
                  <div className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </div>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CForm>
                  <CFormTextarea rows={5}>로고이미지 입니다.</CFormTextarea>
                  <CRow>
                    <CCol align="end">
                      <CButton className="my-3 mx-1" color="dark" shape="rounded-pill">
                        업데이트
                      </CButton>
                      <CButton className="my-3 mx-1" color="danger" shape="rounded-pill">
                        삭제
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={4}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <div className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #28
                    </strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>회의록 구글docs</strong>
                  </div>
                  <div className="col-4 px-2">
                    <strong>구글문서.link</strong>
                  </div>
                  <div className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </div>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea rows={5}>로고이미지 입니다.</CFormTextarea>
                <CRow>
                  <CCol align="end">
                    <CButton className="my-3 mx-1" color="dark" shape="rounded-pill">
                      업데이트
                    </CButton>
                    <CButton className="my-3 mx-1" color="danger" shape="rounded-pill">
                      삭제
                    </CButton>
                  </CCol>
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default docStorage
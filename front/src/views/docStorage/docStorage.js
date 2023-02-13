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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import CIcon from '@coreui/icons-react'
import { cilCheck } from '@coreui/icons'
import { CForm, CFormTextarea } from '@coreui/react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import WriteDocStorage from '../../components/WriteDocStorage'
import Comments from '../../components/Comments'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { useDispatch, useSelector } from 'react-redux'

const docStorage = (props) => {
  const [visibleXL, setVisibleXL] = useState(false)

  //워크스페이스 주소값
  const dispatch = useDispatch()
  const params = useParams()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)

  const navigateTodocwrite = (params) => {
    navigate(`/ws/${params.url}/docWrite`)
  }
  const myparams = {
    url: params.url,
  }

  //문서저장소 게시판 리스트 호출
  useEffect(() => {
    // AES알고리즘 사용 복호화
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
    //인코딩, 문자열로 변환, JSON 변환
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    const accessToken = decrypted.token
    axios({
      method: 'get',
      url: '/doc/doclist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    })
  }, [])

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
            <CCol sm={7} align="end" className="d-none d-md-block">
              <CButton onClick={() => setVisibleXL(!visibleXL)}>등록</CButton>
              <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                <CModalHeader>
                  <CModalTitle>문서저장소 등록</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <WriteDocStorage />
                </CModalBody>
              </CModal>
            </CCol>
          </CRow>
          <CAccordion alwaysOpen>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <CCol className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #12-1
                    </strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>유스케이스</strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>UseCase_명세서2.word</strong>
                  </CCol>
                  <CCol className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </CCol>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea defaultValue="로고이미지입니다" rows={5} />
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
                <CRow>
                  <Comments />
                </CRow>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                <CRow className="col-12">
                  <CCol className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #18
                    </strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>DB exerd 이미지</strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>DB설계도.jpg</strong>
                  </CCol>
                  <CCol className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </CCol>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea defaultValue="로고이미지입니다" rows={5} />
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
                  <CCol className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #24
                    </strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>아이콘 이미지들</strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>파비콘.jpg</strong>
                    <p></p>
                    <strong>로고.png</strong>
                  </CCol>
                  <CCol className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </CCol>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CForm>
                  <CFormTextarea defaultValue="로고이미지입니다" rows={5} />
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
                  <CCol className="col-2 px-2">
                    <strong>
                      <CIcon icon={cilCheck} /> #28
                    </strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>회의록 구글docs</strong>
                  </CCol>
                  <CCol className="col-4 px-2">
                    <strong>구글문서.link</strong>
                  </CCol>
                  <CCol className="col-2 px-1">
                    <strong>USERNICK</strong>
                    <p></p>
                    <strong>2023.01.01 12:20</strong>
                  </CCol>
                </CRow>
              </CAccordionHeader>
              <CAccordionBody>
                <CFormTextarea defaultValue="로고이미지입니다" rows={5} />
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

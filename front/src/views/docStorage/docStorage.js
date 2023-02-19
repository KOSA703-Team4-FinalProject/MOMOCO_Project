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
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
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
import { cilBell, cilCheck } from '@coreui/icons'
import { CForm, CFormTextarea } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import WriteDocStorage from './WriteDocStorage'
import Comments from '../../components/Comments'
import issuelist from '../board/issuelist'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { useDispatch, useSelector } from 'react-redux'

const docStorage = (props) => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [list, SetList] = useState([])
  let [ImgModal, setImgModal] = useState(false)

  //워크스페이스 주소값
  const dispatch = useDispatch()
  const params = useParams()
  // const issueModal = useSelector((state) => state.issueModal)
  // const issueNumber = useSelector((state) => state.issueNumber)

  const myparams = {
    url: params.url,
  }

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  console.log(myparams)
  //문서저장소 게시판 리스트 호출
  useEffect(() => {
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/doc/list',
      data: myparams,
    }).then((res) => {
      SetList(res.data)
      console.log(res.data)
    })
  }, [])

  const viewImage = (e) => {
    const reqData = {
      content: e.traget.value,
      url: myparams,
    }
    axios({
      method: 'GET',
      url: '/api/token',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      if (res.data == '') {
        Swal.fire('Error', '잘못된 접근입니다.', 'error')
      } else {
        const url =
          'http://localhost:8090/controller/doc/fileDown?url=' + params.url + '&content=' + re_cont
      }
    })
  }

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
              <CButton type="submit" onClick={() => setVisibleXL(!visibleXL)}>
                등록
              </CButton>
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
            {list.map((data, key) => (
              <CAccordionItem itemKey={key}>
                <CAccordionHeader>
                  <CRow className="col-12">
                    <CCol className="col-2 px-2">
                      <strong>
                        <CIcon icon={cilCheck} /> #{data.idx}
                      </strong>
                    </CCol>
                    <CCol className="col-4 px-2">
                      <strong>{data.title}</strong>
                    </CCol>
                    <CCol className="col-4 px-2">
                      <strong>{data.ori_filename}</strong>
                    </CCol>
                    <CCol className="col-2 px-1">
                      <strong>{data.nickname}</strong>
                      <p></p>
                      <strong>{data.w_date}</strong>
                    </CCol>
                  </CRow>
                </CAccordionHeader>
                <CAccordionBody>
                  <CCol align="center">
                    <h3>
                      <strong>{data.ori_filename}</strong>
                      <CModal
                        alignment="center"
                        visible={ImgModal}
                        onClose={() => setImgModal(false)}
                      >
                        <CModalBody>
                          <img src="#" alt="이미지" style={{ width: '100%', height: 'auto' }} />
                        </CModalBody>
                      </CModal>

                      <CButton
                        onClick={viewImage}
                        className="my-3 mx-1"
                        color="dark"
                        shape="rounded-pill"
                        value={(data.save_filename, data.upload_type)}
                      >
                        {data.upload_type === 'image' ? (
                          <strong>미리보기</strong>
                        ) : data.upload_type === 'link' ? (
                          <strong>바로가기</strong>
                        ) : (
                          <strong>파일저장</strong>
                        )}
                      </CButton>
                    </h3>
                  </CCol>
                  <CFormTextarea defaultValue={data.content} rows={5} />
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
            ))}
          </CAccordion>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default docStorage

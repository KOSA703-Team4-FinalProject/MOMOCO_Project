import { cilCaretLeft, cilCheck, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CPagination,
  CPaginationItem,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
const writedate = {}
const title = {}
const context = {}
const number = {
  fontSize: 20,
  border: '8px',
  mt: '-30px',
}
const boardname = {}
const check = {
  width: '45px',
  height: '45px',
}
const ccardsize = {
  height: '45px',
}

const Boardlist = () => {
  const [currentPage, setActivePage] = useState(2)
  const params = useParams()
  const navigate = useNavigate()
  const [baordlist, setBoardList] = useState([])
  const navigateToboardwrite = (params) => {
    navigate(`/ws/${params.url}/boardwrite`)
  }
  const myparams = {
    url: params.url,
  }
  useEffect(() => {
    // AES알고리즘 사용 복호화
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
    //인코딩, 문자열로 변환, JSON 변환
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    const accessToken = decrypted.token
    axios({
      method: 'get',
      url: '/board/boardlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      console.log(res.data)
    })
  }, [])
  const listData = {
    title: '',
    writedate: '',
    content: '',
    boardname: '',
    usernick: '',
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                <strong>&nbsp;&nbsp;MOMOCO</strong>
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mt-2">
                      프로젝트에 관련된 글을 제공합니다 프로젝트를 하면서 모두 함께 성장해요
                    </p>
                  </div>
                  <div className="col-md-6" align="right">
                    <div
                      className={'mt-2 col-6'}
                      style={{ justifyContent: 'justify-content-start' }}
                    >
                      <CInputGroup className="mb-4">
                        <CFormInput
                          placeholder="검색어를 입력하세요"
                          aria-label="검색어를 입력하세요"
                          aria-describedby="button-addon2"
                        />
                        <CButton
                          type="button"
                          color="secondary"
                          variant="outline"
                          id="button-addon2"
                        >
                          검색
                        </CButton>
                      </CInputGroup>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck1"
                        autoComplete="off"
                        label="전체보기"
                        value={0}
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck2"
                        autoComplete="off"
                        label="칸반보드"
                        value={2}
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck3"
                        autoComplete="off"
                        label="캘린더"
                        value={4}
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck4"
                        autoComplete="off"
                        label="문서저장소"
                        value={3}
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck5"
                        autoComplete="off"
                        label="게시판"
                        value={1}
                      />
                    </CButtonGroup>
                  </div>
                  <div className="col-md-3" align="right">
                    <Link to={`/ws/${params.url}/boardwrite`}>
                      <CButton variant="outline">글쓰기</CButton>
                    </Link>
                  </div>
                </div>

                {/* 게시판 목록 시작 */}

                <CCard className="p-3 mt-3">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-1" style={number}>
                        <CIcon icon={cilCheck} />
                        <strong>NO.</strong>
                      </div>
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-12" style={title}>
                            <strong> {listData.title}</strong>
                          </div>
                          <div className="col-md-12" style={context}>
                            {listData.content}
                          </div>
                          <div className="col-md-12">
                            <CBadge color="dark" shape="rounded-pill" style={boardname}>
                              {listData.boardname}
                            </CBadge>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="col-md-12" align="end">
                          <CAvatar
                            className="ms-3"
                            src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                          />
                          {listData.usernick}
                        </div>
                        <div className="col-md-12" align="end" style={writedate}>
                          {listData.writedate}
                        </div>
                      </div>
                    </div>
                  </div>
                </CCard>

                {/* 게시판 목록 끝 */}
                <br />

                <CPagination align="center" aria-label="Page navigation example">
                  <CPaginationItem aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </CPaginationItem>
                  <CPaginationItem>1</CPaginationItem>
                  <CPaginationItem>2</CPaginationItem>
                  <CPaginationItem>3</CPaginationItem>
                  <CPaginationItem aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </CPaginationItem>
                </CPagination>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Boardlist

import { cilCaretLeft, cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
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
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
const AllBoardList = () => {
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  const params = useParams()
  const myparams = {
    url: params.url,
  }
  const [allboardlist, setallBoardlist] = useState([])
  //모든 게시판 목록
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/allboard/allboardlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      res.data.map((data) => {
        setallBoardlist((allboardlist) => [...allboardlist, data])
      })
    })
  }, [])

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
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck2"
                        autoComplete="off"
                        label="미확인 글"
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck2"
                        autoComplete="off"
                        label="칸반보드"
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck3"
                        autoComplete="off"
                        label="캘린더"
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck4"
                        autoComplete="off"
                        label="문서저장소"
                      />
                      <CFormCheck
                        button={{ color: 'primary', variant: 'outline' }}
                        id="btncheck5"
                        autoComplete="off"
                        label="자유게시판"
                      />
                    </CButtonGroup>
                  </div>
                  <div className="col-md-3" align="right">
                    <Link to="/boardwrite">
                      <CButton variant="outline">글쓰기</CButton>
                    </Link>
                  </div>
                </div>

                {/* 게시판 목록 시작 */}
                {allboardlist.map((data, key) => (
                  <CCard
                    className="p-3 mt-3"
                    key={key}
                    onClick={() => {
                      navigate(`/ws/${params.url}/boardcontent/${data.idx}`)
                    }}
                  >
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-1" style={number}>
                          <CIcon icon={cilCheck} />
                          <CFormInput type="hidden" id="idx" value={data.idx} />
                          <strong>{data.idx}.</strong>
                        </div>
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-12" style={title}>
                              <strong> {data.title}</strong>
                            </div>
                            <div className="col-md-12" style={context}>
                              {data.content.replace(/(<([^>]+)>)/gi, '')}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="col-md-12" align="end">
                            <CAvatar className="ms-3" src={data.profilephoto} /> &nbsp;
                            {data.nickname}
                            <CFormInput type="hidden" id="nickname" value={data.nickname} />
                            <CFormInput type="hidden" id="u_idx" value={data.u_idx} />
                          </div>

                          <div className="col-md-12" align="end" style={writedate}>
                            {data.w_date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CCard>
                ))}
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

export default AllBoardList

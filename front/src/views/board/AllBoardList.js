import { cilCaretLeft, cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { FcCheckmark } from 'react-icons/fc'
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
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
const common = {
  color: '#D8CEF6',
}
const AllBoardList = () => {
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))
  const params = useParams()

  const [allboardlist, setallBoardlist] = useState([]) //모든게시판목록
  const [boardnumber, setBoardNumber] = useState('') // 게시판 번호 받기
  const [searchValue, setSearchValue] = useState('') // 검색
  const [isChecked, setIsChecked] = useState(false) // 전체보기 게시판
  const navigate = useNavigate()

  const handleClick = (event) => {
    //클릭할때 게시판번호 검색
    const number = event.target.value
    setBoardNumber((prev) => number)

    const searchcontent = {
      url: params.url,
      u_idx: login.u_idx,
      type: 'boardnumber1',
      keyword: number,
    }

    axios({
      method: 'POST',
      url: '/allboard/allboardlist',
      headers: { Authorization: `Bearer ${accessToken}` },

      data: searchcontent,
    }).then((res) => {
      console.log(res.data)
      setallBoardlist(res.data)
    })
  }

  //모든 게시판 목록
  function list() {
    const myparams = {
      url: params.url,
      u_idx: login.u_idx,
    }

    axios({
      method: 'POST',
      url: '/allboard/allboardlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      console.log(res.data)
      setallBoardlist((prev) => res.data)
    })
  }

  useEffect(() => {
    //로딩되었을때 전체보기
    list()
  }, [])

  useEffect(() => {
    //전체보기를 클릭했을때
    if (isChecked) {
      list()
    }
  }, [isChecked])

  const handleAllview = (e) => {
    // 전체보기 클릭
    setIsChecked(!isChecked)
    list()
  }
  //페이징 처리
  const [items, setItems] = useState(5)
  const [page, setPage] = useState(1)
  const handlePageChange = (page) => {
    setPage(page)
  }
  //검색 기능
  const handleSearchChange = (event) => {
    setSearchValue(() => event.target.value)
  }
  const searchChange = (e) => {
    const searchcontent = {
      url: params.url,
      type: 'title_content',
      keyword: searchValue,
    }
    axios({
      method: 'POST',
      url: '/allboard/boardsearch',
      headers: { Authorization: `Bearer ${accessToken}` },

      data: searchcontent,
    }).then((res) => {
      console.log(res.data)
      setallBoardlist((prev) => res.data)
    })
  }

  //읽음 테이블에 insert
  const checked = (idx) => {
    const check = {
      idx: idx,
      nickname: login.nickname,
      u_idx: login.u_idx,
      url: params.url,
    }
    console.log(check.idx, check.nickname, check.u_idx)
    axios({
      method: 'POST',
      url: '/api/check/add',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: check,
    }).then((res) => {})
  }
  // 읽지 않은글
  const handlenotcheck = () => {
    const notread = {
      url: params.url,
    }
    axios({
      method: 'POST',
      url: '/allboard/notread',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: notread,
    }).then((res) => {
      console.log(res.data)
      setallBoardlist(() => res.data)
    })
  }
  return (
    <>
      <CCard className="mb-4 p-3">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                <strong>&nbsp;&nbsp;전체보기</strong>
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
                          value={searchValue}
                          onChange={handleSearchChange}
                        />
                        <CButton
                          type="button"
                          color="secondary"
                          variant="outline"
                          id="button-addon2"
                          onClick={searchChange}
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
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck2"
                        name="board"
                        autoComplete="off"
                        label="전체보기"
                        value={isChecked}
                        onClick={handleAllview}
                        type="radio"
                        defaultChecked
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck7"
                        name="board"
                        autoComplete="off"
                        label="미확인"
                        type="radio"
                        onClick={handlenotcheck}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck3"
                        name="board"
                        autoComplete="off"
                        value={3}
                        label="문서저장소"
                        type="radio"
                        onClick={handleClick}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck4"
                        name="board"
                        autoComplete="off"
                        value={4}
                        label="캘린더"
                        type="radio"
                        onClick={handleClick}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck5"
                        name="board"
                        autoComplete="off"
                        value={5}
                        label="자유게시판"
                        type="radio"
                        onClick={handleClick}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btncheck6"
                        name="board"
                        autoComplete="off"
                        value={6}
                        label="칸반보드"
                        type="radio"
                        onClick={handleClick}
                      />
                    </CButtonGroup>
                  </div>
                  <div className="col-md-3" align="right"></div>
                </div>

                {/* 게시판 목록 시작 */}
                {allboardlist
                  .slice(items * (page - 1), items * (page - 1) + items)
                  .map((data, key) => (
                    <CCard
                      className="p-3 mt-3"
                      key={data.idx}
                      onClick={() => {
                        if (data.b_code === 3) {
                          navigate(`/ws/${params.url}/docStorage/${data.idx}`)
                        } else if (data.b_code === 4) {
                          navigate(`/ws/${params.url}/calendar`)
                        } else if (data.b_code === 5) {
                          navigate(`/ws/${params.url}/boardcontent/${data.idx}`)
                        } else if (data.b_code === 6) {
                          navigate(`/ws/${params.url}/kanban`)
                        }
                        checked(data.idx)
                      }}
                    >
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-1" style={number}>
                            {login.u_idx === data.u_idx1 ? <FcCheckmark /> : null}
                            <CFormInput type="hidden" id="idx" value={data.idx} />
                            <strong>#{data.idx}</strong>
                            <CButton color={data.style} shape="rounded-pill" size="sm">
                              {data.label}
                            </CButton>
                          </div>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="col-md-4">
                                &nbsp;<strong> {data.title}</strong>
                              </div>
                              <div className="col-md-12">
                                &nbsp;{' '}
                                {data.content
                                  ? data.content.replace(/(<([^>]+)>)/gi, '').substring(0, 19)
                                  : null}
                              </div>
                              <div className="col-md-8" align="left">
                                {data.b_code === 5 && (
                                  <CButton color="light" shape="rounded-pill" size="sm">
                                    자유게시판
                                  </CButton>
                                )}
                                {data.b_code === 3 && (
                                  <CButton color="light" shape="rounded-pill" size="sm">
                                    문서저장소
                                  </CButton>
                                )}
                                {data.b_code === 4 && (
                                  <CButton color="light" shape="rounded-pill" size="sm">
                                    캘린더
                                  </CButton>
                                )}
                                {data.b_code === 6 && (
                                  <CButton color="light" shape="rounded-pill" size="sm">
                                    칸반보드
                                  </CButton>
                                )}
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

                            <div className="col-md-12" align="end">
                              {data.w_date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CCard>
                  ))}
                {/* 게시판 목록 끝 */}
                <br />

                <div className="col-md-12" align="center">
                  <PaginationBox>
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={items}
                      totalItemsCount={allboardlist.length - 1}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                    ></Pagination>
                  </PaginationBox>
                </div>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`
export default AllBoardList

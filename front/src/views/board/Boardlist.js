import { cilCheck } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import $, { data, param } from 'jquery'
import Pagination from 'react-js-pagination'
import styled from 'styled-components'
import { loginaxios } from '../login/backlogin'
import { TbChecklist } from 'react-icons/tb'
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
  const params = useParams()
  const navigate = useNavigate()
  const [boardlist, setBoardList] = useState([])
  const [check, setCheck] = useState([])
  const [searchValue, setSearchValue] = useState('') // 검색

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))
  //글내용으로 가는  링크
  function handleNavigate() {
    navigate(`/ws/${params.url}/boardcontent/${data.idx}`)
  }

  //글목록
  function list() {
    const myparams = {
      url: params.url,
      u_idx: login.u_idx,
    }

    axios({
      method: 'POST',
      url: '/board/boardlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      reset()
      res.data.map((data) => {
        setBoardList((boardlist) => [...boardlist, data])
      })
      console.log(res.data)
    })
  }

  function reset() {
    setBoardList([])
  }
  //글목록
  useEffect(() => {
    list()
  }, [])
  //글목록 초기화

  //검색 기능
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }
  const searchChange = (e) => {
    const searchcontent = {
      url: params.url,
      type: 'title_content',
      keyword: searchValue,
    }

    axios({
      method: 'POST',
      url: '/board/commonboardsearch',
      headers: { Authorization: `Bearer ${accessToken}` },

      data: searchcontent,
    }).then((res) => {
      setBoardList(res.data)
    })
  }

  //읽음 테이블에 insert
  const checked = () => {
    const check = {
      idx: $('#idx').val(),
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
  //페이징 처리
  const [items, setItems] = useState(5)
  const [page, setPage] = useState(1)
  const handlePageChange = (page) => {
    setPage(page)
  }
  const itemChange = (e) => {
    setItems(Number(e.target.value))
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                <strong>&nbsp;&nbsp;자유게시판</strong>
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mt-2">자유롭게 프로젝트에 관한 글을 남겨주세요</p>
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
                  <div className="col-md-9"></div>
                  <div className="col-md-3" align="right">
                    <Link to={`/ws/${params.url}/boardwrite`}>
                      <CButton variant="outline">글쓰기</CButton>
                    </Link>
                  </div>
                </div>

                {/* 게시판 목록 시작 */}
                {boardlist
                  .slice(items * (page - 1), items * (page - 1) + items)
                  .map((data, key) => {
                    const checkIcon = login.u_idx === data.u_idx1 ? <CIcon icon={cilCheck} /> : null

                    return (
                      <CCard
                        className="p-3 mt-3"
                        key={data.idx}
                        onClick={() => {
                          navigate(`/ws/${params.url}/boardcontent/${data.idx}`)
                          checked()
                        }}
                      >
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-1" style={number}>
                              {checkIcon}
                              <strong>{data.b_idx}.</strong>
                            </div>
                            <div className="col-md-8">
                              <div className="row">
                                <div className="col-md-12" style={title}>
                                  <strong> {data.title}</strong>
                                </div>
                                <div className="col-md-12" style={context}>
                                  {data.content && data.content.replace(/(<([^>]+)>)/gi, '')}
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
                    )
                  })}
                {/* 게시판 목록 끝 */}
                <br />
                <div className="col-md-12" align="center">
                  <PaginationBox>
                    <Pagination
                      activePage={page}
                      itemsCountPerPage={items}
                      totalItemsCount={boardlist.length - 1}
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
export default Boardlist

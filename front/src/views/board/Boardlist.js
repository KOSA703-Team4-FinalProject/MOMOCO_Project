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
import { Link, NavLink, useNavigate, useParams, useHistory } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { data, event } from 'jquery'
import { endOfDay } from 'date-fns'
import { current } from '@reduxjs/toolkit'
import { Pagination, PaginationItem } from '@mui/material'
import Paging from 'src/components/Pagination'
import $ from 'jquery'
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
  const [search, setSearch] = useState('')
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
      method: 'POST',
      url: '/board/boardlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      setBoardList(res.data)
    })
  }, [])
  //페이징 처리

  const [currentpage, setCurrentPage] = useState(1)
  const [totalpage, setTotalPage] = useState([boardlist])
  console.log('토탈 페이지 ' + totalpage)
  // 페이지네이션의 버튼 클릭시 페이지 이동을 위한 setState
  const pageClick = (e) => {
    setCurrentPage(+e.target.id)
  }

  // 페이지네이션을 위한 페이지 배열 만들기
  const makePageArray = (pages) => {
    let pageArray = []
    for (let i = 1; i <= pages; i++) {
      pageArray.push(i)
    }
    setTotalPage(pageArray)
  }

  // 페이지네이션 ㅠㅠ
  const prevPage = Math.floor((currentpage - 1) / 10) * 10

  const makePageInfo = () => {
    let pageArr = []
    const pagination = () => {
      for (let i = 0; i < totalpage.length; i += 10) {
        pageArr.push(totalpage.slice(i, i + 10))
      }
      return pageArr
    }

    const currentGroup = pagination(pageArr)[Math.floor((currentpage - 1) / 10)]

    let pageInfo = {
      arr: currentGroup.map((el) => el),
      perv: prevPage ? prevPage : null,
      next: prevPage + 11 <= totalpage.length ? prevPage + 11 : null,
    }

    return pageInfo
  }

  totalpage.length > 0 && makePageInfo()

  // 페이지네이션 -> 이전 페이지, 다음페이지 클릭시 페이지 이동
  const changepage = (e) => {
    e.target.id === 'prev'
      ? setCurrentPage(makePageInfo()?.perv)
      : setCurrentPage(makePageInfo()?.next)
  }
  //검색 기능
  const searchChange = (e) => {
    const searchcontent = {
      search: $('#searchs').val(),
    }
    setSearch(searchcontent)
    console.log(search)
    axios({
      method: 'POST',
      url: '/board/commonboardsearch',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      data: searchcontent,
    }).then((res) => {
      setBoardList(res.data)
    })
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
                          id="searchs"
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
                {boardlist.map((data, key) => (
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
                            <div className="col-md-12">
                              <CBadge color="dark" shape="rounded-pill" style={boardname}>
                                {data.idx}
                              </CBadge>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="col-md-12" align="end">
                            <CAvatar
                              className="ms-3"
                              src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                            />{' '}
                            &nbsp;
                            {data.nickname}
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
                <div className="col-md-4" align="center"></div>
                <div className="col-md-4" align="center">
                  {totalpage.length && (
                    <Pagination
                      pages={makePageInfo()?.arr}
                      pageClick={pageClick}
                      totalPage={totalpage}
                      currentPage={currentpage}
                      changePage={changepage}
                    />
                  )}
                </div>
                <div className="col-md-4" align="center"></div>
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Boardlist

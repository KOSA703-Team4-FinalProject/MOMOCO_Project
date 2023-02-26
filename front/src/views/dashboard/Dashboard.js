import React from 'react'

import {
  CAvatar,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import { useParams } from 'react-router-dom'
import { Octokit } from 'octokit'
import axios from 'axios'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { BsGithub } from 'react-icons/bs'
import momoco1 from '../../assets/images/momocologo.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { red } from '@mui/material/colors'
import { async } from 'regenerator-runtime'
import Gitchart from 'src/views/git/Gitchart'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  const params = useParams()
  const login = JSON.parse(localStorage.getItem('login'))

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const [newList, setNewList] = useState([]) //새로운 전체글 목록
  const [notreadList, setNotReadList] = useState([]) //확인 안한 글 목록
  const [boardView, setBoardView] = useState(false) //게시판 여부 렌더링 여부

  const [commitsList, setCommitsList] = useState([]) //커밋 리스트
  const [commitView, setCoomitView] = useState(false) //커밋 이력 렌더링 여부
  const [issueList, setIssueList] = useState([]) //미해결 이슈 리스트
  const [issueview, setissueView] = useState(false) //미해결 이슈 렌더링 여부
  const [clone, setClone] = useState(0) //클론 데이터
  const [cloneView, setCloneView] = useState(false) //클론 데이터 렌더링 여부

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/allboard/dashboard',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        url: params.url,
        u_idx: login.u_idx,
      },
    }).then((res) => {
      console.log(res.data)

      setNewList((prev) => res.data.newList)
      setNotReadList((prev) => res.data.notreadList)
      setBoardView(true)
    })

    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      getCommits(res.data)
      getAssignedIssue(res.data)
      getCloneNum(res.data)
    })
  }, [])

  //커밋 이력 불러오기
  const getCommits = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repos,
        page: 1,
        per_page: 4,
      })
      .then((res) => {
        setCommitsList((prev) => res.data)
        setCoomitView(true)
      })
  }

  //미해결 이슈
  const getAssignedIssue = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /orgs/{org}/issues', { org: owner, page: 1, per_page: 4 })
      .then((res) => {
        setIssueList([])
        res.data.map((d) => {
          if (d.repository.name == repos) {
            setIssueList((issueList) => [...issueList, d])
          }
        })
        setissueView(true)
      })
  }

  //한 주간 클론 수
  const getCloneNum = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{owner}/{repo}/traffic/clones', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {
        setClone((prev) => res.data.count)
        setCloneView(true)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="pt-3 my-auto">
          <h5>
            <BsGithub size={25} />
            <strong> 깃허브</strong>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <BsGithub size={20} />
                    <strong> momoco(ws) 커밋 이력</strong>
                  </h6>
                </CCardHeader>
                {commitView == false ? (
                  <CSpinner color="success" />
                ) : (
                  <CCardBody>
                    <CCol xs="auto" className="me-auto">
                      {commitsList.map((data) => {
                        return (
                          <CCard className="px-2 py-1">
                            <CRow>
                              <CCol className="col-md-1 my-auto">
                                <CAvatar src={data.committer.avatar_url} />
                              </CCol>
                              <CCol className="col-md-9 my-auto">
                                {' '}
                                {data.commit.message.substr(0, 10)}
                              </CCol>
                              <CCol className="col-md-2 my-auto">
                                {data.commit.author.date.substr(5, 5)}
                              </CCol>
                            </CRow>
                          </CCard>
                        )
                      })}
                    </CCol>
                  </CCardBody>
                )}
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <BsGithub size={20} />
                    <strong> 미해결 issue List</strong>
                  </h6>
                </CCardHeader>
                {issueview == false ? (
                  <CSpinner color="success" />
                ) : (
                  <CCardBody>
                    <CCol xs="auto" className="me-auto">
                      {issueList.map((data) => {
                        return (
                          <CCard className="px-2 py-1" key={data.number}>
                            <CRow>
                              <CCol className="col-md-1 my-auto">
                                <CAvatar src={data.user.avatar_url} />
                              </CCol>
                              <CCol className="col-md-9 my-auto"> {data.title.substr(0, 10)}</CCol>
                              <CCol className="col-md-2 my-auto">
                                {data.updated_at.substr(5, 5)}
                              </CCol>
                            </CRow>
                          </CCard>
                        )
                      })}
                    </CCol>
                  </CCardBody>
                )}
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader className="pt-3 my-auto">
          <h5>
            <img src={momoco1} width="25px" />
            <strong> momoco 게시판</strong>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <img src={momoco1} width="20px" />
                    <strong> 새로운 전체 글 목록</strong>
                  </h6>
                </CCardHeader>
                {boardView == false ? (
                  <CSpinner color="success" />
                ) : (
                  <CCardBody>
                    <CCol xs="auto" className="me-auto">
                      {newList.map((data) => {
                        if (data.b_code == 5) {
                          return (
                            <CCard className="px-2 py-1" key={data.idx}>
                              <CRow>
                                <CCol className="col-md-1 my-auto">
                                  <CAvatar src={data.profilephoto} />
                                </CCol>
                                <CCol className="col-md-9 my-auto">
                                  <CBadge color="light" textColor="black">
                                    자유
                                  </CBadge>{' '}
                                  {data.title}
                                </CCol>
                                <CCol className="col-md-2 my-auto">{data.w_date}</CCol>
                              </CRow>
                            </CCard>
                          )
                        } else if (data.b_code == 3) {
                          return (
                            <CCard className="px-2 py-1" key={data.idx}>
                              <CRow>
                                <CCol className="col-md-1 my-auto">
                                  <CAvatar src={data.profilephoto} />
                                </CCol>
                                <CCol className="col-md-9 my-auto">
                                  <CBadge color="success">문서</CBadge> {data.title}
                                </CCol>
                                <CCol className="col-md-2 my-auto">{data.w_date}</CCol>
                              </CRow>
                            </CCard>
                          )
                        } else if (data.b_code == 4) {
                          return (
                            <CCard className="px-2 py-1" key={data.idx}>
                              <CRow>
                                <CCol className="col-md-1 my-auto">
                                  <CAvatar src={data.profilephoto} />
                                </CCol>
                                <CCol className="col-md-9 my-auto">
                                  <CBadge color="info">일정</CBadge> {data.title}
                                </CCol>
                                <CCol className="col-md-2 my-auto">{data.w_date}</CCol>
                              </CRow>
                            </CCard>
                          )
                        } else if (data.b_code == 6) {
                          return (
                            <CCard className="px-2 py-1" key={data.idx}>
                              <CRow>
                                <CCol className="col-md-1 my-auto">
                                  <CAvatar src={data.profilephoto} />
                                </CCol>
                                <CCol className="col-md-9 my-auto">
                                  <CBadge color="danger">칸반</CBadge> {data.title}
                                </CCol>
                                <CCol className="col-md-2 my-auto">{data.w_date}</CCol>
                              </CRow>
                            </CCard>
                          )
                        }
                      })}
                    </CCol>
                  </CCardBody>
                )}
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <img src={momoco1} width="20px" />
                    <strong> 확인 안한 글</strong>
                  </h6>
                </CCardHeader>
                {boardView == false ? (
                  <CSpinner color="success" />
                ) : (
                  <CCardBody>
                    <CCol xs="auto" className="me-auto">
                      {notreadList.map((data) => {
                        return (
                          <CCard className="px-2 py-1" key={data.idx}>
                            <CRow>
                              <CCol className="col-md-1 my-auto">
                                <CAvatar src={data.profilephoto} />
                              </CCol>
                              <CCol className="col-md-9 my-auto"> {data.title}</CCol>
                              <CCol className="col-md-2 my-auto">{data.w_date}</CCol>
                            </CRow>
                          </CCard>
                        )
                      })}
                    </CCol>
                  </CCardBody>
                )}
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>GitHub</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={12}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">한 주간 Clone 수</div>
                        {cloneView == false ? (
                          <CSpinner color="success" />
                        ) : (
                          <div className="fs-5 fw-semibold">{clone}</div>
                        )}
                      </div>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol xs={12} md={12} xl={12}>
                  <hr className="mt-0" />

                  <Gitchart />
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

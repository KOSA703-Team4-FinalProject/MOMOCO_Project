import { CAvatar, CBadge, CButton, CCard, CCardBody, CCol, CFormSelect, CRow } from '@coreui/react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import CryptoJS from 'crypto-js'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Octokit } from 'octokit'
import $ from 'jquery'

import { PRIMARY_KEY } from '../../oauth'
import Profile from '../../components/Profile'
import { BsGithub } from 'react-icons/bs'

const backgroundcolor = {
  background: '#EEEEEE',
}

const IssueList = () => {
  const params = useParams()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const url = params.url
  const login = JSON.parse(localStorage.getItem('login'))

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  //타임라인 데이터
  const [commitsList, setCommitsList] = useState([])
  const [listview, setListView] = useState(false)
  const [profileMoal, setProfileModal] = useState(false)
  const [profile, setProfile] = useState({})
  const [option, setOption] = useState('unresolvedissue')
  const [gogitIssue, setGogitIssue] = useState('')

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      setListView(false)
      getIssue(res.data)
      setGogitIssue(`https://github.com/${res.data.owner}/${res.data.linked_repo}/issues/`)
    })
  }, [])

  const getIssue = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {
        console.log(res.data)
        setCommitsList(() => [])
        res.data.map((d) => {
          setCommitsList((commitsList) => [...commitsList, d])
        })
        setListView(true)
      })
  }

  const getAssignedIssue = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit.request('GET /issues', {}).then((res) => {
      console.log(res.data)
      setCommitsList(() => [])
      res.data.map((d) => {
        if (d.repository.name == repos) {
          setCommitsList((commitsList) => [...commitsList, d])
        }
      })
      setListView(true)
    })
  }

  const changeOption = (e) => {
    let op = e.target.value

    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    })
      .then((res) => {
        if (op == 'unresolvedissue') {
          setListView(false)
          getIssue(res.data)
        } else if (op == 'assignedissue') {
          setListView(false)
          getAssignedIssue(res.data)
        }
      })
      .then(() => {
        setOption(e.target.value)
      })
  }

  //이슈 클릭
  const clickIssue = (e) => {
    const tart = e.target
    const targ = $(tart).closest('.issue').attr('giturl')
    console.log(tart)
    console.log(targ)
    const go = document.createElement('a')

    go.href = targ
    go.setAttribute('target', '_blank')
    go.click()
  }

  return (
    <>
      <CCard className="mb-4" style={backgroundcolor}>
        <CCardBody>
          <CRow>
            <CCol sm={3}>
              <h3 className="m-2">
                <strong>Issue List</strong>
              </h3>
              <CFormSelect onChange={changeOption}>
                <option value="unresolvedissue">미해결 Issue 이력</option>
                <option value="assignedissue">할당된 Issue List</option>
              </CFormSelect>
            </CCol>
            <CCol sm={9} className="d-none d-md-block" align="end">
              <CButton
                color="dark"
                variant="outline"
                className="issue"
                giturl={gogitIssue}
                onClick={clickIssue}
              >
                <BsGithub size={25} /> 깃허브 이슈 관리
              </CButton>
            </CCol>
          </CRow>

          {listview == false ? (
            <div className="pt-3 text-center">
              <div className="sk-spinner sk-spinner-pulse"></div>
            </div>
          ) : (
            <VerticalTimeline layout="2-columns">
              {option == 'unresolvedissue' ? (
                commitsList.map((data) => {
                  if (data.user.login == login.nickname) {
                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={data.updated_at}
                        icon={<CAvatar size="xl" src={data.user.avatar_url} />}
                        iconStyle={{ background: 'white', color: 'white' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfile({
                            u_idx: data.user.id,
                            profilephoto: data.user.avatar_url,
                            nickname: data.user.login,
                            email: '',
                            github: data.user.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfile({
                              u_idx: data.user.id,
                              profilephoto: data.user.avatar_url,
                              nickname: data.user.login,
                              email: '',
                              github: data.user.html_url,
                            })
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CBadge color="light" textColor="black" className="ms-6 m-1">
                              <CAvatar size="sm" className="me-1" src={data.user.avatar_url} />
                              <strong>{data.user.login}</strong>
                            </CBadge>
                          </div>
                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard
                          className="p-3 issue"
                          giturl={data.html_url}
                          onClick={clickIssue}
                          style={{ background: '#FAF4C0' }}
                        >
                          <h5>
                            <strong>{data.title}</strong>
                          </h5>
                          {data.body}
                        </CCard>
                      </VerticalTimelineElement>
                    )
                  } else {
                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={data.updated_at}
                        icon={<CAvatar size="xl" src={data.user.avatar_url} />}
                        iconStyle={{ background: 'white', color: 'white' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfile({
                            u_idx: data.user.id,
                            profilephoto: data.user.avatar_url,
                            nickname: data.user.login,
                            email: '',
                            github: data.user.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfile({
                              u_idx: data.user.id,
                              profilephoto: data.user.avatar_url,
                              nickname: data.user.login,
                              email: '',
                              github: data.user.html_url,
                            })
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CBadge color="light" textColor="black" className="ms-6 m-1">
                              <CAvatar size="sm" className="me-1" src={data.user.avatar_url} />
                              <strong>{data.user.login}</strong>
                            </CBadge>
                          </div>

                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard
                          className="p-3 issue"
                          giturl={data.html_url}
                          onClick={clickIssue}
                          style={{ background: '#FAF4C0' }}
                        >
                          <h5>
                            <strong>{data.title}</strong>
                          </h5>
                          {data.body}
                        </CCard>
                      </VerticalTimelineElement>
                    )
                  }
                })
              ) : option == 'assignedissue' ? (
                commitsList.map((data) => {
                  if (data.user.login == login.nickname) {
                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={data.updated_at}
                        icon={<CAvatar size="xl" src={data.user.avatar_url} />}
                        iconStyle={{ background: 'white', color: 'white' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfile({
                            u_idx: data.user.id,
                            profilephoto: data.user.avatar_url,
                            nickname: data.user.login,
                            email: '',
                            github: data.user.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfile({
                              u_idx: data.user.id,
                              profilephoto: data.user.avatar_url,
                              nickname: data.user.login,
                              email: '',
                              github: data.user.html_url,
                            })
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CBadge color="light" textColor="black" className="ms-6 m-1">
                              <CAvatar size="sm" className="me-1" src={data.user.avatar_url} />
                              <strong>{data.user.login}</strong>
                            </CBadge>
                          </div>
                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard
                          className="p-3 issue"
                          giturl={data.html_url}
                          onClick={clickIssue}
                          style={{ background: '#FAF4C0' }}
                        >
                          <h5>
                            <strong>{data.title}</strong>
                          </h5>
                          {data.body}
                        </CCard>
                      </VerticalTimelineElement>
                    )
                  } else {
                    return (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date={data.updated_at}
                        icon={<CAvatar size="xl" src={data.user.avatar_url} />}
                        iconStyle={{ background: 'white', color: 'white' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfile({
                            u_idx: data.user.id,
                            profilephoto: data.user.avatar_url,
                            nickname: data.user.login,
                            email: '',
                            github: data.user.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfile({
                              u_idx: data.user.id,
                              profilephoto: data.user.avatar_url,
                              nickname: data.user.login,
                              email: '',
                              github: data.user.html_url,
                            })
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CBadge color="light" textColor="black" className="ms-6 m-1">
                              <CAvatar size="sm" className="me-1" src={data.user.avatar_url} />
                              <strong>{data.user.login}</strong>
                            </CBadge>
                          </div>

                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard
                          className="p-3 issue"
                          giturl={data.html_url}
                          onClick={clickIssue}
                          style={{ background: '#FAF4C0' }}
                        >
                          <h5>
                            <strong>{data.title}</strong>
                          </h5>
                          {data.body}
                        </CCard>
                      </VerticalTimelineElement>
                    )
                  }
                })
              ) : (
                <></>
              )}
            </VerticalTimeline>
          )}
        </CCardBody>
        <Profile user={profile} profileMoal={profileMoal} />
      </CCard>
    </>
  )
}

export default IssueList

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { BsEmojiSmile } from 'react-icons/bs'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'
import Profile from '../../components/Profile'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Octokit } from 'octokit'
import { async } from 'regenerator-runtime'

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
        setCommitsList((commitsList) => [...commitsList, d])
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

  return (
    <>
      <CCard className="mb-4" style={backgroundcolor}>
        <CCardBody>
          <CRow>
            <CCol sm={3}>
              <CFormSelect onChange={changeOption}>
                <option value="unresolvedissue">미해결 Issue 이력</option>
                <option value="assignedissue">할당된 Issue List</option>
              </CFormSelect>
            </CCol>
            <CCol sm={9} className="d-none d-md-block"></CCol>
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
                        iconStyle={{ background: '#000CB7', color: '#fff' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CAvatar src={data.user.avatar_url} /> {data.user.login}
                          </div>
                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard className="p-3" style={{ background: '#FAF4C0' }}>
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
                        iconStyle={{ background: '#514200', color: '#fff' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CAvatar src={data.user.avatar_url} /> {data.user.login}
                          </div>

                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard className="p-3" style={{ background: '#FAF4C0' }}>
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
                        iconStyle={{ background: '#000CB7', color: '#fff' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CAvatar src={data.user.avatar_url} /> {data.user.login}
                          </div>
                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard className="p-3" style={{ background: '#FAF4C0' }}>
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
                        iconStyle={{ background: '#514200', color: '#fff' }}
                        key={data.id}
                        iconOnClick={() => {
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <h6
                          className="mb-2 row"
                          onClick={() => {
                            setProfileModal(!profileMoal)
                          }}
                        >
                          <div align="start" className="col-9">
                            <CAvatar src={data.user.avatar_url} /> {data.user.login}
                          </div>

                          <div className="col-3" align="end">
                            <strong># {data.number}</strong>
                          </div>
                        </h6>
                        <CCard className="p-3" style={{ background: '#FAF4C0' }}>
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
        <CModal alignment="center" visible={profileMoal} onClose={() => setProfileModal(false)}>
          <CModalHeader onClose={() => setVisible(false)}></CModalHeader>
          <CModalBody>
            <Profile user={profile} />
          </CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default IssueList
import {
  CAvatar,
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CRow,
} from '@coreui/react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'
import Profile from '../../components/Profile'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Octokit } from 'octokit'

const backgroundcolor = {
  background: '#EEEEEE',
}

const Gittimeline = () => {
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

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      getCommits(res.data)
    })
  }, [])

  const getCommits = async (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {
        console.log(res.data)
        setCommitsList([])
        res.data.map((d) => {
          setCommitsList((commitsList) => [...commitsList, d])
        })
        setListView(true)

        console.log(commitsList)
      })
  }

  return (
    <>
      <CCard className="mb-4" style={backgroundcolor}>
        <CCardBody>
          <CRow>
            <CCol sm={3} className="mx-3 mt-2">
              <h3>
                <strong>Commit 이력</strong>
              </h3>
            </CCol>
            <CCol sm={9} className="d-none d-md-block"></CCol>
          </CRow>

          {listview == false ? (
            <div className="pt-3 text-center">
              <div className="sk-spinner sk-spinner-pulse"></div>
            </div>
          ) : (
            <VerticalTimeline layout="2-columns">
              {commitsList.map((commit) => {
                if (commit.committer.login == login.nickname) {
                  return (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      date={commit.commit.author.date}
                      icon={<CAvatar size="xl" src={commit.committer.avatar_url} />}
                      iconStyle={{ background: 'white', color: 'white' }}
                      key={commit.sha}
                      position="left"
                      iconOnClick={() => {
                        setProfile({
                          u_idx: commit.committer.id,
                          profilephoto: commit.committer.avatar_url,
                          nickname: commit.committer.login,
                          email: commit.commit.author.email,
                          github: commit.committer.html_url,
                        })
                        setProfileModal(!profileMoal)
                      }}
                    >
                      <h6
                        className="mb-2"
                        u_idx={commit.committer.id}
                        onClick={() => {
                          setProfile({
                            u_idx: commit.committer.id,
                            profilephoto: commit.committer.avatar_url,
                            nickname: commit.committer.login,
                            email: commit.commit.author.email,
                            github: commit.committer.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <CBadge color="light" textColor="black" className="ms-6 m-1">
                          <CAvatar size="sm" className="me-1" src={commit.committer.avatar_url} />
                          <strong>{commit.committer.login}</strong>
                        </CBadge>
                      </h6>
                      <CCard className="p-3" style={{ background: '#D9E5FF' }}>
                        {commit.commit.message}
                      </CCard>
                    </VerticalTimelineElement>
                  )
                } else {
                  return (
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work"
                      date={commit.commit.author.date}
                      icon={<CAvatar size="xl" src={commit.committer.avatar_url} />}
                      iconStyle={{ background: 'white', color: 'white' }}
                      key={commit.sha}
                      position="right"
                      iconOnClick={() => {
                        setProfile({
                          u_idx: commit.committer.id,
                          profilephoto: commit.committer.avatar_url,
                          nickname: commit.committer.login,
                          email: commit.commit.author.email,
                          github: commit.committer.html_url,
                        })
                        setProfileModal(!profileMoal)
                      }}
                    >
                      <h6
                        className="mb-2"
                        u_idx={commit.committer.id}
                        onClick={() => {
                          setProfile({
                            u_idx: commit.committer.id,
                            profilephoto: commit.committer.avatar_url,
                            nickname: commit.committer.login,
                            email: commit.commit.author.email,
                            github: commit.committer.html_url,
                          })
                          setProfileModal(!profileMoal)
                        }}
                      >
                        <CBadge color="light" textColor="black" className="ms-6">
                          <CAvatar size="sm" className="me-1" src={commit.committer.avatar_url} />
                          <strong>{commit.committer.login}</strong>
                        </CBadge>
                      </h6>
                      <CCard className="p-3" style={{ background: '#FAF4C0' }}>
                        {commit.commit.message}
                      </CCard>
                    </VerticalTimelineElement>
                  )
                }
              })}
            </VerticalTimeline>
          )}
        </CCardBody>
        <Profile user={profile} profileMoal={profileMoal} />
      </CCard>
    </>
  )
}
export default Gittimeline

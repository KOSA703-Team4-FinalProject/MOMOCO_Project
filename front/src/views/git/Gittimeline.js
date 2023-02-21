import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { BsEmojiSmile } from 'react-icons/bs'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Octokit } from 'octokit'
import { async } from 'regenerator-runtime'

const backgroundcolor = {
  background: '#dcdcdc',
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

    //임시로 레파지토리 이름
    const repos = data.linked_repo
    //임시로 레포지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{owner}/{repo}/commits', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {

        console.log(res.data)

        res.data.map((d) => {
          setCommitsList((commitsList) => [...commitsList, d])
        })
        setListView(true)
      })
  }

  return (
    <>
      <CCard className="mb-4" style={backgroundcolor}>
        <CCardBody>
          <CRow>
            <CCol sm={5}></CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>

          <VerticalTimeline>
            {commitsList.map((commit) => {
              return (
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date={commit.updated_at}
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  key={commit.sha}
                >
                  <h2 className="vertical-timeline-element-title">{commit.id}</h2>

                  <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team
                    Leading
                  </p>
                </VerticalTimelineElement>
              )
            })}
          </VerticalTimeline>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}
export default Gittimeline

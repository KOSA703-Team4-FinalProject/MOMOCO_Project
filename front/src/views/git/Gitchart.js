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

import {
  CAlert,
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Gitchart = () => {
  const params = useParams()
  const [getValue, setGetValue] = useState([])
  const [valuearr, setValuearr] = useState([])
  const [keyarr, setKeyarr] = useState([])

  const [cvaluearr, setCvaluearr] = useState([])
  const [ckeyarr, setCkeyarr] = useState([])

  const [wvaluearr, setWvaluearr] = useState([])
  const [wkeyarr, setWkeyarr] = useState([])

  const [viewLan, setViewLan] = useState(false)
  const [viewLan2, setViewLan2] = useState(false)
  const [viewLan3, setViewLan3] = useState(false)
  const [chartdata, setChartdata] = useState({})

  const colorCodes = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#FFFF00',
    purple: '#800080',
    orange: '#FFA500',
    pink: '#FFC0CB',
    brown: '#A52A2A',
    gray: '#808080',
    black: '#000000',
  }

  const colors = Object.keys(colorCodes)
  const randomColor = colors[Math.floor(Math.random() * colors.length)]

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

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      // getCommits(res.data)
      console.log(res.data)
      getLanguageList(res.data)
      getrepositorycontributors(res.data)
      getweeklycommitcount(res.data)
    })

    const getLanguageList = async (data) => {
      //임시로 레파지토리 이름
      const repos = data.linked_repo

      //임시로 레포지토리 주인
      const owner = data.owner

      await octokit
        .request('GET /repos/{owner}/{repo}/languages', {
          owner: owner,
          repo: repos,
        })
        .then((res) => {
          const languageEntries = Object.entries(res.data)

          setValuearr([])
          setKeyarr([])
          languageEntries.map((data) => {
            setValuearr((valuearr) => [...valuearr, data[0]])
            setKeyarr((keyarr) => [...keyarr, data[1]])
          })

          setViewLan(true)
        })
    }

    // 레퍼지토리 기여자 차트
    const getrepositorycontributors = async (data) => {
      //임시로 레파지토리 이름
      const repos = data.linked_repo

      //임시로 레포지토리 주인
      const owner = data.owner

      await octokit
        .request('GET /repos/{owner}/{repo}/contributors', {
          owner: owner,
          repo: repos,
        })
        .then((res) => {
          const contributorEntries = Object.entries(res.data)
          console.log(contributorEntries)
          setCvaluearr([])
          setCkeyarr([])
          contributorEntries.map((data) => {
            console.log(data[1])
            setCvaluearr((cvaluearr) => [...cvaluearr, data[1].login])
            setCkeyarr((ckeyarr) => [...ckeyarr, data[1].contributions])
          })

          setViewLan2(true)
        })
    }

    const getweeklycommitcount = async (data) => {
      //임시로 레파지토리 이름
      const repos = data.linked_repo

      //임시로 레포지토리 주인
      const owner = data.owner

      await octokit
        .request('GET /repos/{owner}/{repo}/stats/participation', {
          owner: owner,
          repo: repos,
        })
        .then((res) => {
          console.log(res.data)
          const weeklycommitcountEntries = Object.entries(res.data)
          // console.log(weeklycommitcountEntries)
          setWvaluearr([])
          setWkeyarr([])
          weeklycommitcountEntries.map((data) => {
            console.log(data[1])
            setWvaluearr((wvaluearr) => [...wvaluearr, data[1]])
            setWkeyarr((wkeyarr) => [...wkeyarr, data[1]])
          })

          setViewLan3(true)
        })
    }
  }, [])

  // 차트 랜덤 색상 변경
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  // contributor 차트 색상변경
  const generateRandomColor2 = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const backgroundColor = new Array(valuearr.length).fill(null).map(() => generateRandomColor())
  const backgroundColor2 = new Array(cvaluearr.length).fill(null).map(() => generateRandomColor2())

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow sm={12}>
            <CCol sm={6}>
              <CCard className="p-3">
                <div className="row">
                  <div className="col-md-12" align="center">
                    <h2>
                      <strong>Contributors Chart</strong>
                    </h2>
                    <CCallout color="primary">레파지토리 기여도</CCallout>
                  </div>
                </div>
                {viewLan2 == false ? (
                  <CSpinner color="primary" />
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      <CChart
                        type="bar"
                        data={{
                          labels: cvaluearr,
                          datasets: [
                            {
                              label: '',
                              backgroundColor: backgroundColor2,
                              data: ckeyarr,
                            },
                          ],
                        }}
                        labels="months"
                      />
                    </div>
                  </div>
                )}
              </CCard>
            </CCol>
            <CCol sm={6}>
              <CCard className="p-3">
                <div className="row">
                  <div className="col-md-12" align="center">
                    <h2>
                      <strong>사용언어 차트</strong>
                    </h2>
                    <CCallout color="primary">사용언어 차트</CCallout>
                  </div>
                </div>
                {viewLan == false ? (
                  <CSpinner color="primary" />
                ) : (
                  <div className="row">
                    <div className="col-md-12">
                      <CChart
                        type="doughnut"
                        data={{
                          labels: valuearr,

                          datasets: [
                            {
                              backgroundColor: backgroundColor,
                              data: keyarr,
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>
                )}
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}
export default Gitchart

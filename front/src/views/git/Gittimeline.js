import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsEmojiSmile } from "react-icons/bs";
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { Octokit } from 'octokit';
import { async } from 'regenerator-runtime';

const backgroundcolor ={
  background:'#dcdcdc'
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
    auth: `Bearer ${accessToken}`
  })

  //임시로 레파지토리 이름
  const repos = 'TIL'
  //임시로 레포지토리 주인
  const owner = 'park71405'

  useEffect(()=>{
    getCommits()
  }, [])

  const getCommits = async () => {
    await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: owner,
      repo: repos
    }).then((res) => {
      console.log(res)
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
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff'}}
            
            >
              <h2 className="vertical-timeline-element-title">username</h2>
              
              <p>
                Creative Direction, User Experience, Visual Design, Project Management, Team Leading
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">Art Director</h3>
              <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
              <p>Creative Direction, User Experience, Visual Design, SEO, Online Marketing</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2008 - 2010"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">Web Designer</h3>
              <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
              <p>User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2006 - 2008"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">Web Designer</h3>
              <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
              <p>User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="April 2013"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">
                Content Marketing for Web, Mobile and Social Media
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
              <p>Strategy, Social Media</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="November 2012"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
              <h4 className="vertical-timeline-element-subtitle">Certification</h4>
              <p>Creative Direction, User Experience, Visual Design</p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              date="2002 - 2006"
              iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
              icon={<BsEmojiSmile/>}
            >
              <h3 className="vertical-timeline-element-title">
                Bachelor of Science in Interactive Digital Media Visual Imaging
              </h3>
              <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
              <p>Creative Direction, Visual Design</p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}
export default Gittimeline
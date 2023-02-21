import { CCard, CCardBody, CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react'
import React from 'react'
import { CAvatar } from '@coreui/react'
import { useEffect, useState } from 'react'
import StompJs from 'stompjs'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../oauth'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'

const NotisStyle = {
  width: '400px',
  maxHeight: '600px',
  overflowY: 'scroll',
}

const Notifications = (props) => {
  const [list, SetList] = useState('')
  const dispatch = useDispatch()
  const params = useParams()

  let stomp = props.stomp

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))
  const nickname = login.nickname
  const u_idx = login.u_idx
  const url = params.url

  //웹 소켓 연결
  const connect = () => {
    stomp.connect({}, () => {
      //기존 알람 내용 불러오기
      axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: '/api/alarm/alarmList',
        data: u_idx,
      }).then((res) => {
        SetList(res.data)
        console.log(res.data)
      })
    })
  }

  useEffect(() => {}, [])

  return (
    <CCard style={NotisStyle}>
      <CCardBody>
        <CRow className="px-1 pb-4">
          <CCol sm={5}>
            <strong>최근({9})</strong>
          </CCol>
          <CCol align="end" sm={7}>
            전체읽음으로 표시
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CListGroup>
              <CListGroupItem component="a" href="#">
                <CRow>
                  <div align="center">전체삭제</div>
                </CRow>
              </CListGroupItem>
              {/* {list.map((list, index) => (
                <CListGroupItem
                  component="a"
                  href="#"
                  color={list.check == 1 ? 'info' : 'light'}
                  key={index}
                >
                  <CRow>
                    <CCol sm={2}>
                      <CAvatar
                        className="ms-1"
                        src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                      />
                    </CCol>
                    <CCol sm={8}>
                      <strong>자유게시판 '코드 확인 바랍..' 글에 댓글이 달렸습니다.</strong>
                      <i className="text-medium-emphasis">..momoco에서</i>
                    </CCol>
                    <CCol sm={2}>삭제</CCol>
                  </CRow>
                </CListGroupItem>
              ))} */}
            </CListGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Notifications

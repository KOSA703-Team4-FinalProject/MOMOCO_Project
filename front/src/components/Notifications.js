import {
  CCard,
  CCardBody,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
  CButton,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react'
import React from 'react'
import { CAvatar } from '@coreui/react'
import { useEffect, useState } from 'react'
import StompJs from 'stompjs'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { PRIMARY_KEY } from '../oauth'
import { useNavigate, useParams } from 'react-router'
import { Swal } from 'sweetalert2'
import { BsFillTrashFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { updateToast } from 'src/store'
import { listItemButtonClasses } from '@mui/material'

const NotisStyle = {
  width: '400px',
  maxHeight: '600px',
  overflowY: 'scroll',
}

const Notifications = (props) => {
  const [list, SetList] = useState([])
  const params = useParams()
  const navigate = useNavigate()
  const alarmToast = useSelector((state) => state.alarmToast)
  const dispatch = useDispatch()

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

  stomp.connect({}, () => {
    console.log('22222')
    stomp.subscribe('/sub/one/alarm/' + u_idx, (alarm) => {
      console.log(u_idx)
      const res = JSON.parse(alarm.body)
      console.log(res)
      SetList((list) => [res, ...list])
      console.log(res.w_date)

      if (res != '') {
        dispatch(
          updateToast({
            link: res.link,
            url: res.url,
            content: res.content,
            nickname: res.nickname,
            w_date: res.w_date,
          }),
        )
      }
    })
  })

  const myparams = {
    u_idx: u_idx,
    url: url,
  }

  //기존 알람 내용 불러오기
  function listFromDb() {
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/alarm/alarmList',
      data: myparams,
    }).then((res) => {
      SetList(res.data)
      console.log(res.data)
    })
  }

  useEffect(() => {
    //기존 알람 내용 불러오기
    listFromDb()

    return () => {
      stomp.unsubscribe()
    }
  }, [])

  function checkAlarm(a_idx, link) {
    const data = {
      a_idx: a_idx,
    }
    axios({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/alarm/check',
      data: data,
    }).then((res) => {
      if (res.data == 1) {
        listFromDb()
        navigate(link)
      } else alert('유효하지 않은 접근')
    })
  }

  function checkAllAlarm() {
    axios({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/alarm/checkAll',
      data: myparams,
    }).then((res) => {
      if (res.data == 0) {
        alert('유효하지 않은 접근')
      } else {
        listFromDb()
      }
    })
  }

  function getAlarmCount(objects) {
    let alarmCount = 0
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].check_alarm === 1) {
        alarmCount++
      }
    }
    let noncheck = objects.length - alarmCount
    return noncheck
  }

  function deleteAlarm(a_idx) {
    const idx = {
      a_idx: a_idx,
    }
    console.log(a_idx)
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/alarm/delete',
      data: idx,
    }).then((res) => {
      if (res.data != '1') {
        alert('삭제 실패')
      } else {
      }
    })
  }

  const deleteAll = () => {
    axios({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/alarm/deleteAll',
      data: myparams,
    }).then((res) => {
      SetList([])
    })
  }

  return (
    <>
      <CCard style={NotisStyle}>
        <CCardBody>
          <CRow className="px-1 pb-4">
            <CCol sm={5}>
              <strong>미확인({getAlarmCount(list)})</strong>
            </CCol>
            <CCol align="end" sm={7}>
              <CButton color="light" onClick={() => checkAllAlarm()}>
                전체읽음으로 표시
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CListGroup>
                <CListGroupItem component="a" href="#">
                  <CRow>
                    {list.length == 0 ? (
                      <strong>알림이 없습니다</strong>
                    ) : (
                      <CButton color="warning" onClick={deleteAll}>
                        전체삭제
                      </CButton>
                    )}
                  </CRow>
                </CListGroupItem>
                {list.map((data) => {
                  return (
                    <CListGroupItem
                      component="a"
                      href={data.link}
                      color={data.check_alarm != 1 ? 'info' : 'darklight'}
                      key={data.a_idx}
                    >
                      <CRow>
                        <CCol sm={2}>
                          <CAvatar className="ms-1" src={data.profilephoto} />
                        </CCol>
                        <CCol sm={8} onClick={() => checkAlarm(data.a_idx, data.link)}>
                          <strong>
                            {data.content}
                            {data.w_date}
                          </strong>
                          <i className="text-medium-emphasis"> {data.url}에서..</i>
                        </CCol>
                        <CCol sm={2}>
                          <CButton
                            color="info"
                            value={data.a_idx}
                            onClick={() => deleteAlarm(data.a_idx)}
                          >
                            <BsFillTrashFill />
                          </CButton>
                        </CCol>
                      </CRow>
                    </CListGroupItem>
                  )
                })}
              </CListGroup>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Notifications

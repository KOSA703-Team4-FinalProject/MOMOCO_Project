import React, { useEffect } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardText,
  CCol,
  CContainer,
  CRow,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PRIMARY_KEY } from '../oauth'
import { CCardBody } from '@coreui/react'
import { Cookies } from 'react-cookie'
import $ from 'jquery'
import Swal from 'sweetalert2'
import swal from 'sweetalert'

const WorkSpaceListItem = (props) => {
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate()
  const login = JSON.parse(localStorage.getItem('login'))

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

  const accessToken = decrypted.token

  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
  }

  const cookies = new Cookies()

  const DeleteWorkSpaceUser = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { url: content_type, u_idx: login.u_idx }
    console.log(params.url)
    console.log(login.u_idx)

    Swal.fire({
      title: '워크스페이스 나가기',
      text: '워크스페이스를 나간 후에는 멤버에서 삭제되며, 재초대를 받아야만 입장이 가능합니다.',
      icon: 'warning',

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '나가기', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios({
          method: 'POST',
          url: '/api/DeleteWorkSpaceUser',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: params,
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '완료 되었습니다.',
          })
          getWorkSpace()
        })
      } else {
        Swal.fire({
          icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: '취소되었습니다',
        })
      }
    })
  }

  const DeleteWorkSpace = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { url: content_type }
    const delButton = document.getElementById('delbutton')
    const reButton = document.getElementById('rebutton')
    console.log(params.url)

    Swal.fire({
      title: '워크스페이스 삭제',
      text: '삭제 요청한 워크스페이스는 3일 뒤에 자동 삭제 되며, 삭제 전에는 복구가 가능합니다.',
      icon: 'warning',

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '삭제', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios({
          method: 'POST',
          url: '/api/DeleteSpace',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: params,
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '삭제 요청이 완료 되었습니다.',
          })
          // delButton.style.display = 'none'
          // reButton.style.display = 'block'
          getWorkSpace()
        })
      } else {
        Swal.fire({
          icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: '취소되었습니다',
        })
      }
    })
  }

  const RestoreWorkSpace = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { url: content_type }
    const delButton = document.getElementById('delbutton')
    const reButton = document.getElementById('rebutton')
    console.log(params.url)

    Swal.fire({
      title: '워크스페이스 복구',
      text: '해당 워크스페이스의 삭제가 취소됩니다.',
      icon: 'success',

      showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      confirmButtonText: '복구', // confirm 버튼 텍스트 지정
      cancelButtonText: '취소', // cancel 버튼 텍스트 지정

      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      // 만약 Promise리턴을 받으면,
      if (result.isConfirmed) {
        // 만약 모달창에서 confirm 버튼을 눌렀다면
        axios({
          method: 'POST',
          url: '/api/RestoreWorkSpace',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: params,
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '워크스페이스 복구가 완료 되었습니다.',
          })
          // delButton.style.display = 'block'
          // reButton.style.display = 'none'
          getWorkSpace()
        })
      } else {
        Swal.fire({
          icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: '취소되었습니다',
        })
      }
    })
  }

  const getWorkSpace = () => {
    axios({
      url: '/api/getWorkSpace',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      setWorkspacelist(res.data)
      console.log(res)
    })
  }

  useEffect(() => {
    getWorkSpace()
  }, [])

  return (
    <div style={props}>
      {workspacelist == null ? (
        <div>로딩중</div>
      ) : (
        workspacelist.map((workspace) => {
          return (
            <CCard className="mb-3" style={{ background: '#D6E4E5' }}>
              <CCardBody align="left" key={workspace.workSpace.url}>
                <CCol
                  onClick={() => {
                    const date = new Date()
                    cookies.set('url', workspace.workSpace.url, {
                      path: '/',
                      expires: date.setHours(date.getHours + 8),
                      sameSite: 'strict',
                    })
                    navigate(`/ws/${workspace.workSpace.url}/dashboard`)
                  }}
                >
                  <CWidgetStatsF
                    color="dark"
                    icon={<CIcon icon={icon.cibGithub} height={24} />}
                    padding={false}
                    title={' (/ws/' + workspace.workSpace.url + ')'}
                    value={
                      workspace.workSpace.space_name +
                      ' (' +
                      workspace.workSpace.start_date +
                      '~ ' +
                      workspace.workSpace.end_date +
                      ')'
                    }
                  />
                </CCol>

                <CCard>
                  <CCol className="p-2">
                    {workspace.team.map((member) => (
                      <>
                        <CBadge color="light" textColor="black" className="ms-6 m-1">
                          <CAvatar size="sm" className="me-1" src={member.profilephoto} />
                          {member.nickname}
                        </CBadge>
                      </>
                    ))}
                  </CCol>

                  <CRow>
                    <CCol align="right">
                      {params.u_idx === workspace.workSpace.admin ? (
                        workspace.workSpace.del_date != '1900-09-09 00:00:00' ? (
                          <>
                            <strong>
                              삭제예정일 : {workspace.workSpace.del_date.substr(0, 10)}{' '}
                            </strong>
                            <CButton
                              id="rebutton"
                              color="success"
                              variant="outline"
                              size="sm"
                              value={workspace.workSpace.url}
                              onClick={RestoreWorkSpace}
                            >
                              복구
                            </CButton>
                          </>
                        ) : (
                          <CButton
                            id="delbutton"
                            color="danger"
                            variant="outline"
                            size="sm"
                            value={workspace.workSpace.url}
                            onClick={DeleteWorkSpace}
                          >
                            삭제
                          </CButton>
                        )
                      ) : (
                        <CButton
                          color="danger"
                          variant="outline"
                          size="sm"
                          value={workspace.workSpace.url}
                          onClick={DeleteWorkSpaceUser}
                        >
                          나가기
                        </CButton>
                      )}
                    </CCol>
                  </CRow>
                </CCard>
              </CCardBody>
            </CCard>
          )
        })
      )}
    </div>
  )
}

export default WorkSpaceListItem

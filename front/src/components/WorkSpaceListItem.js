import React, { useEffect } from 'react'
import {
  CAvatar,
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

  // 칸반 아이템 삭제하기
  const DeleteWorkSpace = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { url: content_type }
    console.log(content_type)

    Swal.fire({
      title: '워크스페이스를 삭제하시겠습니까?',
      text: '삭제 시 다시 복구할 수 없습니다.',
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
          url: '/api/DeleteWorkSpace',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          data: params,
        }).then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '워크스페이스 삭제가 완료 되었습니다.',
          })
        })
      } else {
        Swal.fire({
          icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
          title: '취소되었습니다',
        })
      }
    })

    // if (confirm('해당 워크스페이스를 삭제하시겠습니까?')) {
    //   alert('삭제가 완료 되었습니다.')
    //   axios({
    //     url: '/api/kanban/DeleteWorkSpace',
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     data: params,
    //   }).then((res) => {
    //     getKanban()
    //   })
    // } else {
    //   alert('취소했습니다.')
    // }
  }

  useEffect(() => {
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
  }, [])

  return (
    <div style={props}>
      {workspacelist == null ? (
        <div>로딩중</div>
      ) : (
        workspacelist.map((workspace) => {
          return (
            <CCardBody key={workspace.workSpace.url}>
              <CCol className="mz-2" align="right">
                {params.u_idx === workspace.workSpace.admin ? (
                  <CButton
                    color="danger"
                    variant="outline"
                    value={workspace.workSpace.url}
                    onClick={DeleteWorkSpace}
                  >
                    삭제
                  </CButton>
                ) : (
                  <CButton color="danger" variant="outline">
                    나가기
                  </CButton>
                )}
              </CCol>
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
                  title={' (momoco.kr/ws/' + workspace.workSpace.url + ')'}
                  value={
                    workspace.workSpace.space_name +
                    ' (' +
                    workspace.workSpace.start_date +
                    '~ ' +
                    workspace.workSpace.end_date +
                    workspace.workSpace.admin +
                    ')'
                  }
                />

                <CCard className="mb-3">
                  <CRow>
                    {workspace.team.map((member) => (
                      <CCol sm="auto">
                        <CCardText key={member.u_idx}>
                          {''}
                          {member.nickname}
                          <CAvatar className="ms-6" src={member.profilephoto} />
                        </CCardText>
                      </CCol>
                    ))}
                  </CRow>
                </CCard>
              </CCol>
            </CCardBody>
          )
        })
      )}
    </div>
  )
}

export default WorkSpaceListItem

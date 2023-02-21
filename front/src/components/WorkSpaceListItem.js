import React, { useEffect } from 'react'
import { CCard, CContainer, CRow, CWidgetStatsF } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRIMARY_KEY } from '../oauth'
import { CCardBody } from '@coreui/react'
import { Cookies } from 'react-cookie'

const WorkSpaceListItem = (props) => {
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate()
  const login = JSON.parse(localStorage.getItem('login'))
  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
  }

  const cookies = new Cookies()

  useEffect(() => {
    // AES알고리즘 사용 복호화
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
    //인코딩, 문자열로 변환, JSON 변환
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    const accessToken = decrypted.token

    axios({
      url: '/api/getWorkSpace',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      setWorkspacelist(res.data)
    })
  }, [])

  return (
    <div style={props}>
      {workspacelist.map((data) => {
        return (
          <CCardBody
            key={data.url}
            onClick={() => {
              const date = new Date()
              cookies.set('url', data.url, {
                path: '/',
                expires: date.setHours(date.getHours + 8),
                sameSite: 'strict',
              })
              navigate(`/ws/${data.url}/dashboard`)
            }}
          >
            <CWidgetStatsF
              className="mb-3"
              color="dark"
              icon={<CIcon icon={icon.cibGithub} height={24} />}
              padding={false}
              title={' (momoco.kr/ws/' + data.url + ')'}
              value={data.space_name + ' (' + data.start_date + '~ ' + data.end_date + ')'}
            />
          </CCardBody>
        )
      })}
    </div>
  )
}

export default WorkSpaceListItem

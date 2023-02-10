import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardFooter,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import CryptoJS from 'crypto-js'

import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { PRIMARY_KEY } from '../oauth'

const WorkSpaceListItem = () => {
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate()

  const login = JSON.parse(localStorage.getItem('login'))

  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
  }

  useEffect(() => {

    // AES알고리즘 사용 복호화 
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem("token"), PRIMARY_KEY);
    //인코딩, 문자열로 변환, JSON 변환
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    
    const accessToken = decrypted.token;

    axios({
      url: 'api/getWorkSpace',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      data: params,
    }).then((res) => {
      setWorkspacelist(res.data)
    })
  }, [])

  return (
    <>
      {workspacelist.map((data, idx) => {
        return (
          <div
            key={data.url}
            onClick={() => {
              navigate(`/ws/${data.url}/dashboard`)
            }}
          >
            <br />
            <CRow xs={6}>
              <CWidgetStatsF
                className="mb-3"
                color="dark"
                icon={<CIcon icon={icon.cibGithub} height={24} />}
                padding={false}
                title={data.space_name}
                value="89.9%"
              />
            </CRow>
          </div> 
        )
      })}
    </>
  )
}

export default WorkSpaceListItem
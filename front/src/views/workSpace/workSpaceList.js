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
import RegAndLoginHeader from 'src/components/RegAndLoginHeader'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import momocologo from 'src/assets/images/momocologo.png'
import { map } from 'jquery'
import styled from 'styled-components'
import WorkSpaceListItem from 'src/components/WorkSpaceListItem'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../../oauth'

const workSpaceList = () => {
  const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 10%,
        rgba(20, 20, 20, 0.7) 70%,
        rgba(20, 20, 20, 1)
      ),
      url(https://source.unsplash.com/random/1920x1080);
    background-size: cover;
  `
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
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      method: 'POST',
      data: params,
    }).then((res) => {
      setWorkspacelist(res.data)
    })

    console.log(workspacelist)
  }, [])

  return (
    <>
      <div className="min-vh-100 align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>
                      <strong>{params.nickname}`s WorkSpace </strong>
                    </h2>
                    <WorkSpaceListItem />
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default workSpaceList

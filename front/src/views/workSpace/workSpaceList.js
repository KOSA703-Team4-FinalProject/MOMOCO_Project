import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CForm, CRow } from '@coreui/react'
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
import { fontSize } from '@mui/system'

const workSpaceList = () => {
  const Container = styled.div`
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 10%,
        rgba(20, 20, 20, 0.7) 70%,
        rgba(20, 20, 20, 1)
      ),
      url(https://picsum.photos/1920/1080/?blur=2​);
    background-size: cover;
  `
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate()

  const login = JSON.parse(localStorage.getItem('login'))

  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
  }

  return (
    <Container>
      <div className="min-vh-100 d-flex align-items-center justify-content-center ">
        <CRow>
          <CCol md={12}>
            <CCardGroup>
              <CCard className="my-5">
                <CCardBody>
                  <CForm>
                    <h2>
                      <strong>
                        <CRow>
                          <CCol xs="auto" className="me-auto ps-4">
                            {params.nickname}`s WorkSpace{' '}
                          </CCol>
                          <CCol xs="auto" className="me-auto">
                            <a
                              style={{ color: 'black', fontSize: '20px' }}
                              href="https://github.com/settings/profile"
                            >
                              {'    '}
                              <CIcon icon={icon.cibGithub} height={24}></CIcon>
                              깃허브 마이페이지
                            </a>
                          </CCol>
                        </CRow>
                      </strong>
                    </h2>
                    <br />
                    <WorkSpaceListItem width="600px" />
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </Container>
  )
}

export default workSpaceList

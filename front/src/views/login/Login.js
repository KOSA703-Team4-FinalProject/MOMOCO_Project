import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import axios from 'axios'

import RegAndLoginHeader from 'src/components/RegAndLoginHeader'
import {
  CALLBACK_URL,
  CLIENT_ID,
  GITHUB_AUTH_CODE_SERVER,
} from "../../oauth.js";


const Login = () => {
  const navigate = useNavigate(); 

  // 로그인
  const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?client_id=${CLIENT_ID}&redirect_url=${CALLBACK_URL}`;

  return (
    <>
      <RegAndLoginHeader />
      {/* 로그인 헤더 */}
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>로그인</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* 로그인 버튼 */}
                        <a color="primary" className="px-4" href={AUTHORIZATION_CODE_URL}>
                          Login
                        </a>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          비밀번호 찾기
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        회원가입
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default Login

import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'

import { CALLBACK_URL, CLIENT_ID, GITHUB_AUTH_CODE_SERVER } from '../../oauth.js'

const Login = () => {
  const mybutton = {
    'background-color': '#0320fd',
    color: '#ffffff',
    padding: '10px 30px',
    'border-radius': '10px',
    'text-decoration': 'none',
    'font-size': '20px',
  }

  const navigate = useNavigate()
  const cookies = new Cookies()

  // 로그인
  const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?scope=repo read:org gist user user:email project&client_id=${CLIENT_ID}&redirect_url=${CALLBACK_URL}`

  useEffect(()=>{
    cookies.remove('url', { sameSite: 'strict', path: '/' })
    cookies.remove('u_idx', { sameSite: 'strict', path: '/' })
  }, [])

  return (
    <>
      <div className="min-vh-100 d-flex flex-row align-items-center">
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
                      <CCol xs={12} >
                        {/* 로그인 버튼 */}
                        <div className='mt-4' align="center">
                          <a
                            color="primary"
                            className="px-4"
                            href={AUTHORIZATION_CODE_URL}
                            style={mybutton}
                          >
                            Login
                          </a>
                        </div>
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
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>
                      회원가입
                    </CButton>
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

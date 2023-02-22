import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CCol, CRow } from '@coreui/react'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'

import { CALLBACK_URL, CLIENT_ID, GITHUB_AUTH_CODE_SERVER } from '../../oauth.js'
import momocologo from 'src/assets/images/momocologo.png'
import CIcon from '@coreui/icons-react'
import { cibGithub } from '@coreui/icons'

const Login = () => {
  const mybutton = {
    'background-color': 'black',
    color: 'white',
    padding: '10px 30px',
    'border-radius': '10px',
    'text-decoration': 'none',
    'font-size': '20px',
  }

  const navigate = useNavigate()
  const cookies = new Cookies()

  // 로그인
  const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?scope=repo read:org gist user user:email project&client_id=${CLIENT_ID}&redirect_url=${CALLBACK_URL}`

  useEffect(() => {
    cookies.remove('url', { sameSite: 'strict', path: '/' })
    cookies.remove('u_idx', { sameSite: 'strict', path: '/' })
  }, [])

  return (
    <div className="md-12 min-vh-100 align-items-center mt-5 pt-5">
      <CRow md={12} className="justify-content-center">
        <CCol>
          <CCardGroup>
            <CCard md={6} className="p-4">
              <CCardBody>
                <div align="center" className="mt-5">
                  <h2>
                    <strong>로그인</strong>
                  </h2>
                  <p className="text-medium-emphasis">Sign In to your account</p>
                </div>
                <CRow className="mt-5 pt-5">
                  <CCol xs={12}>
                    {/* 로그인 버튼 */}
                    <div className="mt-4" align="center">
                      <a
                        color="primary"
                        className="px-4"
                        href={AUTHORIZATION_CODE_URL}
                        style={mybutton}
                      >
                        <CIcon icon={cibGithub} size="xl" className="me-2" />
                        GiteHub으로 로그인
                      </a>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard md={6} className="text-black bg-light py-5">
              <CCardBody className="text-center">
                <CCol md={12}>
                  <h2>모두 모여 코딩!</h2>

                  <p></p>
                  <p></p>

                  <p>모모코를 통해 팀프로젝트를 쉽게 관리해보세요</p>
                  <p></p>
                  <img src={momocologo} />
                </CCol>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </div>
  )
}

export default Login

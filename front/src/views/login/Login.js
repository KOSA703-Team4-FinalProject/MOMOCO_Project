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
    <>
      <div className="min-vh-100 d-flex flex-row align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody className="mt-4">
                  <div align="center" className='mt-5'>
                    <h2>
                      <strong>로그인</strong>
                    </h2>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                  </div>
                  <CRow className='mt-5 pt-5'>
                    <CCol xs={12}>
                      {/* 로그인 버튼 */}
                      <div className="mt-4" align="center">
                        <a
                          color="primary"
                          className="px-4"
                          href={AUTHORIZATION_CODE_URL}
                          style={mybutton}
                        >
                          <CIcon icon={cibGithub} size="xl" className='me-2' />
                          GiteHub으로 로그인
                        </a>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard className="text-black bg-light pb-1 px-2" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={momocologo} />
                    <h2>
                      <strong>모모코</strong>
                    </h2>
                    <p>
                      워크스페이스 참여하여 프로젝트를 완수해보세요! 모모코는 프로젝트 수행시
                      커뮤니케이션을 돕는 협업툴입니다. 팀원이 보낸 협업에 참여해 새로운 경험을
                      해보세요.
                    </p>
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

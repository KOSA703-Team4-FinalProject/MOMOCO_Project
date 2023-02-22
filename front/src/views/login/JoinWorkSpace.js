import { CButton, CCard, CCardBody, CCardGroup, CCol, CRow } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { CALLBACK_URL, CLIENT_ID, GITHUB_AUTH_CODE_SERVER } from '../../oauth.js'
import momocologo from 'src/assets/images/momocologo.png'




const JoinWorkSpace = () => {
  // 로그인
  const AUTHORIZATION_CODE_URL = `${GITHUB_AUTH_CODE_SERVER}?scope=repo read:org gist user user:email project&client_id=${CLIENT_ID}&redirect_url=${CALLBACK_URL}`

  const params = useParams()

  useEffect(() => {

    localStorage.setItem('workName', params.workspaceName)

  }, [])

  //참여 버튼 클릭
  const clickbtn = () => {
    const atag = document.createElement('a')

    atag.href = AUTHORIZATION_CODE_URL
    atag.click()
  }

  return (
    <div>
      <div className="md-12 min-vh-100 align-items-center mt-4 pt-5">
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCardGroup>
              <CCard className="py-4" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={momocologo} />

                    <h1 className="mt-5">
                      <strong>{params.workspaceName}</strong> WorkSpace Join
                    </h1>
                    <h5 className="pt-4">
                      <strong>{params.workspaceName}</strong>에 참여하여 프로젝트를 완수해보세요!
                      <br />
                      모모코는 프로젝트 수행시 커뮤니케이션을 돕는 협업툴입니다.
                      <br />
                      <strong>{params.admin}</strong>가 보낸 협업에 참여해 새로운 경험을 해보세요.
                    </h5>
                    <CButton className="mt-4" size="lg" onClick={clickbtn}>
                      {params.workspaceName}에 참여하기
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default JoinWorkSpace

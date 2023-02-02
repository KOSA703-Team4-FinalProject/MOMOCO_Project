import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import RegAndLoginHeader from 'src/components/RegAndLoginHeader'

const workSpace = () => {
  return (
    <>
      <RegAndLoginHeader />
      {/* 로그인 헤더 */}
      <div className="min-vh-100 align-items-center">
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>워크스페이스 만들기</h2>
                    <p className="text-medium-emphasis my-1">
                      깃허브의 프로젝트와 연동된 워크스페이스를 만드세요.
                    </p>
                    <CInputGroup className="mb-4 my-5">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput placeholder="워크스페이스 이름" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLinkBroken} />
                      </CInputGroupText>
                      <CFormInput type="text" placeholder="momoco.kr/워크스페이스 주소" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="불러온 github 레파지토리 이름"
                        readOnly
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol align="end">
                        <CButton className="mx-1" color="primary" shape="rounded-pill">
                          만들기
                        </CButton>
                        <CButton className="mx-1" color="dark" shape="rounded-pill">
                          레파지토리 변경
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '30%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p></p>
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

export default workSpace

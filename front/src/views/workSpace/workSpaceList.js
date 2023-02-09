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
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import momocologo from 'src/assets/images/momocologo.png'

const workSpaceList = () => {

  return (
    <>
      
      <div className="min-vh-100 align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2><strong>WorkSpace List</strong></h2>
                    <p className="text-medium-emphasis my-1">
                      깃허브의 레파지토리와 연동된 모모코의 워크스페이스입니다.
                    </p>
                    <CInputGroup className="mb-4 my-5">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput
                        value={space_Name}
                        placeholder="워크스페이스 이름"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLinkBroken} />
                      </CInputGroupText>
                      <CFormInput
                        value={url}
                        onChange={URLHandler}
                        type="text"
                        placeholder="momoco.kr/워크스페이스 주소"
                        required
                      />
                      {check !== '사용 가능' ? (
                        <CButton
                          type="button"
                          className="mx-1"
                          color="warning"
                          shape="rounded-pill"
                          onClick={Check}
                        >
                          중복 확인
                        </CButton>
                      ) : (
                        <CButton
                          type="button"
                          className="mx-1"
                          color="primary"
                          shape="rounded-pill"
                          disabled
                        >
                          <BsFillCheckCircleFill />
                        </CButton>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput
                        value={linked_Repo}
                        onChange={REPOHandler}
                        type="text"
                        placeholder="불러온 github 레파지토리 이름"
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol md={6}>
                        <CFormInput
                          value={start_Date}
                          onChange={StartDateHandler}
                          type="date"
                          id="startdate"
                          floatingLabel="프로젝트 시작일"
                          required
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          value={end_Date}
                          onChange={EndDateHandler}
                          type="date"
                          id="enddate"
                          floatingLabel="프로젝트 종료일"
                          required
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol align="end" className="pt-4">
                        {check === '사용 가능' ? (
                          <CButton
                            type="submit"
                            className="mx-1"
                            color="primary"
                            shape="rounded-pill"
                          >
                            만들기
                          </CButton>
                        ) : (
                          <CButton
                            type="submit"
                            className="mx-1"
                            color="primary"
                            shape="rounded-pill"
                            disabled
                          >
                            만들기
                          </CButton>
                        )}
                        <CButton className="mx-1" color="dark" shape="rounded-pill">
                          레파지토리 변경
                        </CButton>
                      </CCol>
                    </CRow>
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

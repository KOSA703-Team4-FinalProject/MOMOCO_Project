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

const workSpace = () => {
  const [space_Name, SetSpace_Name] = useState('')
  const [url, SetUrl] = useState('')
  const [linked_Repo, SetLinked_Repo] = useState('')
  const [start_Date, SetStart_Date] = useState('')
  const [end_Date, SetEnd_Date] = useState('')
  const admin = 80095068
  const [check, SetCheck] = useState('')

  const spaceNameHandler = (e) => {
    e.preventDefault()
    SetSpace_Name(e.target.value)
  }

  const URLHandler = (e) => {
    e.preventDefault()
    SetUrl(e.target.value)
  }

  const REPOHandler = (e) => {
    e.preventDefault()
    SetLinked_Repo(e.target.value)
  }

  const StartDateHandler = (e) => {
    e.preventDefault()
    SetStart_Date(e.target.value)
  }

  const EndDateHandler = (e) => {
    e.preventDefault()
    SetEnd_Date(e.target.value)
  }

  const login = JSON.parse(localStorage.getItem('login'))
  const idx = login.u_idx
  const Navigate = useNavigate()
  console.log(idx)

  const Check = (e) => {
    let send = {
      url: url,
    }
    axios.post('api/isDomain', send).then((data) => {
      console.log(data.data)
      if (data.data == 1) {
        SetCheck('사용 불가')
      }
      if (data.data != 1) {
        SetCheck('사용 가능')
      }
    })
  }

  const SubmitHandler = (e) => {
    e.preventDefault()

    let makeWorkSpace = {
      url: url,
      space_name: space_Name,
      linked_repo: linked_Repo,
      start_date: start_Date,
      end_date: end_Date,
      admin: idx,
    }
    console.log(makeWorkSpace)

    axios.post('api/makeWorkSpace', makeWorkSpace).then((data) => {
      if ((data = 1)) {
        alert('워크스페이스가 생성되었습니다')
        navigate('/' + url)
      }
      if (data != 1) {
        alert('워크스페이스 생성 실패')
      }
    })
  }

  return (
    <>
      <RegAndLoginHeader />
      {/* 로그인 헤더 */}
      <div className="min-vh-100 align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={SubmitHandler}>
                    <h2>워크스페이스 만들기</h2>
                    <p className="text-medium-emphasis my-1">
                      깃허브의 레파지토리와 연동된 모모코의 워크스페이스를 만드세요.
                    </p>
                    <CInputGroup className="mb-4 my-5">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput
                        value={space_Name}
                        onChange={spaceNameHandler}
                        placeholder="워크스페이스 이름"
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
                      />
                      <CButton
                        type="button"
                        className="mx-1"
                        color="warning"
                        shape="rounded-pill"
                        onClick={Check}
                      >
                        중복확인
                      </CButton>
                      {check}
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
                        />
                      </CCol>
                      <CCol md={6}>
                        <CFormInput
                          value={end_Date}
                          onChange={EndDateHandler}
                          type="date"
                          id="enddate"
                          floatingLabel="프로젝트 종료일"
                        />
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol align="end" className="pt-4">
                        <CButton
                          type="submit"
                          className="mx-1"
                          color="primary"
                          shape="rounded-pill"
                        >
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
                    <h2>모두 모여 코딩!</h2>

                    <p></p>
                    <p></p>

                    <p>모모코를 통해 팀프로젝트를 쉽게 관리해보세요</p>
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

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

const workSpace = () => {
  const [space_Name, SetSpace_Name] = useState('')
  const [url, SetUrl] = useState('')
  const [linked_Repo, SetLinked_Repo] = useState('')
  const [start_Date, SetStart_Date] = useState('')
  const [end_Date, SetEnd_Date] = useState('')
  const [check, SetCheck] = useState('')

  const spaceNameHandler = (e) => {
    e.preventDefault()
    SetSpace_Name(e.target.value)
  }

  const URLHandler = (e) => {
    e.preventDefault()
    SetUrl(e.target.value)
    SetCheck('')
    console.log({ check })
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
  const admin = login.u_idx
  const Navigate = useNavigate()

  const Check = (e) => {
    e.preventDefault()
    let send = {
      url: url,
    }

    if (url != '') {
      axios.post('api/isDomain', send).then((data) => {
        if (data.data == 1) {
          SetCheck('사용 불가')
          alert('이미 사용 중인 주소입니다')
        } else {
          SetCheck('사용 가능')
          alert('사용 가능한 주소입니다')
        }
      })
    } else {
      alert('주소를 입력하세요')
    }
  }

  const SubmitHandler = (e) => {
    e.preventDefault()

    let makeWorkSpace = {
      url: url,
      space_name: space_Name,
      linked_repo: linked_Repo,
      start_date: start_Date,
      end_date: end_Date,
      admin: admin,
    }
    console.log(makeWorkSpace)

    if (check === '사용 가능') {
      axios.post('api/makeWorkSpace', makeWorkSpace).then((data) => {
        console.log(data)
        if (data.data == 1) {
          alert('워크스페이스가 생성되었습니다')
          Navigate('/ws/' + url + '/dashboard')
        }
        if (data.data != 1) {
          alert('워크스페이스 생성 실패')
        }
      })
    } else if (new Date(start_Date) > new Date(end_Date)) {
      alert('프로젝트 날짜가 잘못되었습니다')
    } else {
      alert('중복확인을 해주세요')
    }
  }

  return (
    <>
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
                          <>
                            <strong>중복 체크 필요</strong>
                            <CButton
                              type="submit"
                              className="mx-1"
                              color="primary"
                              shape="rounded-pill"
                              disabled
                            >
                              만들기
                            </CButton>
                          </>
                        )}
                        <CButton className="mx-1" color="dark" shape="rounded-pill">
                          레파지토리 변경
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-black bg-light py-5" style={{ width: '30%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>모두 모여 코딩!</h2>

                    <p></p>
                    <p></p>

                    <p>모모코를 통해 팀프로젝트를 쉽게 관리해보세요</p>
                    <img src={momocologo} />
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

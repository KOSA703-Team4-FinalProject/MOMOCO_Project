import React, { useEffect, useRef } from 'react'
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import momocologo from 'src/assets/images/momocologo.png'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import { Date } from 'core-js'
import { Octokit } from 'octokit'
import Swal from 'sweetalert2'
import $ from 'jquery'
import { async } from 'regenerator-runtime'

const workSpace = () => {
  const [space_Name, SetSpace_Name] = useState('')
  const [url, SetUrl] = useState('')
  const [linked_Repo, SetLinked_Repo] = useState('')
  const [owner, setOwner] = useState('')
  const [profile, setProfile] = useState('')
  const [start_Date, SetStart_Date] = useState(new Date())
  const [end_Date, SetEnd_Date] = useState(new Date())
  const [check, SetCheck] = useState('')
  const [repListModal, setRepListModal] = useState(false)
  const [repList, setRepList] = useState([])
  const [mailModal, setMailModal] = useState(false)
  const [memList, setMemList] = useState([])
  const [mailMember, setMailMember] = useState([])
  const [sendMail, setSendMail] = useState('')

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const orgRef = useRef()

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

  const StartDateHandler = (e) => {
    e.preventDefault()
    SetStart_Date(e.target.value)
  }

  const EndDateHandler = (e) => {
    e.preventDefault()
    console.log(start_Date)
    SetEnd_Date(e.target.value)
  }
  useEffect(() => {
    if (start_Date > end_Date) {
      alert('종료일은 시작일보다 우선될 수 없습니다')
    }
  }, [end_Date])

  const login = JSON.parse(localStorage.getItem('login'))
  const admin = login.u_idx
  const Navigate = useNavigate()

  const Check = (e) => {
    e.preventDefault()
    let send = {
      url: url,
    }

    if (url != '') {
      axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: '/api/isDomain',
        data: send,
      }).then((data) => {
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
      owner: owner,
      ownerphoto: profile,
      start_date: start_Date,
      end_date: end_Date,
      admin: admin,
    }
    console.log(makeWorkSpace)

    if (check === '사용 가능') {
      axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        url: '/api/makeWorkSpace',
        data: makeWorkSpace,
      }).then((data) => {
        console.log(data)
        if (data.data == 1) {
          alert('워크스페이스가 생성되었습니다')
          Navigate('/ws/' + url + '/dashboard')
        }
        if (data.data != 1) {
          alert('워크스페이스 생성 실패')
        }
      })
    } else {
      alert('중복확인을 해주세요')
    }
  }

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  //GitHub에서 워크스페이스 불러오기
  const getWorkSpace = async () => {
    await octokit
      .request('GET /orgs/{org}/repos', {
        org: orgRef.current.value,
      })
      .then((res) => {

        console.log(res.data)

        res.data.map((data) => {
          setRepList((repList) => [...repList, data])
        })

        setRepListModal(!repListModal)
      })
      .catch((error) => {
        Swal.fire(
          '다시 시도해 주세요!',
          orgRef.current.value + ' 팀의 레파지토리를 찾을 수 없습니다.',
          'warning',
        )
      })

    await octokit
      .request('GET /users/{username}/repos', {
        username: login.nickname,
      })
      .then((res) => {
        res.data.map((data) => {
          setRepList((repList) => [...repList, data])
        })
      })
  }

  //레포지토리 선택
  const clickRepo = (e) => {
    const repo = e.target
    const repoName = $(repo).closest('.repo').attr('value')
    const owner1 = $(repo).closest('.repo').attr('owner')
    const profile1 = $(repo).closest('.repo').attr('profile')

    //해당하는 레포지토리가 db 워크스페이스에 있는지 없는지 여부 확인
    axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/isRepo',
      params: { linked_repo: repoName },
    }).then(async (res) => {
      if (res.data == 0) {
        SetLinked_Repo(repoName)
        setOwner(owner1)
        setProfile(profile1)
        setRepListModal(false)
        setMailModal(true)

        //팀원 조회
        await octokit
          .request('GET /repos/{org}/{repo}/collaborators', {
            org: orgRef.current.value,
            repo: repoName,
          })
          .then((res) => {
            console.log(res.data)

            res.data.map((mem) => {
              if (mem.login != login.nickname) {
                setMemList((memList) => [...memList, mem])
              }
            })
          })
      } else {
        SetLinked_Repo('')
        Swal.fire('다시 선택해주세요', '이미 존재하는 Repository입니다.', 'warning')
      }
    })
  }

  //메일 보낼 팀원 이메일 추가
  const clickMember = (e) => {
    const profile = e.target
    const pro = $(profile).closest('.profile')
    const ch = $(pro).find('.memEmail').val()

    const name = $(profile).attr('value')
    const u_idx = $(profile).attr('u_idx')

    setMailMember((mailMember) => [...mailMember, name])
    setSendMail((sendMail) => sendMail + ',' + ch)
  }

  //메일 전송
  const clickMail = (e) => {
    axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/sendEmailMem',
      params: { email: sendMail, admin: login.nickname, url: url },
    }).then(()=>{
      Swal.fire('', '메일 전송이 완료되었습니다.', 'success')
      setMailModal(false)
    }).catch(()=>{
      Swal.fire('Error', '메일 전송이 실패하였습니다.<br /> 해당 메일을 복사해 전달하세요<br /> http://192.168.0.30:3000/joinWorkSpace/'+url+'/'+login.nickname, 'warning')
      setMailModal(false)
    })
      .then(() => {
        Swal.fire('', '메일 전송이 완료되었습니다.', 'success')
        setMailModal(false)
      })
      .catch(() => {
        Swal.fire(
          'Error',
          '메일 전송이 실패하였습니다.<br /> 해당 메일을 복사해 전달하세요<br /> http://192.168.0.30:3000/joinWorkSpace/' +
            space_Name +
            '/' +
            login.nickname,
          'warning',
        )
        setMailModal(false)
      })
  }

  return (
    <div className="md-12 min-vh-100 align-items-center mt-5 pt-5">
      <CRow md={12} className="justify-content-center">
        <CCol>
          <CCardGroup>
            <CCard md={6} className="p-4">
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
                      type="text"
                      placeholder="GitHub의 조직 이름"
                      ref={orgRef}
                      required
                    />
                    <CButton
                      type="button"
                      className="mx-2"
                      color="warning"
                      shape="rounded-pill"
                      onClick={getWorkSpace}
                    >
                      불러오기
                    </CButton>
                  </CInputGroup>
                  {linked_Repo == '' ? (
                    <></>
                  ) : (
                    <CRow className="mb-4">
                      <div className="col-4">
                        <strong>연결될 Repository</strong>
                      </div>
                      <CCol className="mx-2"> {linked_Repo}</CCol>
                    </CRow>
                  )}
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
                      {check === '사용 가능' && start_Date < end_Date ? (
                        <>
                          <CButton
                            type="submit"
                            className="mx-1"
                            color="primary"
                            shape="rounded-pill"
                          >
                            만들기
                          </CButton>
                        </>
                      ) : (
                        <>
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
          <CModal
            backdrop="static"
            alignment="center"
            scrollable
            visible={repListModal}
            onClose={() => setRepListModal(false)}
          >
            <CModalHeader onClose={() => setRepListModal(false)}>
              <CModalTitle>Repository List</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {repList.map((repo) => {
                return (
                  <CCard
                    className="m-2 p-3 repo"
                    key={repo.id}
                    onClick={clickRepo}
                    value={repo.name}
                    owner={repo.owner.login}
                    profile={repo.owner.avatar_url}
                  >
                    <div className="row">
                      <div className="col-4">
                        <img
                          className="mt-3"
                          style={{ width: '100%', hegith: 'auto' }}
                          src={repo.owner.avatar_url}
                        />
                      </div>
                      <div className="col-8">
                        <h3>
                          <strong>{repo.name}</strong>
                        </h3>
                        <p className="mt-3">생성 : {repo.created_at}</p>
                        <p>업데이트 : {repo.updated_at}</p>
                      </div>
                    </div>
                  </CCard>
                )
              })}
            </CModalBody>
          </CModal>
          <CModal
            backdrop="static"
            scrollable
            alignment="center"
            visible={mailModal}
            onClose={() => setMailModal(false)}
          >
            <CModalHeader>팀원 추가</CModalHeader>
            <CModalBody>
              <div className="row justify-content-evenly">
                {memList.map((data) => {
                  return (
                    <div className="col-12 m-2 profile" key={data.login}>
                      <CCard className="mt-2 p-2">
                        <div className="row justify-content-center">
                          <div className="col-4 mt-1">
                            <strong>{data.login}</strong>
                          </div>
                          <div className="col-5">
                            <CFormInput type="email" className="memEmail" />
                          </div>
                          <div className="col-3">
                            <CButton
                              align="end"
                              color="primary"
                              variant="outline"
                              value={data.login}
                              u_idx={data.u_idx}
                              onClick={clickMember}
                            >
                              추가
                            </CButton>
                          </div>
                        </div>
                      </CCard>
                    </div>
                  )
                })}
              </div>
            </CModalBody>
            <hr />
            <CModalBody>
              <div className="row justify-content-evenly">
                <div className="col-8">
                  초대 멤버 :{' '}
                  {mailMember.map((res) => {
                    return res + ' '
                  })}
                </div>
                <div className="col-3">
                  <CButton color="primary" variant="outline" onClick={clickMail}>
                    확인
                  </CButton>
                </div>
              </div>
            </CModalBody>
          </CModal>
        </CCol>
      </CRow>
    </div>
  )
}

export default workSpace

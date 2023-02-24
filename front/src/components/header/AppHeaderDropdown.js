import React from 'react'
import {
  CButton,
  CCard,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
} from '@coreui/react'
import { cilExitToApp, cilLockLocked, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Octokit } from 'octokit'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import Swal from 'sweetalert2'

import { PRIMARY_KEY } from '../../oauth'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const params = useParams()

  const login = JSON.parse(localStorage.getItem('login'))

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const logout = () => {
    window.localStorage.clear()
    navigate('/')
  }

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  const [inviteView, setInviteView] = useState(false) //팀원 초대 모달 true / false
  const [axiosRe, setAxiosRe] = useState(false) //팀원 불러오기 비동기 작업 끝났는지 여부
  const [memberList, setMemberList] = useState([]) //팀원 리스트
  const [mailMember, setMailMember] = useState([]) //뷰에 뿌릴 초대될 멤버
  const [sendMail, setSendMail] = useState('') //비동기로 전달할 멤버

  //워크스페이스 정보 불러오기
  const loadWorkSpace = () => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      getMemberList(res.data)
      setInviteView(true)
    })
  }

  //github에서 팀원 정보 불러오기
  const getMemberList = async (data) => {
    //깃헙 상 연결된 레파지토리 이름
    const repos = data.linked_repo
    //레파지토리 주인
    const owner = data.owner

    await octokit
      .request('GET /repos/{org}/{repo}/collaborators', {
        org: owner,
        repo: repos,
      })
      .then((res) => {
        setMemberList((prev) => res.data)
        setAxiosRe(true)
      })
  }

  //멤버 초대에서 멤버 클릭
  const clickMember = (e) => {
    const profile = e.target
    const pro = $(profile).closest('.profile')
    const ch = $(pro).find('.memEmail').val()

    const name = $(profile).attr('value')
    const u_idx = $(profile).attr('u_idx')

    setMailMember((mailMember) => [...mailMember, name])
    setSendMail((sendMail) => sendMail + ',' + ch)
  }

  //메일 보낼 팀원 이메일 추가
  const clickMail = (e) => {
    axios({
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: '/api/sendEmailMem',
      params: { email: sendMail, admin: login.nickname, url: url },
    })
      .then(() => {
        Swal.fire('', '메일 전송이 완료되었습니다.', 'success')
        setMailModal(false)
      })
      .catch(() => {
        Swal.fire(
          'Error',
          '메일 전송이 실패하였습니다.<br /> 해당 메일을 복사해 전달하세요<br /> http://localhost:3000/joinWorkSpace/' +
            url +
            '/' +
            login.nickname,
          'warning',
        )
        setMailModal(false)
      })
      .then(() => {
        Swal.fire('', '메일 전송이 완료되었습니다.', 'success')
        setMailModal(false)
      })
      .catch(() => {
        Swal.fire(
          'Error',
          '메일 전송이 실패하였습니다.<br /> 해당 메일을 복사해 전달하세요<br /> http://localhost:3000/joinWorkSpace/' +
            space_Name +
            '/' +
            login.nickname,
          'warning',
        )
        setMailModal(false)
      })
  }

  // 모모코 회원 탈퇴
  const leaveMoMoCo = () => {
    Swal.fire({
      title: '정말로 momoco를 탈퇴하시겠습니까?',
      text: '3일 뒤 모든 데이터가 삭제됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
      reverseButtons: true, // 버튼 순서 거꾸로
    }).then((result) => {
      if (result.isConfirmed) {
        
        Swal.fire('탈퇴 완료', 'momoco에서 탈퇴되었습니다', 'success')

        axios({
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          url: '/backlogin/leaveMember',
          params: { u_idx: login.u_idx },
        }).then((res) => {
          console.log(res.data)
        })
      }
    })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <p className="mt-2">
          <strong>{login.nickname}</strong>
        </p>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={loadWorkSpace} className="my-1">
          <CIcon icon={cilPeople} className="me-2" />
          팀원 초대
        </CDropdownItem>
        <CDropdownItem onClick={logout} className="my-1">
          <CIcon icon={cilLockLocked} className="me-2" />
          로그아웃
        </CDropdownItem>
        <CDropdownItem onClick={leaveMoMoCo} className="my-1">
          <CIcon icon={cilExitToApp} className="me-2" />
          모모코 탈퇴
        </CDropdownItem>
      </CDropdownMenu>

      <CModal
        backdrop="static"
        scrollable
        alignment="center"
        visible={inviteView}
        onClose={() => setInviteView(false)}
      >
        <CModalHeader>팀원 추가</CModalHeader>
        <CModalBody>
          <div className="row justify-content-evenly">
            {inviteView == false ? (
              <h2>로딩 중...</h2>
            ) : (
              memberList.map((data) => {
                return (
                  <div className="col-12 m-2 profile" key={data.login}>
                    <CCard className="mt-2 p-2">
                      <div className="row justify-content-center">
                        <div className="col-4 mt-1">
                          <strong>{data.login}</strong>
                        </div>
                        <div className="col-5">
                          <CFormInput type="email" placeholder="이메일 주소" className="memEmail" />
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
              })
            )}
          </div>
        </CModalBody>
        <hr />
        <CModalBody>
          <div className="row justify-content-evenly">
            <div className="col-8">초대 멤버 : </div>
            <div className="col-3">
              <CButton color="primary" variant="outline" onClick={clickMail}>
                확인
              </CButton>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </CDropdown>
  )
}

export default AppHeaderDropdown

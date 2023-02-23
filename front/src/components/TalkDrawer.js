import { cilFolderOpen, cilImagePlus, cilInfo, cilLink } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CCard, CCloseButton, CCol, CPopover, CRow } from '@coreui/react'
import { BsPlusCircle, BsDashCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState, changeDrawerType } from 'src/store'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
import CryptoJS from 'crypto-js'
import axios from 'axios'

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'


const TalkDrawer = () => {
  const [workspaceUserList, setWorkspaceUserList] = useState([])
  const [addUserList, setAddUserList] = useState([])
  const [userListView, setUserListView] = useState(false)
  const [addUserView, setAddUserView] = useState(false)
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)

  const params = useParams()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))

  const dispatch = useDispatch()

  useEffect(() => {
    const reqData = {
      url: params.url,
      r_idx: chatRoomNumber,
    }

    //유저 목록 불러오기
    axios({
      method: 'GET',
      url: '/api/chat/userList',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: reqData,
    }).then((res) => {
      setWorkspaceUserList([])
      res.data[0].map((user) => {
        setWorkspaceUserList((workspaceUserList) => [...workspaceUserList, user])
      })
      setAddUserList([])
      res.data[1].map((user) => {
        setAddUserList((addUserList) => [...addUserList, user])
      })
      setUserListView(true)
    })
  }, [addUserView])

  const inviteMem = (e) => {

    const tar = e.target
    const tar2 = $(e.target).closest('.member').attr('value') //초대할 유저의 u_idx
    const nick = $(e.target).closest('.member').attr('nick')

    const reqData = {
      url: params.url,
      r_idx: chatRoomNumber,
      u_idx: tar2,
      nickname: nick,
    }

    axios({
      method: 'POST',
      url: '/api/chatroom/invite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res)=>{
      setAddUserView(false)
    })
    
  }

  return (
    <div>
      <div className="main2">
        <CCard className='drawerstyle'>
          <header className="pt-2 m-2 px-4">
            <CRow className='mydrawer'>
              <CCol xs="auto" className="me-auto pt-1">
                <div className="h4 col">
                  <strong>채팅방 서랍</strong>{' '}
                  <CPopover
                    title="채팅방 서랍"
                    content="채팅방의 파일, 이미지, 링크를 모아보세요."
                    placement="bottom"
                  >
                    <CIcon className="pt-1 col" icon={cilInfo} size="xl"></CIcon>
                  </CPopover>
                </div>
              </CCol>
              <CCol xs="auto" className="pt-1 me-3">
                <CCloseButton
                  onClick={() => {
                    setAddUserView(false)
                    dispatch(changeChatState('chat'))
                  }}
                />
              </CCol>
            </CRow>
          </header>
        </CCard>
        <CCard className='drawerstyle'>
          <div className="row pt-1" align="center">
            <div
              className="m-4 col"
              onClick={() => {
                dispatch(changeChatState('chat_detail'))
                dispatch(changeDrawerType('file'))
              }}
            >
              <CIcon className="ms-2" icon={cilFolderOpen} size="xl" />
              <h5 className="col">
                <strong>파일</strong>
              </h5>
            </div>
            <div
              className="m-4 col"
              onClick={() => {
                dispatch(changeChatState('chat_detail'))
                dispatch(changeDrawerType('img'))
              }}
            >
              <CIcon className="ms-2" icon={cilImagePlus} size="xl" />
              <h5 className="col">
                <strong>이미지</strong>
              </h5>
            </div>
            <div
              className="m-4 col"
              onClick={() => {
                dispatch(changeChatState('chat_detail'))
                dispatch(changeDrawerType('link'))
              }}
            >
              <CIcon className="ms-2" icon={cilLink} size="xl" />
              <h5 className="col">
                <strong>링크</strong>
              </h5>
            </div>
          </div>
        </CCard>
        <CCard className='drawerstyle'>
          <div className="m-4 ps-3 pt-1">
            <h4 align="center">
              <strong>대화 상대</strong>
            </h4>
            <hr />
            {userListView == false ? (
              <div></div>
            ) : (
              workspaceUserList.map((data) => {
                return (
                  <div className="profilebtn row pt-2 ps-2" key={data.u_idx} value={data.u_idx}>
                    <CAvatar size="xl" src={data.profilephoto} color="secondary"></CAvatar>
                    <h5 className="col pt-3">
                      <strong>{data.nickname}</strong>
                    </h5>
                  </div>
                )
              })
            )}
            <hr />
            <div
              className="row pt-2 ps-2 justify-content-center"
              onClick={() => {
                setAddUserView(!addUserView)
              }}
            >
              {addUserView == false ? (
                <h4 className="col" align="center">
                  <BsPlusCircle size="28" className="col" />{' '}
                  <strong className="pt-1">친구추가</strong>
                </h4>
              ) : (
                <h4 className="col" align="center">
                  <BsDashCircle size="28" className="col" />{' '}
                  <strong className="pt-1">닫기</strong>
                </h4>
              )}
            </div>
            {addUserView == true ? (
              addUserList.map((data) => {
                return (
                  <div className="profilebtn row pt-2 ps-2 member" key={data.u_idx} value={data.u_idx} nick={data.nickname}>
                    <CAvatar size="xl" src={data.profilephoto} color="secondary"></CAvatar>
                    <h5 className="col pt-3" onClick={inviteMem}>
                      <strong>{data.nickname}</strong>
                    </h5>
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </CCard>
      </div>
    </div>
  )
}

export default TalkDrawer

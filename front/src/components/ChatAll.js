import {
  cilArrowLeft,
  cilCommentSquare,
  cilFolderOpen,
  cilImagePlus,
  cilLibraryAdd,
  cilLink,
  cilStorage,
  cilTrash,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownItemPlain,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useCallback, useEffect, useState } from 'react'
import $ from 'jquery'

import '../scss/chatRoom.scss'
import Chat from './Chat'
import ChatRoom from './ChatRoom'
import TalkDrawer from './TalkDrawer'
import TalkDrawerDetail from './TalkDrawerDetail'

const ChatAll = () => {
  let [roomView, setRoomView] = useState(false)
  let [chatView, setChatView] = useState(false)
  let [talkDrawer, setTalkDrawer] = useState(false)
  let [drawerDetail, setDrawerDetail] = useState(false)
  let [drawerDetailType, setDrawerDetailType] = useState("")

  //채팅방 입장
  $(document).on('click', '.enterroombtn', function () {
    setChatView(true)
    setRoomView(false)
  })

  //채팅방 퇴장
  $(document).on('click', '.chatclosebtn',function(){
    setRoomView(true)
    setChatView(false)
  })

  //채팅방 서랍 열기
  $(document).on('click', '.drawerbtn', function(){
    setTalkDrawer(true)
    setChatView(false)
  })

  //채팅방 서랍 닫기
  $(document).on('click', '.talkdrawerclosebtn', function(){
    setChatView(true)
    setTalkDrawer(false)
  })

  //채팅방 서랍 세부 모아보기 닫기 버튼 클릭
  $(document).on('click', '.drawerDetailclosebtn', function(){
    setDrawerDetailType("")
    setTalkDrawer(true)
    setDrawerDetail(false)
  })

  //채팅방 서랍의 파일 모아보기 버튼 클릭 
  $(document).on('click', '.fildrawerebtn', function(){
    setDrawerDetailType("파일")
    setDrawerDetail(true)
    setTalkDrawer(false)
  })
  //채팅방 서랍의 이미지 모아보기 버튼 클릭
  $(document).on('click', '.imgdrawerebtn', function(){
    setDrawerDetailType("이미지")
    setDrawerDetail(true)
    setTalkDrawer(false)
  })
  //채팅방 서랍의 링크 모아보기 버튼 클릭
  $(document).on('click', '.linkdrawerebtn', function(){
    setDrawerDetailType("링크")
    setDrawerDetail(true)
    setTalkDrawer(false)
  })

  return (
    <div>
      <CIcon
        icon={cilCommentSquare}
        size="lg"
        onClick={() => {
          setRoomView(!roomView)
        }}
      />
      <div className="modalcontent">
        {/* 채팅방 */}
        <CModal alignment="center" visible={roomView} scrollable onClose={() => setRoomView(false)}>
          <CModalHeader>
            <CModalTitle>채팅</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <ChatRoom />
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" variant="outline" onClick={() => setRoomView(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        {/* 채팅 */}
        <CModal
          visible={chatView}
          onClose={() => {
            setChatView(false)
          }}
        >
          <CModalBody>
            <Chat />
          </CModalBody>
        </CModal>
        {/* 톡서랍 */}
        <CModal
          visible={talkDrawer}
          onClose={() => {
            setTalkDrawer(false)
          }}
        >
          <CModalBody>
            <TalkDrawer />
          </CModalBody>
        </CModal>
        {/* 이미지 톡서랍 */}
        <CModal
          visible={drawerDetail}
          onClose={() => {
            setDrawerDetail(false)
          }}
        >
          <CModalBody>
            <TalkDrawerDetail className={drawerDetailType} />
          </CModalBody>
        </CModal>
      </div>
    </div>
  )
}

export default ChatAll

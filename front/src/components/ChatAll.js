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

const ChatAll = () => {
  let [roomView, setRoomView] = useState(false)
  let [chatView, setChatView] = useState(false)

  //채팅방 입장
  $(document).on('click', '.enterroombtn', function () {
    console.log('haha')
    setChatView(true)
    setRoomView(false)
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
      </div>
    </div>
  )
}

export default ChatAll

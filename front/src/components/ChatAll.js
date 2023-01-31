import { cilCommentSquare, cilLibraryAdd, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CDropdown, CDropdownMenu, CDropdownToggle, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { changechatRoomView, changeChatView } from 'src/store'

import '../scss/chatRoom.scss'
import Chat from './Chat'
import ChatRoom from './ChatRoom'

const ChatAll = () => {
  const dispatch = useDispatch()
  //채팅방 상태
  let chatRoomView = useSelector((state) => state.chatRoomView)
  //채팅 상태
  let chatView = useSelector((state) => state.chatView)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={chatRoomView}>
        <CIcon
          icon={cilCommentSquare}
          size="lg"
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <div></div>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default ChatAll

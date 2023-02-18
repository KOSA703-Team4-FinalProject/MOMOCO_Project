import { cilCommentSquare } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import $ from 'jquery'

import '../scss/chatRoom.scss'
import { useDispatch, useSelector } from 'react-redux'
import ChatRoom from './ChatRoom'
import Chat from './Chat'
import TalkDrawer from './TalkDrawer'
import TalkDrawerDetail from './TalkDrawerDetail'

const ChatAll = (props) => {
  let chatstate = useSelector((state) => state.chatState)

  let stomp = props.stomp

  return (
    <>
      {
        chatstate === 'none'
        ? <div></div>
        : (
          chatstate === 'chatroom'
          ? <ChatRoom />
          : (
            chatstate === 'chat'
            ? <Chat stomp={stomp} />
            : (
              chatstate === 'chat_drawer'
              ? <div><TalkDrawer /></div>
              : <div><TalkDrawerDetail /></div>
            )
          )
        )
      }
    </>
  )
}

export default ChatAll

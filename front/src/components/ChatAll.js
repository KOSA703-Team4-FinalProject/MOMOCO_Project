import { cilCommentSquare } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import $ from 'jquery'

import '../scss/chatRoom.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatView, changeRoomView } from 'src/store'

const ChatAll = () => {
  const dispatch = useDispatch()
  let room = useSelector((state) => state.roomView)

  //채팅 입장
  $(document).on('click', '.enterroombtn', function () {
    dispatch( changeChatView(true) )
    dispatch( changeRoomView(false) )
  })

  return (
    <div>
      <CIcon
        icon={cilCommentSquare}
        size="lg"
        onClick={() => {
          dispatch(changeRoomView(!room))
        }}
      />
    </div>
  )
}

export default ChatAll

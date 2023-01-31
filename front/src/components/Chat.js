import {
  cilAccountLogout,
  cilArrowLeft,
  cilDelete,
  cilFolderOpen,
  cilImagePlus,
  cilLink,
  cilList,
  cilNotes,
  cilStorage,
  cilXCircle,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CPopover } from '@coreui/react'
import $ from 'jquery'

import '../scss/chatRoom.scss'

const Chat = () => {
  //채팅 전송 버튼 클릭
  $(document).on('click', '.sendbtn', function () {
    $('.inputmessage').val('')
  })

  return (
    <main>
      <header>
        <div className="row justify-content-between">
          <div className="col-md-8">
            <div className="row">
              <CIcon icon={cilArrowLeft} size="3xl" className="chatclosebtn pt-1"></CIcon>
              <h5 className="chat-room col pt-2 mt-2">
                <strong>기본채팅방입니다하세요</strong>
              </h5>
            </div>
          </div>
          <div className="col-md-2 pt-2 mt-1">
            <CIcon className="drawerbtn" icon={cilStorage} size="xxl" />
          </div>
        </div>
      </header>
      <ul className="chat">
        <li className="you">
          <div className="entete">
            <span className="status green"></span>
            <h2>Vincent</h2>
            <h3>10:12AM, Today</h3>
          </div>
          <div className="triangle"></div>
          <div className="message">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor.
          </div>
        </li>
        <li className="me">
          <div className="entete">
            <h3>10:12AM, Today</h3>
            <h2>Vincent</h2>
            <span className="status blue"></span>
          </div>
          <div className="triangle"></div>
          <div className="message">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
            dolor.
          </div>
        </li>
      </ul>
      <footer>
        <textarea className="inputmessage" placeholder="Type your message"></textarea>
        <div className="row">
          <CIcon className="filebtn ms-2" icon={cilFolderOpen} size="3xl" />
          <CIcon className="imgbtn" icon={cilImagePlus} size="3xl" />
          <CIcon className="linkbtn" icon={cilLink} size="3xl" />
          <a align="right" className="sendbtn col mt-3" href="#">
            Send
          </a>
        </div>
      </footer>
    </main>
  )
}

export default Chat

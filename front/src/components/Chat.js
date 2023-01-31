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
import { CCard, CCardBody, CCol, CContainer } from '@coreui/react'
import Cards from 'src/views/base/cards/Cards'
import '../scss/chatRoom.scss'

const Chat = () => {
  return (
    <main>
      <header>
        <div className="row justify-content-between">
          <div className="col-md-8">
            <div className="row">
              <CIcon icon={cilArrowLeft} size="3xl" className="pt-1"></CIcon>
              <h5 className="chat-room col pt-2 mt-2">
                <strong>기본채팅방입니다안하세요</strong>
              </h5>
            </div>
          </div>
          <div className="col-md-2 pt-2 mt-1">
            <CIcon icon={cilStorage} size="xxl" />
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
        <textarea placeholder="Type your message"></textarea>
        <div className="row">
          <CIcon className='ms-2' icon={cilFolderOpen} size="3xl" />
          <CIcon className='' icon={cilImagePlus} size="3xl" />
          <CIcon className='' icon={cilLink} size="3xl" />
          <a align="right" className='col mt-3' href="#">Send</a>
        </div>
      </footer>
    </main>
  )
}

export default Chat

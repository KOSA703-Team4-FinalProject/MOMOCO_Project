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
import { CFormInput, CPopover } from '@coreui/react'
import $ from 'jquery'
import React from 'react'
import { useDispatch } from 'react-redux'
import { changeChatView, changeRoomView, changeTalkDrawer } from 'src/store'

import '../scss/chatRoom.scss'

const Chat = () => {
  const dispatch = useDispatch()

  //채팅 퇴장
  $(document).on('click', '.chatclosebtn', function () {
    dispatch( changeChatView(false) )
    dispatch( changeRoomView(true) )
  })

  //채팅 전송 버튼 클릭
  $(document).on('click', '.sendbtn', function () {
    $('.inputmessage').val('')

    let msgbox = '<li class="me">'
    msgbox += '<div class="entete">'
    msgbox += '<h3>10:12AM, Today</h3>'
    msgbox += '<h2>Vincent</h2>'
    msgbox += '<span class="status blue"></span>'
    msgbox += '</div>'
    msgbox += '<div class="triangle"></div>'
    msgbox += '<div class="message">'
    msgbox += '내용 들어갈거'
    msgbox += '</div>'
    msgbox += '</li>'

    $('.chat').append(msgbox)

    //스크롤 내리기
    let elem = document.getElementById('chat')
    elem.scrollTop = elem.scrollHeight
  })

  //채팅방 서랍 열기
  $(document).on('click', '.drawerbtn', function () {
    dispatch( changeTalkDrawer(true) )
  })

  //파일 업로드 아이콘 클릭
  const fileInput = React.useRef(null);
  $(document).on('click', '.filebtn', ()=>{
    $('.uploadfile').click();
  })
  //이미지 업로드 아이콘 클릭
  const imgInput = React.useRef(null);
  $(document).on('click', '.imgbtn', ()=>{
    $('.uploadimg').click();
  })
  //링크 업로드 아이콘 클릭
  $(document).on('click', '.linkbtn', ()=>{
    
  })

  //파일이 업로드 된 경우
  const fileChange = e => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    if(file.type != 'image/png'){
      console.log("넌 이미자가 아니야!")
    }
  }

  //이미지가 업로드 된 경우
  const imgChange = e => {
    console.log(e.target.files[0])
    const img = e.target.files[0]
    
  }

  const ChatCss = {
    position: "absolute",
    top: "125px",
    left: "1180px",
    margin: "0 auto" 
  }

  return (
    <main style={ChatCss}>
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
          <CFormInput type="file" ref={fileInput} className='uploadfile d-none' onChange={fileChange}/>
          <CIcon className="filebtn ms-2" icon={cilFolderOpen} size="3xl">
          </CIcon>
          <CFormInput type="file" accept="image/*" ref={imgInput} className='uploadimg d-none' onChange={imgChange}/>
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

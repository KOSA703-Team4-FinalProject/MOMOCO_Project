import { cilArrowLeft, cilFolderOpen, cilImagePlus, cilLink, cilStorage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CPopover } from '@coreui/react'
import $ from 'jquery'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState } from 'src/store'
import CryptoJS from 'crypto-js'

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'
import { useParams } from 'react-router-dom'

const Chat = () => {
  const dispatch = useDispatch()
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)

  const params = useParams()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  useEffect(() => {
    //채팅 전송 버튼 클릭
    const fuc = () => {
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
    }

    //이벤트 걸기
    $(document).on('click', '.sendbtn', fuc)

    //dom이 사라질때 이벤트 제거
    return () => {
      $(document).off('click', '.sendbtn', fuc)
    }
  }, [])

  //파일 업로드 아이콘 클릭
  useEffect(() => {
    const fnc = () => {
      $('.uploadfile').click()
    }

    $(document).on('click', '.filebtn', fnc)

    return ()=>{$(document).off('click', '.filebtn', fnc)}
  }, [])

  //이미지 업로드 아이콘 클릭
  useEffect(()=>{
    const fnc = () => {
      $('.uploadimg').click()
    }

    $(document).on('click', '.imgbtn', fnc)

    return ()=>{$(document).off('click', '.imgbtn', fnc)}
  }, [])

  //파일이 업로드 된 경우
  const fileChange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    if (file.type != 'image/png') {
      console.log('넌 아니야!')
    }
  }

  //이미지가 업로드 된 경우
  const imgChange = (e) => {
    console.log(e.target.files[0])
    const img = e.target.files[0]
  }

  const ChatCss = {}

  return (
    <main style={ChatCss}>
      <header>
        <div className="row justify-content-between">
          <div className="col-md-8">
            <div className="row">
              <CIcon
                icon={cilArrowLeft}
                size="3xl"
                className="pt-1"
                onClick={() => {
                  dispatch(changeChatState('chatroom'))
                }}
              ></CIcon>
              <h5 className="chat-room col pt-2 mt-2">
                <strong>기본채팅방입니다하세요</strong>
              </h5>
            </div>
          </div>
          <div className="col-md-2 pt-2 mt-1">
            <CIcon
              icon={cilStorage}
              size="xxl"
              onClick={() => {
                dispatch(changeChatState('chat_drawer'))
              }}
            />
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
          <CFormInput
            type="file"
            className="uploadfile d-none"
            onChange={fileChange}
          />
          <CIcon className="filebtn ms-2" icon={cilFolderOpen} size="3xl"></CIcon>
          <CFormInput
            type="file"
            accept="image/*"
            className="uploadimg d-none"
            onChange={imgChange}
          />
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

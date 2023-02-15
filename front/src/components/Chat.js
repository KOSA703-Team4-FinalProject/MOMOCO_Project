import { cilArrowLeft, cilFolderOpen, cilImagePlus, cilLink, cilStorage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CPopover } from '@coreui/react'
import $, { param } from 'jquery'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState } from 'src/store'
import CryptoJS from 'crypto-js'
import StompJs from "stompjs";
import SockJS from "sockjs-client";

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Chat = () => {
  const dispatch = useDispatch()
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)
  let [initview, setInitview] = useState(false)
  let [room, setRoom] = useState({})
  let [chatList, setChatList] = useState([])

  const params = useParams()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))

  const sockJs = new SockJS("/api/chat")
  const stomp = StompJs.over(sockJs)

  useEffect(() => {

    connect()

    return () => {
      disconnect();
    }

  }, [])

  const connect = () => {

    stomp.connect(`Bearer ${accessToken}`, () => {
      //메시지를 받음
      stomp.subscribe("/sub/chat/room/"+chatRoomNumber, (chat) => {
        appendMessage(chat);
      })

      //메시지 전송
      stomp.send('/pub/chat/enter', `Bearer ${accessToken}`, JSON.stringify({r_idx: chatRoomNumber, u_idx: login.u_idx, nickname: login.nickname}))
    })

  }

  const disconnect = () => {
    console.log("연결 중지")
    stomp.unsubscribe();
  }

  //서버로 부터 채팅 메시지가 도착함
  function appendMessage(chat){

    let message = JSON.parse(chat.body);
    let userid = message.u_idx;

    console.log("message");
    console.log(message);

  }

  //채팅 기록 & 채팅방 정보 불러오기
  useEffect(() => {
    const reqData = {
      url: params.url,
      r_idx: chatRoomNumber,
    }

    axios({
      method: 'POST',
      url: '/api/chat/get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      console.log(res.data)
      setChatList(res.data[0])
      setRoom(res.data[1])
      setInitview(true)
    })
  }, [])

  //파일 업로드 아이콘 클릭
  useEffect(() => {
    const fnc = () => {
      $('.uploadfile').click()
    }

    $(document).on('click', '.filebtn', fnc)

    return () => {
      $(document).off('click', '.filebtn', fnc)
    }
  }, [])

  //이미지 업로드 아이콘 클릭
  useEffect(() => {
    const fnc = () => {
      $('.uploadimg').click()
    }

    $(document).on('click', '.imgbtn', fnc)

    return () => {
      $(document).off('click', '.imgbtn', fnc)
    }
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

  //채팅 전송
  const sendChat = () => {
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

  return (
    <main>
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
                <strong>{initview == true ? room.r_name : <></>}</strong>
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
        {initview == false ? (
          <li></li>
        ) : (
          chatList.map((data) => {
            return (
              <li className="you" key={data.ch_idx}>
                <div className="entete">
                  <span className="status green"></span>
                  <h2 data={data.u_idx}>{data.nickname}</h2>
                  <h3>{data.w_date}</h3>
                </div>
                <div className="triangle"></div>
                <div className="message">{data.content}</div>
              </li>
            )
          })
        )}

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
          <CFormInput type="file" className="uploadfile d-none" onChange={fileChange} />
          <CIcon className="filebtn ms-2" icon={cilFolderOpen} size="3xl"></CIcon>
          <CFormInput
            type="file"
            accept="image/*"
            className="uploadimg d-none"
            onChange={imgChange}
          />
          <CIcon className="imgbtn" icon={cilImagePlus} size="3xl" />
          <CIcon className="linkbtn" icon={cilLink} size="3xl" />
          <a align="right" className="sendbtn col mt-3" onClick={sendChat}>
            Send
          </a>
        </div>
      </footer>
    </main>
  )
}

export default Chat

import { cilArrowLeft, cilFolderOpen, cilImagePlus, cilLink, cilStorage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CFormInput, CPopover } from '@coreui/react'
import $, { param } from 'jquery'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState } from 'src/store'
import StompJs from 'stompjs'

import '../scss/chatRoom.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Chat = () => {
  const dispatch = useDispatch()
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)
  let [initview, setInitview] = useState(false)
  let [room, setRoom] = useState({})
  let [chatList, setChatList] = useState([])

  const chatref = useRef()

  const params = useParams()

  const login = JSON.parse(localStorage.getItem('login'))

  const websocket = new WebSocket('ws://192.168.0.30:8090/controller/chat')
  const stomp = StompJs.over(websocket)

  const connect = () => {
    stomp.connect({}, () => {
      //기존 메시지 불러오기
      stomp.subscribe('/sub/chat/postInfo/' + chatRoomNumber, (chat) => {
        const res = JSON.parse(chat.body)
        console.log(res)
        setRoom(res[1])
        res[0].map((chat) => {
          setChatList((chatList) => [...chatList, chat])
        })
        setInitview(true)
      })

      //메시지를 받음
      stomp.subscribe('/sub/chat/room/' + chatRoomNumber, (chat) => {
        appendMessage(chat)
      })

      //메시지 전송
      stomp.send(
        '/pub/chat/enter',
        {},
        JSON.stringify({
          r_idx: chatRoomNumber,
          u_idx: login.u_idx,
          nickname: login.nickname,
          url: params.url,
        }),
      )
    })
  }

  //연결 끊기
  const disconnect = () => {
    stomp.unsubscribe()
  }

  //서버로 부터 채팅 메시지가 도착함
  function appendMessage(chat) {
    const message = JSON.parse(chat.body)
    setChatList((chatList) => [...chatList, message])
  }

  //채팅방에 연결하기
  useEffect(() => {
    connect()

    return () => {
      disconnect()
    }
  }, [])

  //채팅 기록이 늘어날때마다 스크롤 내리기
  useEffect(() => {

    chatref.current.scrollTop = chatref.current.scrollHeight;

  }, [chatList])

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
    if (img.type != 'image/png') {
      console.log('넌 아니야!')
    }
  }

  //채팅 전송
  const sendChat = () => {
    const reqData = {
      url: params.url,
      nickname: login.nickname,
      u_idx: login.u_idx,
      r_idx: chatRoomNumber,
      content: $('.inputmessage').val(),
      content_type: 'text',
      ref: '1',
    }

    const data = JSON.stringify(reqData)
    stomp.send('/pub/chat/message', {}, data)

    $('.inputmessage').val('')
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
      <ul className="chat" ref={chatref}>
        {initview == false ? (
          <li></li>
        ) : (
          chatList.map((data, key) => {
            switch (data.nickname) {
              case 'sys':
                return (
                  <li className="sys" key={key}>
                    <div className="message">{data.content}</div>
                  </li>
                )
              case login.nickname:
                return (
                  <li className="me" key={key + data.u_idx}>
                    <div className="entete">
                      <h3>10:12AM, Today</h3>
                      <h2>{data.nickname}</h2>
                      <span className="status blue"></span>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">{data.content}</div>
                  </li>
                )
              default:
                return (
                  <li className="you" key={key + data.u_idx}>
                    <div className="entete">
                      <span className="status green"></span>
                      <h2>userid</h2>
                      <h3>10:12AM, Today</h3>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                      ligula eget dolor.
                    </div>
                  </li>
                )
            }
          })
        )}
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

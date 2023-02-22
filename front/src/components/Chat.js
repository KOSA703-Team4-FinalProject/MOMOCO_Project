import {
  cilArrowLeft,
  cilFile,
  cilFolderOpen,
  cilImage,
  cilImagePlus,
  cilLink,
  cilStorage,
  cilWallpaper,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import $, { param } from 'jquery'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeChatState } from 'src/store'
import CryptoJS from 'crypto-js'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'

const Chat = (props) => {
  const dispatch = useDispatch()
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)
  
  let [initview, setInitview] = useState(false)
  let [room, setRoom] = useState({})
  let [chatList, setChatList] = useState([])
  let [ImgModal, setImgModal] = useState(false)
  let [imageURL, setImageURL] = useState('')
  let [linkModalView, setLinkModalView] = useState(false)

  const chatref = useRef()
  const linkRef = useRef()
  const params = useParams()
  const navigate = useNavigate()

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))

  const stomp = props.stomp

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
        dispatch( updateChatRead(true) )
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

  useEffect(() => {
    chatref.current.scrollTop = chatref.current.scrollHeight
  }, [initview])

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
    chatref.current.scrollTop = chatref.current.scrollHeight
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
    const file = e.target.files[0]

    const reqData = {
      url: params.url,
      content_type: 'file',
      ref: 1,
      nickname: login.nickname,
      u_idx: login.u_idx,
      r_idx: chatRoomNumber,
    }

    const fd = new FormData()
    fd.append('file', file)
    fd.append('chat', JSON.stringify(reqData))

    axios({
      method: 'POST',
      url: '/api/chat/file',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      data: fd,
    }).then((res) => {
      console.log(res.data)
    })
  }

  //이미지가 업로드 된 경우
  const imgChange = (e) => {
    const img = e.target.files[0]

    if (
      img.type != 'image/png' &&
      img.type != 'image/jpeg' &&
      img.type != 'image/gif' &&
      img.type != 'image/jpg'
    ) {
      Swal.fire('Error', '이미지를 선택해 주세요.', 'error')
    } else {
      const reqData = {
        url: params.url,
        content_type: 'img',
        ref: 1,
        nickname: login.nickname,
        u_idx: login.u_idx,
        r_idx: chatRoomNumber,
      }

      const fd = new FormData()
      fd.append('file', img)
      fd.append('chat', JSON.stringify(reqData))

      axios({
        method: 'POST',
        url: '/api/chat/file',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        data: fd,
      }).then((res) => {
        console.log(res.data)
      })
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

  //콘텐츠를 클릭할 경우
  const clickContent = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    let content = $(tag).html().split('</svg>')
    const re_cont = content[1]

    console.log(content_type)

    if (content_type == 'file') {
      axios({
        method: 'GET',
        url: '/api/token',
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        if (res.data == '') {
          Swal.fire('Error', '잘못된 접근입니다.', 'error')
        } else {
          const url =
            'http://localhost:8090/controller/api/chat/fileDown?url=' +
            params.url +
            '&content=' +
            re_cont

          const download = document.createElement('a')

          download.href = url
          download.setAttribute('download', $(tag).html())
          download.setAttribute('type', 'application/json')
          download.click()
        }
      })
    } else if (content_type == 'img') {
      setImgModal(!ImgModal)
      const reqData = {
        url: params.url,
        content: $(tag).attr('content'),
      }

      axios({
        method: 'GET',
        url: '/api/chat/imgView',
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'blob',
        params: reqData,
      }).then((res) => {
        const myFile = new File([res.data], 'imageName')
        const reader = new FileReader()
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result)
          setImageURL(previewImage) // myImage라는 state에 저장
        }
        reader.readAsDataURL(myFile)
      })
    } else if (content_type == 'link') {
      const link = document.createElement('a')

      link.href = re_cont
      link.setAttribute('target', '_blank')
      link.click()
    }
  }

  //링크 전송
  const clickLink = () => {
    const tag = linkRef.current
    console.log(linkRef.current.value)

    const reqData = {
      url: params.url,
      nickname: login.nickname,
      u_idx: login.u_idx,
      content_type: 'link',
      content: linkRef.current.value,
      r_idx: chatRoomNumber,
      ref: 1,
    }

    const data = JSON.stringify(reqData)
    stomp.send('/pub/chat/message', {}, data)

    $(tag).val('')
    setLinkModalView(false)
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
                      <h3>{data.w_date}</h3>
                      <h2>{data.nickname}</h2>
                      <span className="status blue"></span>
                    </div>
                    <div className="triangle"></div>
                    {data.content_type == 'text' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        {data.content}
                      </div>
                    ) : data.content_type == 'img' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        content={data.content}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilImage} size="xl" className="me-2" />
                        {data.content}
                      </div>
                    ) : data.content_type == 'file' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilFile} size="xl" className="me-2" />
                        {data.content}
                      </div>
                    ) : (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilLink} size="xl"     className="me-2" />
                        {data.content}
                      </div>
                    )}
                  </li>
                )
              default:
                return (
                  <li className="you" key={key + data.u_idx}>
                    <div className="entete">
                      <span className="status green"></span>
                      <h2>{data.nickname}</h2>
                      <h3>{data.w_date}</h3>
                    </div>
                    <div className="triangle"></div>
                    {data.content_type == 'text' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        {data.content}
                      </div>
                    ) : data.content_type == 'img' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        content={data.content}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilImage} size="xl" className="me-2" />
                        {data.content}
                      </div>
                    ) : data.content_type == 'file' ? (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilFile} size="xl" className="me-2" />
                        {data.content}
                      </div>
                    ) : (
                      <div
                        className="message"
                        value={data.content_type}
                        idx={data.ch_idx}
                        onClick={clickContent}
                      >
                        <CIcon icon={cilLink} size="xl" className="me-2" />
                        {data.content}
                      </div>
                    )}
                  </li>
                )
            }
          })
        )}
        <CModal alignment="center" visible={ImgModal} onClose={() => setImgModal(false)}>
          <CModalBody>
            <img src={imageURL} alt="이미지" style={{ width: '100%', height: 'auto' }} />
          </CModalBody>
        </CModal>
      </ul>
      <footer>
        <textarea className="inputmessage" placeholder="Type your message"></textarea>
        <div className="row">
          <CFormInput
            type="file"
            className="uploadfile d-none"
            onChange={fileChange}
            multiple="multiple"
          />
          <CIcon className="filebtn ms-2" icon={cilFolderOpen} size="3xl"></CIcon>
          <CFormInput
            type="file"
            accept="image/*"
            className="uploadimg d-none"
            onChange={imgChange}
          />
          <CIcon className="imgbtn" icon={cilImagePlus} size="3xl" />
          <CIcon
            className="linkbtn"
            icon={cilLink}
            size="3xl"
            onClick={() => {
              setLinkModalView(!linkModalView)
            }}
          />
          <a align="right" className="sendbtn col mt-3" onClick={sendChat}>
            Send
          </a>
        </div>
        <CModal alignment="center" visible={linkModalView} onClose={() => setLinkModalView(false)}>
          <CModalHeader>
            <CModalTitle>Link 업로드</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow className="m-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                <CIcon className="linkbtn" icon={cilLink} />
                Link
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput ref={linkRef} type="text" id="staticEmail" />
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" variant="outline" onClick={clickLink}>
              확인
            </CButton>
          </CModalFooter>
        </CModal>
      </footer>
    </main>
  )
}

export default Chat

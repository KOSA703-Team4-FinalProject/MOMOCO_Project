import { cilLibraryAdd, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCloseButton,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import $ from 'jquery'
import { useEffect, useState } from 'react'
import { BsFillXSquareFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeChatState, changeRoomView, updateChatRoomNumber } from 'src/store'
import CryptoJS from 'crypto-js'

import '../scss/chatRoom.scss'
import { PRIMARY_KEY } from '../oauth'

const ChatRoom = () => {
  const dispatch = useDispatch()
  const params = useParams()
  let chatstate = useSelector((state) => state.chatState)

  const [chatroom, setChatRoom] = useState([])

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  useEffect(() => {
    const fnc = function () {
      $('.createRoominput').val('')
    }

    //채팅방 생성 버튼 클릭
    $(document).on('click', '.createRoombtn', fnc)

    return () => {
      $(document).off('click', '.createRoombtn', fnc)
    }
  }, [])

  useEffect(() => {
    //채팅방 삭제 버튼 클릭
    $(document).on('click', '.deleteroombtn', function () {
      //1. 채팅방 내용 지우기
      //2. 해당하는 채팅방에 대한 모든 연결 끊기
      //3. 비동기로 해당하는 채팅방 삭제
      // 3-1) 전체 채팅방 리스트 불러와 뿌리기
    })
  }, [])

  //채팅방 전체 조회
  useEffect(() => {
    const reqData = {
      url: params.url,
    }

    axios({
      method: 'POST',
      url: '/api/chatroom/get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      setChatRoom(res.data)
    })
  }, [chatstate])

  return (
    <div className="mx-1">
      <aside className="row">
        <header className="col row px-4 mx-1">
          <input className="createRoominput col-md-8 p-4" placeholder="채팅방 만들기"></input>
          <button className="createRoombtn col-md-4">
            <h4>
              <CIcon icon={cilLibraryAdd} size="xl" />
            </h4>
          </button>
        </header>
        <ul className="roomlist">
          {chatroom.map((data) => (
            <li key={data.r_idx}>
              <CRow className="px-5 pt-3 mb-1">
                <CCol
                  xs="auto"
                  className="enterroombtn me-auto mt-1"
                  onClick={() => {
                    dispatch(changeChatState('chat'))
                    dispatch(updateChatRoomNumber(data.r_idx))
                  }}
                >
                  <h2>{data.r_name}</h2>
                </CCol>
                <CCol xs="auto" className="deleteroombtn">
                  <h2>
                    <CIcon icon={cilTrash} size="xl" />
                  </h2>
                </CCol>
              </CRow>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

export default ChatRoom

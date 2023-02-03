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
import $ from 'jquery'
import { useEffect } from 'react'
import { BsFillXSquareFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { changeChatState, changeRoomView } from 'src/store'

import '../scss/chatRoom.scss'

const ChatRoom = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fnc = function () {
      $('.createRoominput').val('')
    }

    //채팅방 생성 버튼 클릭
    $(document).on('click', '.createRoombtn', fnc)

    return ()=>{$(document).off('click', '.createRoombtn', fnc)}
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

  return (
    <div className="mx-1">
      <aside className="row">
        <header className="col-md-10 row px-4 ms-1">
          <input className="createRoominput col-md-8 p-4" placeholder="채팅방 만들기"></input>
          <button className="createRoombtn col-md-4">
            <h4>
              <CIcon icon={cilLibraryAdd} size="xl" />
            </h4>
          </button>
        </header>
        <div align="end" className="col-md-1 pb-1 mt-4 pt-3 ms-1">
          <BsFillXSquareFill
            size="35px"
            onClick={() => {
              dispatch(changeChatState('none'))
            }}
          />
        </div>
        <ul className="roomlist">
          <li>
            <CRow className="px-5 pt-3 mb-1">
              <CCol
                xs="auto"
                className="enterroombtn me-auto mt-1"
                onClick={() => {
                  dispatch(changeChatState('chat'))
                }}
              >
                <h2>기본 채팅방</h2>
              </CCol>
              <CCol xs="auto" className="deleteroombtn">
                <h2>
                  <CIcon icon={cilTrash} size="xl" />
                </h2>
              </CCol>
            </CRow>
          </li>
          <li>
            <CRow className="px-5 pt-3 mb-1">
              <CCol
                xs="auto"
                className="enterroombtn me-auto mt-1"
                onClick={() => {
                  dispatch(changeChatState('chat'))
                }}
              >
                <h2>만들어진 채팅방</h2>
              </CCol>
              <CCol xs="auto" className="deleteroombtn">
                <h2>
                  <CIcon icon={cilTrash} size="xl" />
                </h2>
              </CCol>
            </CRow>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default ChatRoom

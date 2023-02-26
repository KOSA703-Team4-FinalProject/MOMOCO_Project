import React, { useState, useRef } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateToast } from 'src/store'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CCol,
  CRow,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import ChatAll from './ChatAll'
import Notifications from './Notifications'
import { changeChatState, changeState } from 'src/store'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import issuelist from '../views/board/issuelist'
import Issues from 'src/views/board/Issues'
import momoco from '../assets/images/momocologo.png'
import WorkSpaceListItem from 'src/components/WorkSpaceListItem'
import { CButton } from '@coreui/react'
import StompJs from 'stompjs'
import { useEffect } from 'react'
import { Cookies } from 'react-cookie'
import { IoChatboxOutline, IoChatboxEllipses } from 'react-icons/io5'
import { useCallback } from 'react'
import { fontSize } from '@mui/system'

const AppHeader = () => {
  const dispatch = useDispatch()
  let sidebarShow = useSelector((state) => state.sidebarShow)
  const chatView = useSelector((state) => state.chatState)

  const [visibletoast, SetVisibleToast] = useState(false)
  const [chatState, setCahtState] = useState(false) //채팅 모달 상태
  //토스트
  const alarmToast = useSelector((state) => state.alarmToast)

  const params = useParams()
  const navigate = useNavigate()

  const login = JSON.parse(localStorage.getItem('login'))

  //웹 소켓 연결
  const websocket = new WebSocket('ws://192.168.0.30:8090/controller/chat')
  const stomp = StompJs.over(websocket)

  useEffect(() => {
    const cookies = new Cookies()
    const date = new Date()

    cookies.set('url', params.url, {
      path: '/',
      expires: date.setHours(date.getHours + 8),
      sameSite: 'strict',
    })

    

  }, [])

  //토스트
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const Toast = (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">{alarmToast.link}에서 알림이 왔습니다</div>
        <small>{alarmToast.url}</small>
      </CToastHeader>
      <CToastBody>{alarmToast.content}</CToastBody>
    </CToast>
  )

  useEffect(() => {

    if(alarmToast.content != ""){
      console.log('================================')
      addToast(Toast)
    }
    console.log("2222222222222222222222222222")
      
      
  }, [alarmToast])

  return (
    <>
      <CHeader position="sticky" className="mb-4 p-3">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => {
              dispatch(changeState(!sidebarShow))
            }}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className=" d-md-none" to="/">
            <img src={momoco} width="40px" />
            <CDropdown>
              <CDropdownToggle color="ghost">
                <BsFillHouseDoorFill />
                <strong> {params.url}</strong>
              </CDropdownToggle>
              <CDropdownMenu>
                <CRow className="mb-2 px-2">
                  <CCol className="my-auto px-4" md={4}>
                    <strong>MY SPACE</strong>
                  </CCol>
                  <CCol md={8} align="end">
                    <CButton
                      onClick={() => navigate('/workspace')}
                      className="mx-1"
                      color="primary"
                      variant="outline"
                    >
                      <strong>만들기</strong>
                    </CButton>
                    <CButton
                      onClick={() => navigate('/workspacelist')}
                      className="mx-1"
                      color="dark"
                      variant="outline"
                    >
                      <strong>설정</strong>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="px-2">
                  <WorkSpaceListItem width="400px" maxHeight="400px" overflowY="scroll" />
                </CRow>
              </CDropdownMenu>
            </CDropdown>
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              {/* 워크스페이스 리스트 */}
              <CDropdown>
                <CDropdownToggle color="ghost">
                  <BsFillHouseDoorFill className="mb-2" size={23} />
                  <strong style={{ fontSize: '25px' }}> {params.url}</strong>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CRow className="mb-2 px-2">
                    <CCol className="my-auto px-4" md={4}>
                      <strong>MY SPACE</strong>
                    </CCol>
                    <CCol md={8} align="end">
                      <CButton
                        onClick={() => navigate('/workspace')}
                        className="mx-1"
                        color="primary"
                        variant="outline"
                      >
                        <strong>만들기</strong>
                      </CButton>
                      <CButton
                        onClick={() => navigate('/workspacelist')}
                        className="mx-1"
                        color="dark"
                        variant="outline"
                      >
                        <strong>설정</strong>
                      </CButton>
                    </CCol>
                  </CRow>
                  <CRow className="px-2">
                    <WorkSpaceListItem width="400px" maxHeight="400px" overflowY="scroll" />
                  </CRow>
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              {/* 알림 이모티콘 */}
              <CDropdown>
                <CDropdownToggle color="ghost">
                  <CIcon icon={cilBell} size="lg" />
                </CDropdownToggle>
                <CDropdownMenu>
                  <Notifications stomp={stomp} />
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
            <CNavItem>
              {/* 채팅 이모티콘 */}
              <CDropdown autoClose={false} visible={chatState}>
                <CDropdownToggle color="ghost">
                  <IoChatboxOutline
                    className="mb-1"
                    size="21px"
                    onClick={() => {
                      chatState == false ? setCahtState(true) : setCahtState(false)
                      chatView == 'none'
                        ? dispatch(changeChatState('chatroom'))
                        : dispatch(changeChatState('none'))
                    }}
                  />
                </CDropdownToggle>
                <CDropdownMenu>
                  <ChatAll stomp={stomp} />
                </CDropdownMenu>
              </CDropdown>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <Issues issuelist={issuelist} />
      </CHeader>
      {/* 알림 토스트 */}
      <CToaster ref={toaster} push={toast} placement="top-end" />
    </>
  )
}

export default AppHeader

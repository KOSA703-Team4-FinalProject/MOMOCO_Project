import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilCommentSquare, cilMenu } from '@coreui/icons'

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

const AppHeader = () => {
  const dispatch = useDispatch()
  let sidebarShow = useSelector((state) => state.sidebarShow)
  const chatView = useSelector((state) => state.chatState)
  const [chatState, setCahtState] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  //접속한 채팅방 번호
  let chatRoomNumber = useSelector((state) => state.chatRoomNumber)
  //웹 소켓 연결
  const websocket = new WebSocket('ws://192.168.0.30:8090/controller/chat')
  const stomp = StompJs.over(websocket)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => {
            dispatch(changeState(!sidebarShow))
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img src={momoco} width="20%" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            {/* 워크스페이스 리스트 */}
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
                      shape="rounded-pill"
                    >
                      <strong>만들기</strong>
                    </CButton>
                    <CButton
                      onClick={() => navigate('/workspacelist')}
                      className="mx-1"
                      color="dark"
                      variant="outline"
                      shape="rounded-pill"
                    >
                      <strong>전체보기</strong>
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="px-2">
                  <WorkSpaceListItem width="400px" maxHeight="400px" overflowY="scroll" />
                </CRow>
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
          <CNavItem>
            <CNavLink to={`/ws/${params.url}/dashboard`} component={NavLink}>
              <strong>Dashboard</strong>
            </CNavLink>
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
                <Notifications />
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
          <CNavItem>
            {/* 채팅 이모티콘 */}
            <CDropdown autoClose={false} visible={chatState}>
              <CDropdownToggle color="ghost">
                <CIcon
                  icon={cilCommentSquare}
                  size="lg"
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
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
      <Issues issuelist={issuelist} />
    </CHeader>
  )
}

export default AppHeader

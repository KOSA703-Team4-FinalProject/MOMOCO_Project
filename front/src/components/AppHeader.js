import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
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
  CModal,
  CModalBody,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownItemPlain,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilCommentSquare, cilMenu } from '@coreui/icons'

import { AppBreadcrumb, ChatRoom } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import ChatAll from './ChatAll'
import Notifications from './Notifications'
import { width } from '@mui/system'
import { changeChatState, changeState } from 'src/store'
import { BsFillHouseDoorFill } from 'react-icons/bs'
import issuelist from '../views/board/issuelist'
import Issues from 'src/views/board/Issues'
import { data } from 'jquery'
import momoco from '../assets/images/momocologo.png'
import WorkSpaceListItem from 'src/components/WorkSpaceListItem'
import { CButton } from '@coreui/react'
import { CCard } from '@coreui/react'

const AppHeader = () => {
  const dispatch = useDispatch()
  let sidebarShow = useSelector((state) => state.sidebarShow)
  const chatView = useSelector((state) => state.chatState)
  const params = useParams()

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
                <strong>{params.url}</strong>
              </CDropdownToggle>
              <CDropdownMenu>
                <CNavLink align="center" to={'/workspace'} component={NavLink}>
                  <CButton className="mx-1" color="primary" shape="rounded-pill">
                    <strong>새 워스크페이스 만들기</strong>
                  </CButton>
                </CNavLink>
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
                {' '}
                <CIcon icon={cilBell} size="lg" />
              </CDropdownToggle>
              <CDropdownMenu>
                <Notifications />
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
          <CNavItem>
            {/* 채팅 이모티콘 */}
            <CDropdown autoClose={false}>
              <CDropdownToggle color="ghost">
                {' '}
                <CIcon
                  icon={cilCommentSquare}
                  size="lg"
                  onClick={() => {
                    if (chatView === 'none') {
                      dispatch(changeChatState('chatroom'))
                    } else {
                      dispatch(changeChatState('none'))
                    }
                  }}
                />
              </CDropdownToggle>
              <CDropdownMenu>
                <ChatAll />
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

import React from 'react'
import { NavLink } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilCommentSquare, cilMenu } from '@coreui/icons'

import { AppBreadcrumb, ChatRoom } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import ChatAll from './ChatAll'
import Notifications from './Notifications'
import { width } from '@mui/system'
import { changeChatState } from 'src/store'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const chatView = useSelector((state)=>state.chatState)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
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
                    if(chatView === 'none'){
                      dispatch(changeChatState('chatroom'))
                    }else{
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
    </CHeader>
  )
}

export default AppHeader

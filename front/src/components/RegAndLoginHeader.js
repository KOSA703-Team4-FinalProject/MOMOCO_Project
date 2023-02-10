import React, { useState } from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import momocologo from '../assets/images/momocologo.png'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const RegAndLoginHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [login, SetLogin] = useState(false)

  // 로그인, 회원가입 전용 헤더(토글 삭제 및 필요없는 아이콘삭제 > 로그인 전 화면에만 적용)
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="justify-content-center">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              <img src={momocologo} width="20%" />
              {/* 여기에 모모코 로고 들어감 */}
            </CNavLink>
          </CNavItem>

          {/* {
            (login = true ? (
              <CNavItem>
                <CNavLink to="/gitlogin" component={NavLink}>
                  로그아웃
                </CNavLink>
              </CNavItem>
            ) : (
              <CNavItem>
                <CNavLink to="/gitlogin" component={NavLink}>
                  로그인
                </CNavLink>
              </CNavItem>
            ))
          } 이건 나중에 처리 */}

          <CNavItem>
            <CNavLink className="my-auto" to="/workSpaceList" component={NavLink}>
              <strong>나의 워크스페이스</strong>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink className="my-auto" to="/aboutus" component={NavLink}>
              <strong>모모코란?</strong>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav></CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  )
}

export default RegAndLoginHeader

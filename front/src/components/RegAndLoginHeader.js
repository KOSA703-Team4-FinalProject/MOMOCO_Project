import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  CButton,
  CCard,
  CCol,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
  CRow,
} from '@coreui/react'
import momoco from '../assets/images/momocologo.png'
import { NavLink } from 'react-router-dom'

const RegAndLoginHeader = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <CNavbar expand="lg" colorScheme="light" style={{ background: '#D6E4E5' }}>
        <CContainer fluid>
          <CNavbarBrand href="">
            <CCol className="align-self-center">
              <h1 className="ps-3 pb-1">
                <img src={momoco} width="40px" className="mb-2 me-2" />
                <strong>momoco</strong>
              </h1>
            </CCol>
          </CNavbarBrand>
          <CNavbarToggler
            aria-label="Toggle navigation"
            aria-expanded={visible}
            onClick={() => setVisible(!visible)}
          />

          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CNavItem className="px-4">
                <CDropdown variant="nav-item" popper={false}>
                  <h5>
                    <CDropdownToggle color="dark">
                      <strong>워크스페이스</strong>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>
                        <CNavLink to="/workSpace" component={NavLink}>
                          워크스페이스 만들기
                        </CNavLink>
                      </CDropdownItem>
                      <CDropdownItem>
                        <CNavLink to="/workSpaceList" component={NavLink}>
                          나의 워크스페이스 목록
                        </CNavLink>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </h5>
                </CDropdown>
              </CNavItem>
              <CNavItem className="px-4">
                <CDropdown variant="nav-item" popper={false}>
                  <h5>
                    <CDropdownToggle color="secondary">
                      <strong> About 모모코</strong>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>
                        <CNavLink to="/aboutus" component={NavLink}>
                          모모코란?
                        </CNavLink>
                      </CDropdownItem>
                      <CDropdownItem>
                        <CNavLink to="/aboutus" component={NavLink}>
                          프로젝트 소개
                        </CNavLink>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem href="#">
                        <CNavLink to="/aboutus" component={NavLink}>
                          모모코 팀
                        </CNavLink>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </h5>
                </CDropdown>
              </CNavItem>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  )
}

export default RegAndLoginHeader

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
} from '@coreui/react'
import React from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { useState } from 'react'
import { classNames } from 'classnames'
import { width } from '@mui/system'
import { CFormCheck } from '@coreui/react'
import { CAvatar } from '@coreui/react'

const NotisStyle = {
  width: '400px',
  height: '600px',
  'overflow-y': 'scroll',
}

const Notifications = () => {
  return (
    <CCard style={NotisStyle}>
      <CCardBody>
        <CRow className="px-1 pb-4">
          <CCol sm={5}>
            <strong>최근({9})</strong>
          </CCol>
          <CCol align="end" sm={7}>
            전체읽음으로 표시
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CListGroup>
              <CListGroupItem component="a" href="#">
                <CRow>
                  <div align="center">전체삭제</div>
                </CRow>
              </CListGroupItem>
              {['info', 'info', 'info', 'info', 'info', 'light', 'light', 'light'].map(
                (color, index) => (
                  <CListGroupItem component="a" href="#" color={color} key={index}>
                    <CRow>
                      <CCol sm={2}>
                        <CAvatar
                          className="ms-1"
                          src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                        />
                      </CCol>
                      <CCol sm={8}>
                        <strong>자유게시판 '코드 확인 바랍..' 글에 댓글이 달렸습니다.</strong>
                        <i className="text-medium-emphasis">..momoco에서</i>
                      </CCol>
                      <CCol sm={2}>삭제</CCol>
                    </CRow>
                  </CListGroupItem>
                ),
              )}
            </CListGroup>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Notifications

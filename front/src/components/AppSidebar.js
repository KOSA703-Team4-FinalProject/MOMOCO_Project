import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CButton,
  CCard,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import whitemomoco from '../assets/images/whitemomoco.png'
import axios from 'axios'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex my-1 py-2" to="/">
        <img src={whitemomoco} width="55px" className="me-3" />
        <h1 className="mt-1">momoco</h1>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

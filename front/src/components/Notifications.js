import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'
import React from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const Notifications = () => {
  return (
    <CCard className="draggable" draggable="true">
      <CRow>
        <CCol xs="auto" className="me-auto">
          <CCardHeader>제목</CCardHeader>
        </CCol>
        <CCol xs="auto">
          {' '}
          <CDropdown alignment="end">
            <CDropdownToggle color="transparent" caret={false} className="p-0">
              <CIcon icon={icon.cilChevronBottom} />
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem>Something else here...</CDropdownItem>
              <CDropdownItem disabled>Disabled action</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
      <CCardBody>
        <CCardTitle>내용(클릭하면 상세보기)</CCardTitle>
      </CCardBody>
    </CCard>
  )
}

export default Notifications

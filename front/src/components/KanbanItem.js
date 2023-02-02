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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import { Link } from 'react-router-dom'

const KanbanItem = () => {
  const [visibleXL, setVisibleXL] = useState(false)

  let font = {
    fontSize: '1rem',
  }
  return (
    <CCard className="draggable" draggable="true">
      <CRow>
        <CCol xs="auto" className="me-auto">
          <CCardHeader>글번호</CCardHeader>
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
        <CCardTitle>
          <a onClick={() => setVisibleXL(!visibleXL)} style={font}>
            제목
          </a>
        </CCardTitle>
      </CCardBody>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>제목</CModalTitle>
        </CModalHeader>
        <CModalBody>...</CModalBody>
      </CModal>
    </CCard>
  )
}

export default KanbanItem

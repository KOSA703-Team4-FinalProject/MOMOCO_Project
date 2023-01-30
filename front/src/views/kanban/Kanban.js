import { CCard, CCardBody, CCardFooter, CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CRow } from "@coreui/react"
import CIcon from '@coreui/icons-react'

import * as icon from '@coreui/icons';
import WidgetsDropdown from "../widgets/WidgetsDropdown"

const Kanban = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCard className="col-md-3">
              <CRow>
                <CCol xs="auto" className="me-auto">
                    To-Do
                </CCol>
                <CCol xs="auto"> <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={icon.cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown></CCol>
                
              </CRow>


            </CCard>


            <CCard className="col-md-3">
              <CRow>
                <CCol xs="auto" className="me-auto">
                    In Progress
                </CCol>
                <CCol xs="auto"> <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={icon.cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown></CCol>
                
              </CRow>


            </CCard>


            <CCard className="col-md-3">
              <CRow>
                <CCol xs="auto" className="me-auto">
                    Done
                </CCol>
                <CCol xs="auto"> <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="p-0">
                  <CIcon icon={icon.cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown></CCol>
                
              </CRow>


            </CCard>
            <CCard className="col-md-3">
              <CIcon
                icon={icon.cilPlus}
                onClick={() => {
                  alert('플러스 클릭')
                }}
              />
            </CCard>
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default Kanban
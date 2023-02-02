import { CCard, CCardBody, CCardFooter, CCol, CRow } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const KanbanDetail = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                KanbanDetail
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  )
}

export default KanbanDetail

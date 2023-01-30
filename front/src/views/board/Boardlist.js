import { cilCaretLeft } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CButton, CButtonGroup, CButtonToolbar, CCard, CCardBody, CCardFooter, CCol, CForm, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CPagination, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
import { useState } from "react"
import WidgetsDropdown from "../widgets/WidgetsDropdown"

const Boardlist = () => {
  const [currentPage, setActivePage] = useState(2)
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                게시판 목록
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
           
            </CCol>

            <br/>
            <br/>
      
            <div className={'mt-2 col-6'} style={{justifyContent:'justify-content-start'}} >
            <CInputGroup className="mb-4">
            <CFormInput placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2"/>
            <CButton type="button" color="secondary" variant="outline" id="button-addon2">검색</CButton>
            </CInputGroup>
            </div>
            <div className="container-fluid">
	<div className="row">
		<div className="col-md-6">
    <div className="selectname">
            <CFormSelect size="lg" className="mb-5" aria-label="게시판을 선택해주세요">
            <option>게시판을 선택해주세요</option>
            <option value="1">칸반보드</option>
            <option value="2">캘린더</option>
            <option value="3">자유게시판</option>
            </CFormSelect>
           
            </div>
		</div>
		<div className="col-md-4"></div>
    <div className="col-md-2">
      
    <CButton color="secondary" size="lg">글쓰기</CButton>
   </div>
	</div>
</div>
            
            <div className="md-2">
           <CCard className="sm=3">
            <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col-md-2.4">#</CTableHeaderCell>
              <CTableHeaderCell scope="col-md-2.4">게시판종류</CTableHeaderCell>
              <CTableHeaderCell scope="col-md-2.4">글제목</CTableHeaderCell>
              <CTableHeaderCell scope="col-md-2.4">작성일자</CTableHeaderCell>
              <CTableHeaderCell scope="col-md-2.4">작성자</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Jacob</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@fat</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">3</CTableHeaderCell>
              <CTableDataCell colSpan={2}>Larry the Bird</CTableDataCell>
              <CTableDataCell>@twitter</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
          </CTableBody>
          </CTable>
          
          </CCard>
          <div className="row">
		<div className="col-md-4">
		</div>
		<div className="col-md-4 number">
       {/* 나중에 props 추가 */}
    {/* <div className={'mt-2'} >
     
       <CPagination
        activePage={currentPage}
        pages={10}
        onActivePageChange={(i) => setActivePage(i)}
      ></CPagination> 
    
      </div> */}
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only"></span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only"></span>
      </a>
    </li>
  </ul>
</nav>

    
		</div>
		<div className="col-md-4">
		</div>
	</div>
          
          </div>
          
          </CRow>
        
        </CCardBody>
        <CCardFooter>

        </CCardFooter>
      </CCard>
    </>
  )
}

export default Boardlist
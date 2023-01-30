import { cilCaretLeft } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CAvatar, CButton, CButtonGroup, CButtonToolbar, CCard, CCardBody, CCardFooter, CCol, CContainer, CForm, CFormCheck, CFormInput, CFormSelect, CInputGroup, CInputGroupText, CPagination, CPaginationItem, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react"
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
                <strong>게시판 목록</strong> 
              </h4>
              
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
           
            </CCol>

          
          </CRow>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                  <p className="mt-3">프로젝트에 관련된 글을 제공합니다 프로젝트를하면서 모두함께 성장해요</p>
                  </div>
                  <div className="col-md-6" align="right">
                        
                      <div className={'mt-2 col-6'} style={{justifyContent:'justify-content-start'}} >
                      <CInputGroup className="mb-4" >
                      
                   
                      <CFormInput placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2"/>
                      <CButton type="button" color="secondary" variant="outline" id="button-addon2">검색</CButton>
                      </CInputGroup>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                    <CFormCheck
                      button={{ color: 'primary', variant: 'outline' }}
                      id="btncheck1"
                      autoComplete="off"
                      label="전체보기"
                    />
                    <CFormCheck
                      button={{ color: 'primary', variant: 'outline' }}
                      id="btncheck2"
                      autoComplete="off"
                      label="칸반보드"
                    />
                    <CFormCheck
                      button={{ color: 'primary', variant: 'outline' }}
                      id="btncheck3"
                      autoComplete="off"
                      label="캘린더"
                    />
                     <CFormCheck
                      button={{ color: 'primary', variant: 'outline' }}
                      id="btncheck4"
                      autoComplete="off"
                      label="문서저장소"
                    />
                     <CFormCheck
                      button={{ color: 'primary', variant: 'outline' }}
                      id="btncheck5"
                      autoComplete="off"
                      label="게시판"
                    />
                  </CButtonGroup>
                  </div>
                  <div className="col-md-3" align="right">
                    <CButton variant="outline" >글쓰기</CButton>
                  </div>
                 
                </div>
             
               {/* 게시판 목록 시작 */}
                <CCard className="p-5 mt-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-1" align="center">
                      <strong>NO.</strong>
                      </div>
                      <div className="col-md-11">
                        <div className="row">
                          <div className="col-md-12">
                            작성일자
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            <strong>글제목</strong>
                          </div>
                          <div className="col-md-4">
                          
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            글내용
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            게시판종류
                            
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12" align="right">
                          
                              작성자이름
                              <CAvatar className='ms-4' src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </CCard>
                {/* 게시판 목록 끝 */}
                <br/>
                
                  <CContainer>
                    <CPagination align="center" aria-label="Page navigation example">
                    <CPaginationItem aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem>
                      <CPaginationItem>1</CPaginationItem>
                      <CPaginationItem>2</CPaginationItem>
                      <CPaginationItem>3</CPaginationItem>
                      <CPaginationItem aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      </CPaginationItem>
                    </CPagination>
                  </CContainer>
               
              </div>
            </div>
            </div>
        </CCardBody>
        <CCardFooter>

        </CCardFooter>
      </CCard>
    </>
  )
}

export default Boardlist
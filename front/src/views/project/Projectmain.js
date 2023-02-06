const { CCard, CCardBody, CRow, CCol, CCardFooter, CCardHeader, CListGroup, CListGroupItem, CButton } = require("@coreui/react")

const projectmain =()=>{
    return (
        <>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                    <strong>나의 워크스페이스</strong>
                    </h4>
                </CCol>
                <br></br>
                <CCol sm={7} className="d-none d-md-block">
                    

                </CCol>
              </CRow>

              <CCol className="container-fluid">
                <CCol className="row">
                    <CCol className="col-md-12">
                        <CCard align="center">
                        <CRow>
                            <CCol className="col-md-6">
                                <CCard style={{ width: '30rem' }}>
                                <CCardHeader>MOMOCOPROJECT</CCardHeader>
                                <CListGroup flush align="right">
                                    <CListGroupItem>프로젝트 주소 : </CListGroupItem>
                                    <CListGroupItem>기간 : 23-02-06~23-03-02</CListGroupItem>
                                    <CListGroupItem>팀원: 메타몽, yellow mellow</CListGroupItem>
                                    <CListGroupItem align="end"> <CButton href="#">워크스페이스로이동하기</CButton></CListGroupItem>
                                   
                                </CListGroup>
                                </CCard>
                            </CCol>
                            <CCol className="col-md-6">
                                <CCard style={{ width: '30rem' }}>
                                <CCardHeader>MOMOCOPROJECT</CCardHeader>
                                <CListGroup flush align="right">
                                    <CListGroupItem>프로젝트 주소 : </CListGroupItem>
                                    <CListGroupItem>기간 : 23-02-06~23-03-02</CListGroupItem>
                                    <CListGroupItem>팀원: 메타몽, yellow mellow</CListGroupItem>
                                </CListGroup>
                                </CCard>
                            </CCol>
                        </CRow>
                        <hr></hr>
                        <CRow className="row">
                            <CCol className="col-md-6">
                                <CCard style={{ width: '30rem' }}>
                                <CCardHeader>MOMOCOPROJECT</CCardHeader>
                                <CListGroup flush align="right">
                                    <CListGroupItem>프로젝트 주소 : </CListGroupItem>
                                    <CListGroupItem>기간 : 23-02-06~23-03-02</CListGroupItem>
                                    <CListGroupItem>팀원: 메타몽, yellow mellow</CListGroupItem>
                                </CListGroup>
                                </CCard>
                            </CCol>
                            <CCol className="col-md-6">
                            <CCard style={{ width: '30rem' }}>
                                <CCardHeader>MOMOCOPROJECT</CCardHeader>
                                <CListGroup flush align="right">
                                    <CListGroupItem>프로젝트 주소 : </CListGroupItem>
                                    <CListGroupItem>기간 : 23-02-06~23-03-02</CListGroupItem>
                                    <CListGroupItem>팀원: 메타몽, yellow mellow</CListGroupItem>
                                </CListGroup>
                                </CCard>
                            </CCol>
                        </CRow>
                        </CCard>
                    </CCol>
                </CCol>
            </CCol>
            </CCardBody>
            <CCardFooter> 
    
            </CCardFooter>
          </CCard>
        </>
    )
}
export default projectmain;
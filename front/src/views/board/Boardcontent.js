import { CAvatar, CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react"
import WidgetsDropdown from "../widgets/WidgetsDropdown"

const Boardcontent = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
                  
            </CCol>
            
          </CRow>
          <div>
            <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-9">
                    글을 제목을 작성하시오
                  </div>
                  <div className="col-md-3">
                  </div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-1">
                  <CAvatar className='ms-4' src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/>
                  </div>
                  <div className="col-md-11">
                    <div className="row">
                      <div className="col-md-12" align="left">
                        이름
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12" align="left">
                        2023.01.03 18:45
                      </div>
                    </div>
                  </div>
                </div>
                <CCard>
                <div class="row">
                  <div class="col-md-3">
                  </div>
                  <div class="col-md-3">
                  파일
                  </div>
                  <div class="col-md-3">
                  읽은 회원
                    <CAvatar className='ms-4' src="data:image/jpeg;base64,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"/> 메타몽
                  </div>
                  <div class="col-md-3">
                  </div>
                </div>
                
                </CCard>

                <div className="row">
                  <div className="col-md-12">
                  </div>
                </div>
              
              </div>
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

export default Boardcontent
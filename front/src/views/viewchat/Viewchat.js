import { cilMediaPlay } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CAvatar, CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react"
import { de } from "date-fns/locale"
import { BsFillCameraVideoFill, BsFillChatLeftDotsFill, BsFillMicFill, BsFillPlayCircleFill } from "react-icons/bs"
import WidgetsDropdown from "../widgets/WidgetsDropdown"
const box={
  height :'700px'
}
const profileimg= {
  width:'250px', height:'250px'
}
const Viewchat = () => {
  return (
    <>
      <CCard className="mb-5">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
             
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
           
            </CCol>
          </CRow>

          <div className="container-fluid">
              <div className="row">
                <div className="col-md-8"  align="left">
                <CAvatar className='ms-4' src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/> 
                &nbsp;<p>MelloYellow </p>
                </div>
                <div className="col-md-4 mt-3"  align="end">
                    <strong>프로젝트 이름</strong>
                </div>
                  <div className="row">
                  <hr></hr>
                  <CCard style={box} >
                    <div className="col-md-12 p-6" align="center" >

                   


                    </div>
                    </CCard>
                  </div>
                  
                </div>
           </div>
           
        </CCardBody>
        <CCardFooter> 
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12" align="center">
        {/* <BsFillPlayCircleFill  size="40px"/> */}
        <BsFillCameraVideoFill size="45" color="#515151"/> &nbsp;&nbsp; <BsFillMicFill size="45" color="#515151"/> &nbsp;&nbsp; <BsFillChatLeftDotsFill size="45" color="#515151"/>

        </div>
        
        </div>
        </div>
        </CCardFooter>
      </CCard>
    </>
  )
}
export default Viewchat;
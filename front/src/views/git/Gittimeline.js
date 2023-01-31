import { CAvatar, CCallout, CCard, CCardBody, CCardFooter, CCol, CRow } from "@coreui/react"
import { Timeline,TimelineItem,TimelineSeparator ,TimelineConnector ,TimelineContent,TimelineDot,TimelineOppositeContent  } from '@mui/lab';
import Typography from "../theme/typography/Typography";
const timelineimg={
    width:'40px', height:'40px'
}
const time = {
    
    fontSize: 20,
    "border": "2px"
  }
  const userimg ={
    width:'300px', 
    height:'80px'
  }
const Gittimeline = () => {
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
        <div className="col-md-12" align="center">
        <Timeline position="right">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <p style={time}>09:30 am</p>
          <CAvatar style={timelineimg} src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><p style={time}>메타몽</p>
        <CCallout color="primary"style={userimg}>
        커밋메세지
        </CCallout>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <p style={time}>10:00 am</p>
    
          <CAvatar style={timelineimg} src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><p style={time}>메타몽</p>
        <CCallout color="primary"style={userimg}>
           커밋메세지
        </CCallout>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <p style={time}>12:00 am</p>
    
          <CAvatar style={timelineimg} src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"/>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent><p style={time}>메타몽</p>
        <CCallout color="primary"style={userimg}>
        커밋메세지
        </CCallout>
        </TimelineContent>
      </TimelineItem>
     
    </Timeline>
        </div>
   
        </CCardBody>
        <CCardFooter>

        </CCardFooter>
      </CCard>
    </>
  )
}
export default Gittimeline;
import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react'
import { Link, NavLink } from 'react-router-dom'

const box = {
  width: '600px',
  height: '125px',
}
let issue = props.issuelist
const Issuecontent = (props) => {
  //클릭한값을 링크로 변환
  const makeLink = () => {
    props.getMakeLink(Item.idx)
  }

  return (
    <>
      {issue.map((Item, i) => (
        <div key={i}>
          <CCard style={box}>
            <CCardHeader>
              <CButton onclick={makeLink}>{Item.idx}</CButton>
            </CCardHeader>
            <CCardBody>
              <CCardTitle>이슈내용 :{Item.title}</CCardTitle>
              <CCardText>{Item.url}</CCardText>
            </CCardBody>
          </CCard>
        </div>
      ))}
    </>
  )
}
export default Issuecontent

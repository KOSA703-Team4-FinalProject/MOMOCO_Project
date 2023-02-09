import { CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateissueNumber } from 'src/store'

const box = {
  width: '600px',
  height: '125px',
}

const Issuecontent = (props) => {
  const dispatch = useDispatch()

  const makeLink = (e) => {
    dispatch(updateissueNumber(e.target.value))
  }

  let issue = props.issuelist
  return (
    <>
      {issue.map((Item, i) => (
        <div key={i}>
          <CCard style={box}>
            <CCardHeader>
              <CButton onClick={makeLink} value={Item.idx}>
                {Item.idx}
              </CButton>
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

import { CModal, CModalHeader, CModalTitle } from '@coreui/react'

import { useDispatch, useSelector } from 'react-redux'

import Issuecontent from 'src/components/Issuecontent'
import { updateIssueModal, updateissueNumber } from 'src/store'

const boxsize = {
  width: '620px',
  height: '400px',
  overflowY: 'scroll',
}
function Issues(props) {
  let issue = props.issuelist
  const issueModal = useSelector((state) => state.issueModal) //issueModal 값가져옴
  const dispatch = useDispatch() //issueModal함수를 쓰기위해 선언
  const issueNumber = useSelector((state) => state.issueNumber)

  const getMakeLink = (num) => {
    console.log('이거 잘되는 건가' + num)
    console.log('업데이트가 되었나' + issueNumber)
  }
  const view = (issueModal) => {
    if (issueModal === '#' || issueModal === '@') {
      return true
    } else {
      return false
    }
  }
  return (
    <>
      <CModal
        visible={issueModal}
        style={boxsize}
        keyboard={true}
        onClose={() => dispatch(updateIssueModal(issueModal))} //함수를 씀
      >
        <CModalHeader>
          <CModalTitle>
            <strong>Issue List</strong>
          </CModalTitle>
        </CModalHeader>

        <div>
          <Issuecontent issuelist={issue} getMakeLink={getMakeLink} value={getMakeLink} />
        </div>
      </CModal>
    </>
  )
}
export default Issues

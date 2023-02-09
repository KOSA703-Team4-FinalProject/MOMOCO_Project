import { useDispatch, useSelector } from 'react-redux'

export const onKeyUp = (e) => {
  const dispatch = useDispatch()
  const issueModal = useSelector((state) => state.issueModal)
  if (e.keyCode === 51 || e.keyCode === 50) {
    dispatch(updateIssueModal(!issueModal))

    console.log('눌러줌눌러줌눌러줌')
    console.log('원래값' + e.target.value)
    issuelist.map((item, i) => {
      if (e.target.value === '#' + issuelist[i].idx || e.target.value === '@' + issuelist[i].idx) {
        console.log(issuelist[i].title)
      }
    })
  }
}

export const onKeyUp = (e) => {
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

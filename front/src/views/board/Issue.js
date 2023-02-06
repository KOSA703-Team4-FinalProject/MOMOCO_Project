import { CCard, CCardHeader, CListGroup, CListGroupItem } from '@coreui/react'

const issuelist = [
  {
    idx: '1234',
    title: '이거해결바람',
    url: 'www/1234',
  },
  {
    idx: '3000',
    title: '이것좀 도와줘요',
    url: 'www/3000',
  },
  {
    idx: '5000',
    title: '이유를 봐주세용',
    url: 'www/5000',
  },
];

const Issue = () => {
  return (
    <>
      <CCard style={{ width: '18rem' }}>
        <CCardHeader>Header</CCardHeader>
        <CListGroup flush>
          <CListGroupItem>Cras justo odio</CListGroupItem>
          <CListGroupItem>Dapibus ac facilisis in</CListGroupItem>
          <CListGroupItem>Vestibulum at eros</CListGroupItem>
        </CListGroup>
      </CCard>
    </>
  )
}
export default Issue;

import Pagination from 'react-js-pagination'
import './Pagination.css'
export const Paging = ({ page, count, setPage }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={setPage}
    />
  )
}

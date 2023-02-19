import React, { useState } from 'react'
import Pagination from 'react-js-pagination'

function Paging() {
  const [page, setPage] = useState(1)

  const handlePageChange = (page) => {
    setPage(page)
  }

  const boardlist = [] // boardlist 변수를 정의하거나 다른 값으로 변경

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={boardlist.length} // boardlist 변수에 따라 수정
      pageRangeDisplayed={5}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  )
}

export default Paging

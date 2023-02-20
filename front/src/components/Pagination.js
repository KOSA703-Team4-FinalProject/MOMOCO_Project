const PAGES_PER_LIST = 5

export default function Pagination({ totalPage, currentPage, setCurrentPage }) {
  const [showingNum, setShowingNum] = useState({
    start: 1,
    end: PAGES_PER_LIST,
  })

  const changePageNumbersBackward = () => {
    currentPage > PAGES_PER_LIST && setShowingNum((prev) => arrowHandler(prev, -1, totalPage))
  }

  const changePageNumberForward = () => {
    showingNum.end <= totalPage && setShowingNum((prev) => arrowHandler(prev, 1, totalPage))
  }

  useEffect(() => {
    const lessThanFive = totalPage <= PAGES_PER_LIST
    lessThanFive
      ? setShowingNum((prev) => ({ ...prev, start: 1, end: totalPage }))
      : setShowingNum((prev) => ({ ...prev, start: 1, end: PAGES_PER_LIST }))
  }, [totalPage])

  useEffect(() => {
    setCurrentPage(showingNum.start)
  }, [showingNum, setCurrentPage])

  const isFirstPage = showingNum.start === 1
  const isLastPage = showingNum.end === totalPage
  const pages = getEmptyArray(showingNum.start, showingNum.end)

  return (
    <PageListContainer>
      <ArrowButton
        type="back"
        inActive={isFirstPage}
        disabled={isFirstPage}
        changePageNumbersBackward={changePageNumbersBackward}
      />
      {pages.map((page, idx) => {
        return (
          <PageButton
            key={`pageNumber-${idx + 1}`}
            page={page}
            setCurrentPage={setCurrentPage}
            isActive={page === currentPage}
          />
        )
      })}
      <ArrowButton
        type="next"
        inActive={isLastPage}
        disabled={isLastPage}
        changePageNumberForward={changePageNumberForward}
      />
    </PageListContainer>
  )
}

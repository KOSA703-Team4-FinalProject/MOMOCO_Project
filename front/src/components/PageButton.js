function PageButton({ page, setCurrentPage, isActive }) {
  const handleClickButton = () => {
    setCurrentPage(page)
  }

  return (
    <PageButtonContainer isActive={isActive}>
      <StyledButton onClick={handleClickButton} isActive={isActive}>
        {page}
      </StyledButton>
    </PageButtonContainer>
  )
}

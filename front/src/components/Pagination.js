import React from 'react'
import styled from 'styled-components'

export default function Pagination({ pages, pageClick, currentPage, changePage }) {
  return (
    <PageWrapper>
      <ChangeBtn onClick={changePage} id="prev">
        <i className="fas fa-arrow-left" />
      </ChangeBtn>
      <PageListBox>
        {pages.map((page) => {
          return (
            <PageBtn isSelectedPage={currentPage === page} id={page} key={page} onClick={pageClick}>
              {page}
            </PageBtn>
          )
        })}
      </PageListBox>

      <ChangeBtn onClick={changePage} name="next">
        <i className="fas fa-arrow-right" />
      </ChangeBtn>
    </PageWrapper>
  )
}

const PageWrapper = styled.div`
  ${({ theme }) => theme.flexMixin('center', 'center')};
  margin: 20px 0 30px 0;
`

const PageListBox = styled.ul`
  ${({ theme }) => theme.flexMixin('center', 'center')};
`

const PageBtn = styled.li`
  width: 40px;
  height: 40px;
  padding: 10px;
  color: ${({ isSelectedPage }) => (isSelectedPage ? 'black' : '#ccc')};
  border: ${({ isSelectedPage }) => (isSelectedPage ? '1px solid black' : '1px solid #ccc')};
  text-align: center;
  cursor: pointer;
  &:last-child {
    border-right: 1px solid #ccc;
  }
  &:hover {
    border: 1px solid black;
    color: black;
  }
`

const ChangeBtn = styled.button`
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  color: #ccc;
  background: transparent;
  text-align: center;
  cursor: pointer;
  &:hover {
    border: 1px solid black;
    color: black;
  }
`

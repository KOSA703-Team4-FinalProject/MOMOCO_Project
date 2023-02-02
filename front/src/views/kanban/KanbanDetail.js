import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

const KanbanDetail = () => {
  const [visible, setVisible] = useState(false)
  const labelselect = {
    width: '300px',
  }

  return (
    <>
      <CCard className="col-md-12 container-fluid" visible={visible}>
        <CIcon icon={icon.cibGithub} className="me-2" />
        <CFormLabel htmlFor="exampleFormControlInput1">Item</CFormLabel>
        <CFormInput type="title" id="exampleFormControlInput1" placeholder="받아온 제목" />

        <hr />
        <CFormSelect
          aria-label="받아온 상태"
          options={[
            '받아온 상태',
            { label: '상태1', value: '1' },
            { label: '상태2', value: '2' },
            { label: '상태3', value: '3' },
          ]}
        />
        <br />

        <CFormTextarea
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="내용을 입력해주세요"
        ></CFormTextarea>

        <br />

        <div align="right">
          <CButton variant="outline" onClick={() => setVisible(!visible)}>
            Edit
          </CButton>
        </div>
      </CCard>
    </>
  )
}

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: tomato;
  }
`

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 6px;
  color: white;
  font-size: 13px;
`
//버튼
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`
const Text = styled.span``

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`
export default KanbanDetail

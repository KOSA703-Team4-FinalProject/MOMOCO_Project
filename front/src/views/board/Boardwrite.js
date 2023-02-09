import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import React, { Component, useEffect, useRef, useState } from 'react'

import { Link, NavLink, useParams } from 'react-router-dom'

import issuelist from './issuelist'
import { useDispatch, useSelector } from 'react-redux'
import { updateIssueModal, updateissueNumber } from 'src/store'

const Boardwirte = (props) => {
  const dispatch = useDispatch()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)
  const labelselect = {
    width: '300px',
  }

  //이슈번호 입력했을 때
  const onKeyUP = (e) => {
    if (e.keyCode === 51 || e.keyCode === 50) {
      dispatch(updateIssueModal(!issueModal))
      issuelist.map((item, i) => {
        if (
          e.target.value === '#' + issuelist[i].idx ||
          e.target.value === '@' + issuelist[i].idx
        ) {
          console.log(issuelist[i].title)
        }
      })
    }
  }
  //제목란에 클릭한 이슈번호 넣기
  const [inputs, setInputs] = useState('')
  const change = (e) => {
    setInputs(e.target.value)
  }

  //워크스페이스 주소값
  const params = useParams()
  console.log(params.url)
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}></CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <CCol>
            <CCol className="container-fluid">
              <CRow className="row">
                <CCol className="col-md-12">
                  <CCol className="row">
                    <CCol className="col-md-3">
                      <label>
                        <strong>라벨</strong>
                      </label>
                      <br></br>
                      <CFormSelect
                        style={labelselect}
                        aria-label="라벨"
                        options={[
                          'Open this select menu',
                          { label: 'One', value: '1' },
                          { label: 'Two', value: '2' },
                          { label: 'Three', value: '3', disabled: true },
                        ]}
                      />
                    </CCol>
                    <CCol className="col-md-9" align="left">
                      <label>
                        <strong>제목</strong> <strong>이슈번호:{issueNumber}</strong>
                      </label>
                      <br></br>
                      <CFormInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        aria-label="default input example"
                        onKeyUp={onKeyUP}
                        onChange={change}
                      />
                    </CCol>
                  </CCol>
                  <br></br>
                  <CCol className="row">
                    <CCol className="col-md-12">
                      <label>
                        <strong>파일</strong>
                      </label>
                      <br></br>
                      <CCol className="mb-3">
                        <CFormInput type="file" id="formFile" />
                      </CCol>
                    </CCol>
                  </CCol>
                  <CCol className="row">
                    <CCol className="col-md-4">
                      <label>
                        <strong>알림</strong>
                      </label>{' '}
                      <br></br>&nbsp;
                      <CFormCheck inline id="inlineCheckbox1" value="option1" label="전체보내기" />
                      <CFormCheck inline id="inlineCheckbox2" value="option2" />
                      <CAvatar
                        className="ms-2"
                        src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
                      />
                      메타몽 &nbsp;
                      <CFormCheck
                        inline
                        id="inlineCheckbox3"
                        value="option3"
                        label="오리"
                        disabled
                      />
                    </CCol>
                    <CCol className="col-md-4"></CCol>
                    <CCol className="col-md-4"></CCol>
                  </CCol>

                  <br></br>
                  <CCol className="row">
                    <CCol className="col-md-12">
                      <Editor
                        apiKey="avqk22ebgv68f2q9uzprdbapxmxjwdbke8xixhbo24x2iyvp"
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                          ],
                          toolbar:
                            'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style:
                            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                      />

                      <br></br>
                      <CCol align="right">
                        <Link to="/boardlist">
                          <CButton variant="outline">글쓰기</CButton>
                        </Link>
                      </CCol>
                    </CCol>
                  </CCol>
                  <CCol className="row">
                    <CCol className="col-md-12"></CCol>
                  </CCol>
                </CCol>
              </CRow>
            </CCol>
          </CCol>
        </CCardBody>
      </CCard>
    </>
  )
}
export default Boardwirte

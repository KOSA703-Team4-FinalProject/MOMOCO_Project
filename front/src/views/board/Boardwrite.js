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
import { AiFillBell } from 'react-icons/ai'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import $ from 'jquery'

const Boardwirte = (props) => {
  const dispatch = useDispatch()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)

  //워크스페이스 주소값
  const params = useParams()
  console.log(params.url + 'hahah')

  const labelselect = {
    width: '200px',
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
  const [issue, setIssue] = useState('')
  const change = (e) => {
    setInputs(e.target.value)
  }

  const [content, setContent] = useState('')
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))

  const getIssue = (e) => {
    setIssue(e.target.value)
    console.log('이슈번호' + e.target.value)
  }

  const handleEditorChange = (content) => {
    setContent(content)
    console.log('내용' + content)
  }

  const myparams = {
    url: params.url,
  }
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  const [boardcontent, setBoardcontent] = useState([])
  useEffect(() => {})
  //파일 업로드
  const [file, setFile] = useState(null)
  const handleChangeFile = (e) => {
    setFile(e.target.files)
  }
  console.log(file)
  //파일업로드 글작성
  const send = () => {
    const fd = new FormData()
    Object.values(file).forEach((file) => fd.append('file', file))

    const write = {
      url: params.url,
      title: $('#issue').val() + ' ' + $('#title').val(),
      nickname: login.nickname,
      ori_filename: file[0].name,
      content: content,
      filesize: file[0].size,
    }
    console.log('파일사이즈' + file[0].size)
    axios({
      method: 'post',
      url: '/board/boardwrite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/form-data; `,
      },

      data: write,
    }).then((res) => {
      setBoardcontent(res.data)
    })
    console.log(write)
  }
  console.log(file)
  console.log('wpahr' + $('#title').val())
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
                    <CCol className="col-md-2" align="left">
                      <label>
                        <strong>라벨</strong>
                      </label>
                      <br></br>
                      <CFormSelect
                        style={labelselect}
                        name="issue"
                        aria-label="라벨"
                        options={[
                          '선택하세요',
                          { label: 'One', value: '1' },
                          { label: 'Two', value: '2' },
                          { label: 'Three', value: '3' },
                        ]}
                      />
                    </CCol>
                    <CCol className="col-md-2 ps-3" align="left">
                      <label>
                        <strong>이슈번호</strong>
                      </label>
                      <br></br>
                      <CFormInput
                        type="text"
                        placeholder="참조이슈번호"
                        aria-label="default input example"
                        onKeyUp={onKeyUP}
                        id="issue"
                        value={issueNumber}
                        onChange={getIssue}
                      />
                    </CCol>
                    <CCol className="col-md-8 ps-1" align="left">
                      <label>
                        <strong>{}</strong>
                      </label>
                      <br></br>
                      <CFormInput
                        id="title"
                        type="text"
                        placeholder="제목을 입력하세요"
                        aria-label="default input example"
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
                        <CFormInput
                          type="file"
                          id="file"
                          onChange={handleChangeFile}
                          multiple="multiple"
                          value={boardcontent.ori_filename}
                        />
                      </CCol>
                    </CCol>
                  </CCol>
                  <CCol className="row">
                    <CCol className="col-md-4">
                      <label>
                        <strong>알림</strong>
                      </label>
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
                        onEditorChange={handleEditorChange}
                        value={content.content}
                        id="tinyEditor"
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
                        <Link to={`/ws/${params.url}/boardlist`}>
                          <CButton variant="outline" onClick={send}>
                            글쓰기
                          </CButton>
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

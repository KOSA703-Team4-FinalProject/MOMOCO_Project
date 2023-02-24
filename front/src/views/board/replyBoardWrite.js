import {
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormLabel,
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
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import $, { data, param } from 'jquery'
import Swal from 'sweetalert2'
import Boardlist from './Boardlist'

const replyBoardWrite = () => {
  const dispatch = useDispatch()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)
  const [u_idxlist, SetU_idxlist] = useState([]) //알림
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
  const [alarmList, setAlarmList] = useState('') //알람 보낼 u_idx 리스트

  //알림 전송할 u_idx List 생성
  const checkAList = (e) => {
    const result = e.target.checked
    const u_idx = e.target.value

    if (result == true) {
      setAlarmList(alarmList + ',' + u_idx)
    } else {
      const str = alarmList.split(',')
      setAlarmList([])

      str.map((res) => {
        if (res != u_idx) {
          setAlarmList(alarmList + ',' + u_idx)
        }
      })
    }
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/alarm/teamlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        url: params.url,
      },
    }).then((res) => {
      console.log(res)
      SetU_idxlist([])

      res.data.map((data) => {
        SetU_idxlist((u_idxlist) => [...u_idxlist, data])
      })
    })
  }, [])

  //파일 업로드
  const [filevalues, setFilevalues] = useState('')
  const fileChange = (e) => {
    console.log(e.target.files[0])
    setFilevalues(e.target.files[0])
  }
  const [ref, setRef] = useState(parseInt(params.b_idx))
  const [step, setStep] = useState(parseInt(params.step))
  const [depth, setDepth] = useState(parseInt(params.depth))

  //답글 작성
  const replysend = () => {
    // 이전 step과 depth 값 저장
    const prevStep = step
    const prevDepth = depth

    if (parseInt(params.b_idx) === parseInt(params.ref)) {
      setStep(prevStep + 1)
      setDepth(prevDepth + 1)
    }

    const write = {
      url: params.url,
      title: $('#issue').val() + ' ' + $('#title').val(),
      nickname: login.nickname,
      content: content,
      b_code: 5,
      u_idx: login.u_idx,
      u_idxList: alarmList,
      label: '.',
      step: prevStep + 1,
      ref: ref,
      depth: prevDepth + 1,
    }

    console.log(write.url)
    const fd = new FormData()
    fd.append('file', filevalues)
    fd.append('write1', JSON.stringify(write))
    axios({
      method: 'POST',
      url: '/board/relyboardwrite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/form-data; `,
      },
      data: fd,
    }).then((res) => {
      setBoardcontent(res.data)
    })
  }
  console.log(u_idxlist)
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
                        <strong>제목</strong>
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
                          onChange={fileChange}
                          multiple="multiple"
                          value={boardcontent.ori_filename}
                        />
                      </CCol>
                    </CCol>
                  </CCol>
                  <CCol className="row">
                    <CCol className="col-md-12">
                      <CRow>
                        <CFormLabel className="col-sm-2 col-form-label">
                          <strong>알림</strong>
                        </CFormLabel>
                        <CCol sm={10}>
                          <CRow>
                            {u_idxlist.map((data, key) => (
                              <div className="col" key={data.u_idx}>
                                <CFormCheck
                                  onChange={checkAList}
                                  inline
                                  name="u_idx"
                                  value={data.u_idx}
                                  label={
                                    <div>
                                      <CAvatar className="ms-2" src={data.profilephoto} />
                                      {data.nickname}
                                    </div>
                                  }
                                />
                              </div>
                            ))}
                          </CRow>
                        </CCol>
                      </CRow>
                    </CCol>
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
                          forced_root_block: false,
                        }}
                      />

                      <br></br>
                      <CCol align="right">
                        <Link to={`/ws/${params.url}/boardlist`}>
                          <CButton variant="outline" onClick={replysend}>
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
export default replyBoardWrite

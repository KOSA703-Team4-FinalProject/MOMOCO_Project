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
import { Editor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { PRIMARY_KEY } from 'src/oauth'
import axios from 'axios'

const Boardedit = () => {
  const labelselect = {
    width: '300px',
  }

  const params = useParams()
  const myparams = {
    url: params.url,
    idx: params.idx,
  }

  const [boardcontent, setBoardcontent] = useState({}) //비동기로 불러온 기존
  const [content, setContent] = useState('') //수정에 들어갈 글 내용
  const [newFile, setNewFile] = useState('') // 파일 수정
  const [newTitle, setNewTitle] = useState('') // 제목수정
  const [u_idxlist, SetU_idxlist] = useState([]) //알림
  const [alarmList, setAlarmList] = useState('') //알람 보낼 u_idx 리스트
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value)
  }
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
      method: 'POST',
      url: '/board/boardcontent',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      setBoardcontent(res.data)
      setNewTitle(res.data.title)
      setContent(res.data.content)
    })

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

  //글 내용 업데이트
  const handleEditorChange = (data) => {
    setContent(data)
  }

  //파일수정
  const fileChange1 = (event) => {
    const files = event.target.files
    setNewFile(files[0])
  }

  //수정 글작성
  const editcontent = () => {
    const edit = {
      url: params.url,
      idx: params.idx,
      content: content,
      title: newTitle,
      label: '.',
      u_idxList: alarmList,
    }
    console.log(edit)
    const fd = new FormData()
    fd.append('file', newFile)
    fd.append('edit', JSON.stringify(edit))
    axios({
      method: 'POST',
      url: '/board/boardmodify',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/form-data; `,
      },
      data: fd,
    }).then((res) => {
      console.log(res.data)
    })
  }

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
                        <strong>제목</strong>
                      </label>
                      <br></br>
                      <CFormInput
                        type="text"
                        aria-label="default input example"
                        value={newTitle}
                        onChange={handleTitleChange} // 입력 값이 변경될 때마다 호출
                      />
                    </CCol>
                  </CCol>
                  <br></br>
                  <CRow className="row">
                    <CCol className="col-md-12">
                      <label>
                        <strong>파일</strong>
                      </label>
                      <br></br>
                      <CCol className="mb-3">
                        <CFormInput
                          type="file"
                          id="file-input"
                          onChange={fileChange1}
                          multiple="multiple"
                        />
                        {boardcontent.ori_filename && (
                          <div>파일명: {boardcontent.ori_filename}</div>
                        )}
                        {newFile && <div>새로운 파일명: {newFile.name}</div>}
                      </CCol>
                    </CCol>
                  </CRow>
                  <CCol className="row">
                    <CCol className="col-md-12">
                      <CRow>
                        <CFormLabel className="col-sm-2 col-form-label">
                          <strong>알림</strong>
                        </CFormLabel>
                        <CCol sm={10}>
                          <CFormCheck
                            inline
                            id="inlineCheckbox1"
                            value="option1"
                            label="전체보내기"
                          />
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
                    <CCol className="col-md-4"></CCol>
                    <CCol className="col-md-4"></CCol>
                  </CCol>

                  <br></br>
                  <CRow className="row">
                    <CCol className="col-md-12">
                      <Editor
                        onEditorChange={handleEditorChange}
                        value={content}
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
                          <CButton variant="outline" onClick={editcontent}>
                            수정하기
                          </CButton>{' '}
                        </Link>
                        &nbsp;
                        <Link to={`/ws/${params.url}/boardlist`}>
                          <CButton variant="outline">목록으로</CButton>
                        </Link>
                      </CCol>
                    </CCol>
                  </CRow>
                  <div className="row">
                    <div className="col-md-12"></div>
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CCol>
        </CCardBody>
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

export default Boardedit

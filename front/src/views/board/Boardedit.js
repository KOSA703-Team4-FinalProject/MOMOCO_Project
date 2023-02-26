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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { PRIMARY_KEY } from 'src/oauth'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Octokit } from 'octokit'
import Label from 'src/components/Label'
import $ from 'jquery'
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
  const [label, SetLabel] = useState('　')
  const [style, SetStyle] = useState('')
  const [commitsList, setCommitsList] = useState([])
  const [listview, setListView] = useState(false)
  const chooseLabel = useSelector((state) => state.chooseLabel)
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  console.log(boardcontent)
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
  useEffect(() => {
    SetLabel(chooseLabel.label)
    SetStyle(chooseLabel.style)
  }, [chooseLabel])
  //수정 글작성
  const editcontent = () => {
    const edit = {
      url: params.url,
      idx: params.idx,
      content: content,
      title: newTitle,
      label: label,
      u_idxList: alarmList,
    }
    console.log(edit)
    const fd = new FormData()
    fd.append('file', newFile)
    fd.append('edit', JSON.stringify(edit))
    if (newTitle != '' && content != '' && label != '' && alarmList != '') {
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
    } else {
      alert('입력하지 않은 항목이 있습니다. ex.제목/내용/라벨/알림')
    }
  }
  //github에서 이슈 불러오기
  const loadIssue = () => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      getIssue(res.data)
    })
  }

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  const getIssue = (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    octokit
      .request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {
        console.log(res.data)
        setCommitsList(() => [])
        res.data.map((d) => {
          setCommitsList((commitsList) => [...commitsList, d])
        })
        setListView(true)
      })
  }

  //이슈 클릭시 content에 추가
  const clickIssue = (e) => {
    const tar = e.target
    const targ = $(tar).closest('.issue').attr('issueSrc')
    const title = $(tar).closest('.issue').attr('title')
    const num = $(tar).closest('.issue').attr('num')

    $('#title').val('#' + num + ' ' + title)
    setContent((content) => content + targ)

    setListView(false)
  }
  return (
    <>
      <CCard className="draggable px-4 py-3" draggable="true">
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
                    <CRow className="mb-3">
                      <CFormLabel className="col-sm-2 col-form-label">
                        <strong>라벨 선택 </strong>
                        {chooseLabel.label != '' ? (
                          <CButton color={chooseLabel.style} shape="rounded-pill" size="sm">
                            {chooseLabel.label}
                          </CButton>
                        ) : (
                          <strong>하세요</strong>
                        )}
                      </CFormLabel>
                      <CCol sm={8}>
                        <CCol className="mb-3">
                          <Label />
                        </CCol>
                      </CCol>
                      <CCol sm={2}>
                        <CCol align="left">
                          <CButton
                            color="primary"
                            variant="outline"
                            className="mt-1"
                            onClick={loadIssue}
                          >
                            Issue 불러오기
                          </CButton>
                        </CCol>
                      </CCol>
                    </CRow>
                    <CCol className="col-md-9" align="left">
                      <label>
                        <strong>글 제목</strong>
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

                  <CRow>
                    <CFormLabel className="col-sm-2 col-form-label">
                      <strong>알림 전송</strong>
                    </CFormLabel>
                    <CCol sm={10}>
                      {u_idxlist.map((data) => {
                        return (
                          <>
                            <CBadge color="light" textColor="black" className="ms-6 m-1">
                              <CFormCheck
                                inline
                                name="u_idx"
                                value={data.u_idx}
                                onChange={checkAList}
                              />
                              <CAvatar size="sm" className="me-1" src={data.profilephoto} />
                              <strong>{data.nickname}</strong>
                            </CBadge>
                          </>
                        )
                      })}
                    </CCol>
                  </CRow>

                  <CCol className="col-md-4"></CCol>
                  <CCol className="col-md-4"></CCol>

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
                          </CButton>
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
          {/* 이슈 불러오기 목록 */}
          <CModal
            alignment="center"
            scrollable
            backdrop="static"
            visible={listview}
            onClose={() => setListView(false)}
          >
            <CModalHeader onClose={() => setListView(false)}>
              <CModalTitle>Issue List</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {commitsList.map((data) => {
                return (
                  <CCard
                    key={data.id}
                    className="my-3 p-3 issue"
                    issueSrc={data.html_url}
                    title={data.title}
                    num={data.number}
                    onClick={clickIssue}
                  >
                    <CCard className="p-2 mt-2">
                      <h5>
                        <strong>{data.title}</strong>
                      </h5>
                    </CCard>

                    <div align="end" className="m-2">
                      <CAvatar src={data.user.avatar_url} className="me-2" />
                      {data.user.login}
                    </div>

                    {data.body}
                  </CCard>
                )
              })}
            </CModalBody>
          </CModal>
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

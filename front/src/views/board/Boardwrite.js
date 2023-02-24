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
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import issuelist from './issuelist'
import { useDispatch, useSelector } from 'react-redux'
import { updateIssueModal } from 'src/store'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import $ from 'jquery'
import { Octokit } from 'octokit'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const Boardwirte = () => {
  const dispatch = useDispatch()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)
  const [u_idxlist, SetU_idxlist] = useState([]) //알림

  const [commitsList, setCommitsList] = useState([])
  const [listview, setListView] = useState(false)

  const [codeContent, setCodeContent] = useState('<h1>hhahaha</h1>') //code 편집기 내용

  //워크스페이스 주소값
  const params = useParams()

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

  const [step, setStep] = useState(0)
  const [depth, setDepth] = useState(0)
  //파일업로드 글작성
  const send = () => {
    const write = {
      url: params.url,
      title: $('#title').val(),
      nickname: login.nickname,
      content: content,
      b_code: 5,
      u_idx: login.u_idx,
      u_idxList: alarmList,
      label: '.',
      step: step,
      depth: depth,
    }
    //계층형 만들기
    console.log(write.url)
    const fd = new FormData()
    fd.append('file', filevalues)
    fd.append('write1', JSON.stringify(write))

    axios({
      method: 'POST',
      url: '/board/boardwrite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': `multipart/form-data; `,
      },

      data: fd,
    }).then((res) => {
      setBoardcontent(res.data)
    })
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
    setContent(targ)

    setListView(false)
  }

  //code 편집기 내용 변경 시
  const codewrite = (arg1, arg2) => {
    console.log('value: ' + arg1)
    console.log(arg2)
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
                    <CCol className="col-md-2 ps-3 mt-3" align="left">
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
                        <CCol sm={9}>
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
                        <CCol sm={1}>
                          <CButton color="primary" variant="outline">
                            Code
                          </CButton>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CCol>
                  <br></br>
                  <CRow>
                    <CCol md={12}>
                      <CRow>
                        <CCol md={6}>
                          <Editor
                            onEditorChange={handleEditorChange}
                            value={content.content}
                            initialValue={content}
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
                        </CCol>
                        <CCol md={6}>
                          <AceEditor
                            mode="java"
                            theme="monokai"
                            name="codeEditor"
                            editorProps={{ $blockScrolling: true }}
                            setOptions={{
                              enableBasicAutocompletion: true,
                              enableLiveAutocompletion: true,
                              enableSnippets: true,
                            }}
                            value={codeContent}
                            width="100%"
                            fontSize={20}
                            onChange={codewrite}
                          />
                        </CCol>
                      </CRow>

                      <br></br>
                      <CCol align="right">
                        <Link to={`/ws/${params.url}/boardlist`}>
                          <CButton variant="outline" onClick={send}>
                            글쓰기
                          </CButton>
                        </Link>
                      </CCol>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CCol>
        </CCardBody>
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
      </CCard>
    </>
  )
}
export default Boardwirte

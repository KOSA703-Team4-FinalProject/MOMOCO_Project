import React from 'react'
import { CBadge, CCard, CForm, CModal, CModalHeader, CModalBody, CModalTitle } from '@coreui/react'
import { CRow, CFormLabel, CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { CCardBody } from '@coreui/react'
import { CButton } from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { CFormCheck } from '@coreui/react'
import { CAvatar } from '@coreui/react'
import { PRIMARY_KEY } from '../../oauth'
import axios from 'axios'
import Label from 'src/components/Label'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import CryptoJS from 'crypto-js'
import $ from 'jquery'
import { Octokit } from 'octokit'

const Boardwirte = () => {
  const [title, SetTitle] = useState('')
  const [content, SetContent] = useState('')
  const [label, SetLabel] = useState('　')
  const [style, SetStyle] = useState('')
  const [u_idxlist, SetU_idxlist] = useState([]) //워크스페이스 유저
  const [alarmList, SetAlarmList] = useState('') //알람 보낼 리스트
  const navigate = useNavigate()
  const issueModal = useSelector((state) => state.issueModal)
  const issueNumber = useSelector((state) => state.issueNumber)
  const [commitsList, setCommitsList] = useState([])
  const [listview, setListView] = useState(false)

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  const login = JSON.parse(localStorage.getItem('login'))
  const params = useParams()

  const dispatch = useDispatch()
  const chooseLabel = useSelector((state) => state.chooseLabel)

  const titleHandler = (e) => {
    e.preventDefault()
    SetTitle(e.target.value)
  }

  const EditorHandler = (e) => {
    SetContent(e)
  }

  useEffect(() => {
    SetLabel(chooseLabel.label)
    SetStyle(chooseLabel.style)
  }, [chooseLabel])

  //알림 팀원 불러오기
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

  //알림 전송할 u_idx List 생성
  const checkAList = (e) => {
    const result = e.target.checked
    const u_idx = e.target.value

    if (result == true) {
      SetAlarmList(alarmList + ',' + u_idx)
    } else {
      const str = alarmList.split(',')
      SetAlarmList([])

      str.map((res) => {
        if (res != u_idx) {
          SetAlarmList(alarmList + ',' + u_idx)
        }
      })
    }
  }

  //파일 업로드
  const [filevalues, setFilevalues] = useState('')
  const fileChange = (e) => {
    console.log(e.target.files[0])
    setFilevalues(e.target.files[0])
  }

  //파일업로드 글작성
  const SubmitHandler = (e) => {
    const write = {
      url: params.url,
      title: title,
      nickname: login.nickname,
      content: content,
      b_code: 5,
      u_idx: login.u_idx,
      u_idxList: alarmList,
      label: label,
      step: 0,
      depth: 0,
    }

    //계층형 만들기
    const fd = new FormData()
    fd.append('file', filevalues)
    fd.append('write1', JSON.stringify(write))
    if (title != '' && content != '' && label != '' && alarmList != '') {
      axios({
        method: 'POST',
        url: '/board/boardwrite',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/form-data; `,
        },

        data: fd,
      }).then((res) => {
        navigate(`/ws/${params.url}/boardlist`)
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
    SetContent((content) => content + targ)

    setListView(false)
  }

  return (
    <CCard className="draggable px-4 py-3" draggable="true">
      <CForm onSubmit={SubmitHandler}>
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
              <CButton color="primary" variant="outline" className="mt-1" onClick={loadIssue}>
                Issue 불러오기
              </CButton>
            </CCol>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">
            <strong> 글 제목</strong>
          </CFormLabel>
          <CCol sm={10}>
            <CCol className="mb-3">
              <CFormInput
                value={title}
                onChange={titleHandler}
                placeholder="글 제목"
                aria-describedby="exampleFormControlInputHelpInline"
                required
              />
            </CCol>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol sm={2}>
            <CFormLabel className="col-form-label">
              <strong>파일/이미지</strong>
            </CFormLabel>
          </CCol>
          <CCol sm={10}>
            <CCol className="mb-3">
              <CFormInput
                onChange={fileChange}
                enctype="multipart/form-data"
                type="file"
                multiple="multiple"
                id="formFile"
              />
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
                    <CFormCheck inline name="u_idx" value={data.u_idx} onChange={checkAList} />
                    <CAvatar size="sm" className="me-1" src={data.profilephoto} />
                    <strong>{data.nickname}</strong>
                  </CBadge>
                </>
              )
            })}
          </CCol>
        </CRow>
        <CCardBody>
          <Editor
            onEditorChange={EditorHandler}
            value={content.content}
            initialValue={content}
            id="tinyEditor"
            apiKey="avqk22ebgv68f2q9uzprdbapxmxjwdbke8xixhbo24x2iyvp"
            init={{
              height: 400,
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
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              forced_root_block: false,
            }}
          />
          <br></br>
          <div align="right">
            <CButton type="submit">등록</CButton>
          </div>
        </CCardBody>
      </CForm>

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
  )
}
export default Boardwirte

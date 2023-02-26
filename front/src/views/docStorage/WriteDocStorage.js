import React from 'react'
import { CBadge, CCard, CForm, CModal, CModalHeader, CModalBody, CModalTitle } from '@coreui/react'
import { CRow, CFormLabel, CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { CCardBody } from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import { CButton } from '@coreui/react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { CFormCheck } from '@coreui/react'
import { CAvatar } from '@coreui/react'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import axios from 'axios'
import { CFormSelect } from '@coreui/react'
import Label from 'src/components/Label'
import { useDispatch, useSelector } from 'react-redux'
import { chooseLabel } from 'src/store'
import { useEffect } from 'react'
import { Octokit } from 'octokit'
import $ from 'jquery'

const WriteDocStorage = () => {
  const [title, SetTitle] = useState('')
  const [content, SetContent] = useState('')
  const [label, SetLabel] = useState('')
  const [style, SetStyle] = useState('')
  const [orifile, SetOrifile] = useState(null)
  const [depth, SetDepth] = useState('')
  const [step, SetStep] = useState('')
  const [upload_type, SetUpload_type] = useState('')
  const [link, SetLink] = useState('')
  const [u_idxlist, SetU_idxlist] = useState([]) //워크스페이스 유저
  const [alarmlist, SetAlarmList] = useState('') //알람 보낼 리스트
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
  const nickname = login.nickname
  const u_idx = login.u_idx
  const params = useParams()
  const url = params.url

  const dispatch = useDispatch()
  const chooseLabel = useSelector((state) => state.chooseLabel)

  const titleHandler = (e) => {
    e.preventDefault()
    SetTitle(e.target.value)
  }

  const LinkHandler = (e) => {
    e.preventDefault()
    SetLink(e.target.value)
  }

  const FileHandler = (e) => {
    e.preventDefault()
    SetOrifile(e.target.files[0])
    console.log(e.target.files[0])
  }

  const EditorHandler = (e) => {
    SetContent(e)
  }

  const TypeHandler = (e) => {
    e.preventDefault()
    SetUpload_type(e.target.value)
    console.log(e.target.value)
    if (e.target.value == 'none') {
      SetUpload_type('link')
      SetLink('첨부파일 X')
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
        url: url,
      },
    }).then((res) => {
      console.log(res)
      SetU_idxlist([])

      res.data.map((data) => {
        SetU_idxlist((u_idxlist) => [...u_idxlist, data])
      })
    })
  }, [])

  useEffect(() => {
    SetLabel(chooseLabel.label)
    SetStyle(chooseLabel.style)
  }, [chooseLabel])

  const SubmitHandler = (e) => {
    e.preventDefault()
    //새 글 작성일 경우
    if (title != '' && content != '' && label != '' && alarmlist != '' && orifile != '') {
      if (upload_type === 'link' || upload_type === 'none') {
        // 링크 등록시
        const doc = {
          nickname: nickname,
          title: title,
          content: content,
          b_code: 3,
          label: label,
          u_idx: u_idx,
          url: url,
          upload_type: upload_type,
          ori_filename: link,
          save_filename: link,
          u_idxList: alarmlist,
        }

        try {
          axios({
            method: 'POST',
            url: '/doc/addDocLink',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: doc,
          }).then((res) => {
            if (res.data == 2) {
              alert('문서가 등록되었습니다.')
            }
            if (res.data != 2) {
              alert('문서 등록에 실패하였습니다.')
            }
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        // 파일, 이미지 등록시
        const formData = new FormData()
        const doc = {
          nickname: nickname,
          title: title,
          content: content,
          b_code: 3,
          label: label,
          u_idx: u_idx,
          url: url,
          upload_type: upload_type,
          u_idxList: alarmlist,
        }
        formData.append('file', orifile)
        formData.append('doc', JSON.stringify(doc))
        try {
          axios({
            method: 'POST',
            url: '/doc/addDoc',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': `multipart/form-data; `,
            },
            data: formData,
          }).then((res) => {
            if (res.data == 2) {
              alert('문서가 등록되었습니다.')
              navigate(`/ws/${url}/docStorage`)
            }
            if (res.data != 2) {
              alert('문서 등록에 실패하였습니다.')
              navigate(`/ws/${url}/docStorage`)
            }
          })
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      if (content == '') {
        alert('글 내용을 입력해주십시오.')
      } else if (label == '') {
        alert('라벨을 입력해주세요')
      } else if (alarmlist == '') {
        alert('알람 보낼 사람을 최소 1명 선택하세요')
      }
    }
  }
  //알림 전송할 u_idx List 생성
  const checkAList = (e) => {
    const result = e.target.checked
    const u_idx = e.target.value

    if (result == true) {
      SetAlarmList(alarmlist + ',' + u_idx)
    } else {
      const str = alarmlist.split(',')
      SetAlarmList([])

      str.map((res) => {
        if (res != u_idx) {
          SetAlarmList(alarmlist + ',' + u_idx)
        }
      })
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
    console.log(content)
    console.log(targ)
    console.log(title)

    SetContent((content) => content + '[#' + num + ' ' + title + '] ' + targ)

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
            <strong> 문서 제목</strong>
          </CFormLabel>
          <CCol sm={10}>
            <CCol className="mb-3">
              <CFormInput
                value={title}
                onChange={titleHandler}
                placeholder="문서 제목"
                aria-describedby="exampleFormControlInputHelpInline"
                required
              />
            </CCol>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol sm={2}>
            <CFormLabel className="col-form-label">
              <CFormSelect
                onChange={TypeHandler}
                name="issue"
                aria-label="타입"
                options={[
                  '파일 유형',
                  { label: '선택안함', value: 'none' },
                  { label: '이미지', value: 'image' },
                  { label: '파일', value: 'file' },
                  { label: '링크', value: 'link' },
                ]}
              />
            </CFormLabel>
          </CCol>
          <CCol sm={10}>
            <CCol className="mb-3">
              {upload_type === 'link' ? (
                <CFormInput
                  type="text"
                  placeholder="링크를 입력하세요"
                  onChange={LinkHandler}
                  value={link}
                ></CFormInput>
              ) : upload_type === 'none' ? null : (
                <CFormInput
                  onChange={FileHandler}
                  enctype="multipart/form-data"
                  type="file"
                  multiple="multiple"
                  id="formFile"
                />
              )}
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
            value={content}
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
            }}
          />
          <br></br>
          <div align="right">
            <CButton type="submit">등록</CButton>
          </div>
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
      </CForm>
    </CCard>
  )
}

export default WriteDocStorage

import React from 'react'
import { CForm } from '@coreui/react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormLabel,
} from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
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

const UpdateDocStorage = (props) => {
  console.log(props.doc)
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
  const [updatevisibleXL, setUpdateVisibleXL] = useState(false)

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
    if (title != '' && content != '' && label != '') {
      if (upload_type === 'link') {
        // 링크 등록시
        const doc = {
          idx: props.doc.idx,
          nickname: nickname,
          title: title,
          content: content,
          b_code: 3,
          label: label,
          u_idx: u_idx,
          url: url,
          depth: 0,
          step: 0,
          upload_type: upload_type,
          ori_filename: link,
          save_filename: link,
          u_idxList: alarmlist,
        }
        console.log(doc)
        try {
          axios({
            method: 'POST',
            url: '/doc/updateDocLink',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: doc,
          }).then((res) => {
            console.log(res.data)
            if (res.data == 2) {
              alert('문서가 수정되었습니다.')
              setUpdateVisibleXL(!updatevisibleXL)
            }
            if (res.data != 2) {
              alert('문서 수정에 실패하였습니다.')
            }
          })
        } catch (error) {
          console.error(error)
        }
      } else {
        // 파일, 이미지 등록시
        const formData = new FormData()
        const doc = {
          idx: props.doc.idx,
          nickname: nickname,
          title: title,
          content: content,
          b_code: 3,
          label: label,
          u_idx: u_idx,
          url: url,
          depth: 0,
          step: 0,
          upload_type: upload_type,
          u_idxList: alarmlist,
        }
        formData.append('file', orifile)
        formData.append('doc', JSON.stringify(doc))
        try {
          axios({
            method: 'POST',
            url: '/doc/updateDoc',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': `multipart/form-data; `,
            },
            data: formData,
          }).then((res) => {
            console.log(res.data)
            if (res.data == 1) {
              alert('문서가 수정되었습니다.')
              setUpdateVisibleXL(!updatevisibleXL)
            }
            if (res.data != 1) {
              alert('문서 수정에 실패하였습니다.')
            }
          })
        } catch (error) {
          console.error(error)
        }
      }
    } else {
      alert('입력하지 않은 항목이 있습니다. ex.알림대상/제목/내용/라벨/파일/이미지/링크')
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

  return (
    <>
      <CButton
        className="my-3 mx-1"
        color="dark"
        variant="outline"
        onClick={() => {
          setUpdateVisibleXL(!updatevisibleXL)
        }}
      >
        업데이트
      </CButton>
      <CModal size="xl" visible={updatevisibleXL} onClose={() => setUpdateVisibleXL(false)}>
        <CModalHeader>
          <CModalTitle>문서저장소 업데이트</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard className="draggable px-4 py-3" draggable="true">
            <CForm onSubmit={SubmitHandler}>
              <CRow className="mb-3">
                <CFormLabel className="col-sm-2 col-form-label">
                  <strong>
                    라벨 선택{' '}
                    <CButton color={chooseLabel.style} shape="rounded-pill" size="sm">
                      {chooseLabel.label}
                    </CButton>
                  </strong>
                </CFormLabel>
                <CCol sm={10}>
                  <CCol className="mb-3">
                    <Label />
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
                      defaultValue={props.doc.title}
                      onChange={titleHandler}
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
                      required
                      options={[
                        '선택하세요',
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
                        onChange={LinkHandler}
                        defaultValue={props.doc.ori_filename}
                      ></CFormInput>
                    ) : (
                      <CFormInput
                        onChange={FileHandler}
                        enctype="multipart/form-data"
                        type="file"
                        multiple="multiple"
                        id="formFile"
                      />
                    )}
                    기존 : {props.doc.ori_filename}
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
                        <CFormCheck inline name="u_idx" value={data.u_idx} onChange={checkAList} />
                        <CAvatar className="ms-2" src={data.profilephoto} />
                        <strong>{data.nickname} </strong>
                      </>
                    )
                  })}
                </CCol>
              </CRow>
              <CCardBody>
                <Editor
                  onEditorChange={EditorHandler}
                  initialValue={props.doc.content}
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
                <div align="right">
                  <CButton type="submit">업데이트</CButton>
                </div>
              </CCardBody>
            </CForm>
          </CCard>
        </CModalBody>
      </CModal>
    </>
  )
}

export default UpdateDocStorage

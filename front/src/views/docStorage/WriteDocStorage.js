import { CCard, CForm } from '@coreui/react'
import { CRow, CFormLabel, CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { CCardBody, CCardTitle } from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import { CButton } from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { CFormCheck } from '@coreui/react'
import { CAvatar } from '@coreui/react'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import axios from 'axios'

const WriteDocStorage = () => {
  const [title, SetTitle] = useState('')
  const [content, SetContent] = useState('')
  const [label, SetLabel] = useState('')
  const [orifile, SetOrifile] = useState(null)
  const [depth, SetDepth] = useState('')
  const [step, SetStep] = useState('')

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

  const titleHandler = (e) => {
    SetTitle(e.target.value)
  }

  const FileHandler = (e) => {
    SetOrifile(e.target.file)
    console.log(SetOrifile)
  }

  const EditorHandler = (e) => {
    SetContent(e)
  }

  const SubmitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()

    const data = [
      {
        title: title,
        content: content,
        b_code: 3,
        label: 'doc',
        depth: 0,
        step: 0,
        u_idx: u_idx,
        url: url,
        nickname: nickname,
      },
    ]
    formData.append('ori_filename', orifile)
    formData.append(
      'data',
      new Blob([JSON.stringify(data)], {
        type: 'application/json',
      }),
    )

    try {
      axios({
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        url: '/doc/addDoc',
        data: data,
      }).then((res) => {
        if (res.data == 1) {
          alert('문서가 등록되었습니다.')
        }
        if (res.data != 1) {
          alert('문서 등록에 실패하였습니다.')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CCard className="draggable px-4 py-3" draggable="true">
      <CForm onSubmit={SubmitHandler}>
        <CRow className="mb-3">
          <CFormLabel className="col-sm-2 col-form-label">
            <strong>문서 제목</strong>
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
          <CFormLabel className="col-sm-2 col-form-label">
            <strong>파일/이미지/링크</strong>
          </CFormLabel>
          <CCol sm={10}>
            <CCol className="mb-3">
              <CFormInput
                value={orifile}
                onChange={FileHandler}
                enctype="multipart/form-data"
                type="file"
                id="formFile"
              />
            </CCol>
          </CCol>
        </CRow>
        <CRow>
          <CFormLabel className="col-sm-2 col-form-label">
            <strong>알림</strong>
          </CFormLabel>
          <CCol sm={10}>
            <CFormCheck inline id="inlineCheckbox1" value="option1" label="전체보내기" />
            <CFormCheck inline id="inlineCheckbox2" value="option2" />
            <CAvatar
              className="ms-2"
              src="https://cdnimg.melon.co.kr/cm2/album/images/111/27/145/11127145_20230102135733_500.jpg/melon/resize/120/quality/80/optimize"
            />{' '}
            메타몽 ;
            <CFormCheck inline id="inlineCheckbox3" value="option3" label="오리" disabled />
          </CCol>
        </CRow>
        <CCardBody>
          <Editor
            onEditorChange={EditorHandler}
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
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
          <br></br>
          <div align="right">
            <Link to="/boardlist">
              <CButton type="submit">등록</CButton>
            </Link>
          </div>
        </CCardBody>
      </CForm>
    </CCard>
  )
}

export default WriteDocStorage

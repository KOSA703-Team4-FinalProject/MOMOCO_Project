import { CCard } from '@coreui/react'
import { CRow, CFormLabel, CCol, CFormInput } from '@coreui/react'
import { CCardBody, CCardTitle } from '@coreui/react'
import { Editor } from '@tinymce/tinymce-react'
import { CButton } from '@coreui/react'
import { Link } from 'react-router-dom'
import { CFormCheck } from '@coreui/react'
import { CAvatar } from '@coreui/react'

const WriteDocStorage = () => {
  return (
    <CCard className="draggable px-4 py-3" draggable="true">
      <CRow className="mb-3">
        <CFormLabel htmlFor="docTitle" className="col-sm-2 col-form-label">
          <strong>문서 제목</strong>
        </CFormLabel>
        <CCol sm={10}>
          <CFormInput
            type="email"
            id="title"
            placeholder="문서 제목"
            text="20글자"
            aria-describedby="exampleFormControlInputHelpInline"
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="upload" className="col-sm-2 col-form-label">
          <strong>업로드</strong>
        </CFormLabel>
        <CCol sm={10}>이곳에는 업로드 컴포넌트</CCol>
      </CRow>
      <CRow>
        <CFormLabel htmlFor="docTitle" className="col-sm-2 col-form-label">
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
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
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
            <CButton variant="outline">등록</CButton>
          </Link>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default WriteDocStorage

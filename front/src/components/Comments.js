import {
  CAvatar,
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import Login from 'src/views/login/Login'
import axios from 'axios'
import { useState } from 'react'
import $ from 'jquery'
const boxsize = {
  marginleft: '200px',
}

const Comments = (props) => {
  const params = useParams()
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))
  console.log('댓글 작성' + props.idx + props.url)
  const [comment, setComment] = useState('')
  //댓글 작성
  const commentsend = () => {
    const write = {
      url: params.url,
      u_idx: login.u_idx,
      content: $('#commentcontent').val(),
      nickname: login.nickname,
      idx: props.idx,
    }

    axios({
      method: 'POST',
      url: '/comment/commentwrite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: write,
    }).then((res) => {
      setComment(res.data)
      console.log(res.data)
    })
  }
  //댓글 취소
  const remove = () => {}
  return (
    <CCol>
      <CCard style={boxsize}>
        <CRow>
          <CCol className="col-md-12 px-3 py-3">
            <CCol className="row">
              <CCol className="col-md-10 px-4">
                <CAvatar className="ms-6" src={login.profilephoto} />
                <strong> {login.nickname}</strong>
              </CCol>
              <CCol className="col-md-2 px-4"></CCol>
            </CCol>
            <CCol className="row" align="center">
              <CCol className="col-md-12 py-3 px-4">
                <CForm>
                  <CFormTextarea rows={3} id="commentcontent">
                    댓글을 작성해주세요
                  </CFormTextarea>
                </CForm>
              </CCol>
            </CCol>

            <CRow>
              <CCol className="col-md-12 mt-2 mb-2 px-4" align="end">
                <CButton color="primary" variant="outline" onClick={commentsend}>
                  작성
                </CButton>
                &nbsp;
                <Link to={`/ws/${params.url}/boardcontent/${props.idx}`}>
                  <CButton color="danger" variant="outline">
                    취소
                  </CButton>
                </Link>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCard>
    </CCol>
  )
}
export default Comments

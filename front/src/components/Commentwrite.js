import {
  CAvatar,
  CButton,
  CCard,
  CForm,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import Login from 'src/views/login/Login'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updatecommentNumber } from 'src/store'
import { useSelect } from '@mui/base'
import Commentreply from './Commentreply'
const boxsize = {
  height: '130px',
}

const Commentwrite = (props) => {
  console.log(props.idx)
  console.log(props.url)
  const params = useParams()
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))

  const [commentcontent, setCommentcontent] = useState([])
  const [delectcomment, setDelectcomment] = useState([])
  const modalstyle = {}
  const send = () => {
    const view = {
      url: params.url,
      u_idx: login.u_idx,
    }
  }
  const myparams = {
    url: params.url,
    idx: props.idx,
    co_idx: props.co_idx,
  }
  console.log('댓글 목록' + myparams.idx + myparams.url)
  console.log(myparams)
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/comment/commentcontent',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      setCommentcontent(res.data)
      console.log(res.data)
    })
  }, [])
  //대댓글
  let [modal, setModal] = useState(false)
  //댓글 삭제 하기
  const deletereply = () => {
    const cidx = { co_idx: props.co_idx, url: myparams.url }
    axios({
      method: 'POST',
      url: '/comment/deletecomment',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: cidx,
    }).then((res) => {
      setDelectcomment(res.data)
    })
  }
  return (
    <div>
      <CCol className="container-fluid">
        <CRow className="row">
          <CCard style={boxsize}>
            <CCol className="col-md-12">
              <CCol className="row">
                <CCol className={`col-md-12 mt-3 ${commentcontent.ref === 1 ? 'ml-2' : ''}`}>
                  <CAvatar className="ms-6" src={commentcontent.profilephoto} />
                  &nbsp;<strong>{commentcontent.nickname}</strong>
                </CCol>
              </CCol>
              <CRow className="row">
                <CCol className={`col-md-12 mt-2 ${commentcontent.ref === 1 ? 'ml-2' : ''}`}>
                  {commentcontent.content}
                </CCol>
              </CRow>
              <CCol className="col-md-12 mt-2 mb-4" align="end">
                <CButton
                  color="primary"
                  variant="outline"
                  onClick={() => {
                    setModal(true)
                  }}
                >
                  수정
                </CButton>{' '}
                &nbsp;
                <CButton
                  color="primary"
                  variant="outline"
                  onClick={() => {
                    setModal(true)
                  }}
                >
                  대댓글작성
                </CButton>
                <CModal
                  style={modalstyle}
                  scrollable
                  alignment="center"
                  visible={modal}
                  onClick={() => setModal(!modal)}
                >
                  <CModalBody>
                    <Commentreply idx={params.idx} co_idx={commentcontent.co_idx} />
                  </CModalBody>
                </CModal>
                &nbsp;
                <CButton color="danger" variant="outline" onClick={deletereply}>
                  삭제
                </CButton>
              </CCol>
            </CCol>
          </CCard>
        </CRow>
      </CCol>
    </div>
  )
}
export default Commentwrite

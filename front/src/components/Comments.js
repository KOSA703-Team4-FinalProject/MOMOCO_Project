import {
  CAvatar,
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormTextarea,
  CModal,
  CModalBody,
  CRow,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import Login from 'src/views/login/Login'
import axios from 'axios'
import { useState } from 'react'
import $ from 'jquery'
import { useEffect } from 'react'
import Commentreply from './Commentreply'
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

  const [comment, setComment] = useState('')
  const [commentlist, setCommentlist] = useState([])
  const [commentlisttwo, setCommentlisttwo] = useState([])
  const [delectcomment, setDelectcomment] = useState([])
  const modalstyle = {}
  const myparams = {
    url: params.url,
    idx: props.idx,
  }
  function list() {
    console.log('댓글리스트 불러오기')
    axios({
      method: 'POST',
      url: '/comment/commentlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      res.data.map((data) => {
        setCommentlist((commentlist) => [...commentlist, data])
      })
    })
  }
  //댓글 리스트
  useEffect(() => {
    list()
  }, [])

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
      list()

      console.log(res.data)
    })
  }
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
      list()
    })
  }
  //대댓글
  let [modal, setModal] = useState(false)

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
                  <CFormTextarea
                    rows={3}
                    placeholder="댓글을 작성해주세요"
                    id="commentcontent"
                  ></CFormTextarea>
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
          <br></br>

          {commentlist.map((data, key) => (
            <CCol className="container-fluid" key={key}>
              <CRow className="row">
                <CCard style={boxsize}>
                  <CCol className="col-md-12">
                    <CCol className="row">
                      <CCol className="col-md-12 mt-3">
                        <CAvatar className="ms-6" src={data.profilephoto} />
                        &nbsp;<strong>{data.nickname}</strong>
                      </CCol>
                    </CCol>
                    <CRow className="row">
                      <CCol className="col-md-12 mt-2">{data.content}</CCol>
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
                          <Commentreply idx={params.idx} co_idx={data.co_idx} />
                        </CModalBody>
                      </CModal>
                      &nbsp;
                      <CButton color="danger" variant="outline" onClick={deletereply}>
                        삭제
                      </CButton>
                    </CCol>
                  </CCol>
                </CCard>
              </CRow>{' '}
              <br></br>
            </CCol>
          ))}
        </CRow>
      </CCard>
    </CCol>
  )
}
export default Comments

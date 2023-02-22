import {
  CAvatar,
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import { Link, useParams } from 'react-router-dom'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import { BsArrowReturnRight } from 'react-icons/bs'
import { TbArrowForward } from 'react-icons/tb'
import { FiCornerDownRight } from 'react-icons/fi'
import axios from 'axios'
import { useState } from 'react'
import $ from 'jquery'
import { useEffect } from 'react'

const boxsize = {
  marginleft: '200px',
}
const boxsize1 = {
  marginleft: '800px',
  height: '150px',
  weight: '1000px',
}
const boxsize2 = {
  marginleft: '800px',
  height: '150px',
  weight: '1000px',
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
  const [visibleLg, setVisibleLg] = useState(false)
  const [visibleLg1, setVisibleLg1] = useState(false)
  const [commentContent, setCommentContent] = useState('')
  const [content, SetContent] = useState('')
  const modalstyle = {}
  const myparams = {
    url: params.url,
    idx: props.idx,
  }

  const contentHandler = (e) => {
    SetContent(e.target.value)
  }

  function list() {
    axios({
      method: 'POST',
      url: '/comment/commentlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      reset()
      res.data.map((data) => {
        setCommentlist((commentlist) => [...commentlist, data])
      })
    })
  }

  function reset() {
    setCommentlist([])
  }
  //댓글 리스트
  useEffect(() => {
    list()
  }, [props.idx])

  //댓글 작성
  ////////////////////////////////////전체리스트
  const commentsend = () => {
    const write = {
      url: params.url,
      u_idx: login.u_idx,
      content: content,
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
    document.getElementById('commentcontent').value = ''
  }
  //댓글 삭제 하기
  const deletereply = (e) => {
    const cidx = { co_idx: e, url: myparams.url }
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
  //답글
  const [reply, setReply] = useState('')
  const [commentIdx, setCommentIdx] = useState('')
  const [commentRef, setCommentRef] = useState('')
  const replycomment = () => {
    const reply = {
      url: params.url,
      u_idx: login.u_idx,
      content: content,
      nickname: login.nickname,
      idx: props.idx,
      ref: commentIdx,
    }
    console.log('이건 ref' + reply.ref)
    axios({
      method: 'POST',
      url: '/comment/replycommentwrite',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reply,
    }).then((res) => {
      setReply(res.data)
      setVisibleLg(false)
      list()
    })
  }
  //답글 수정

  const updatecomment = () => {
    const update = {
      url: params.url,
      co_idx: $('#coidx').val(),
      content: content,
    }

    axios({
      method: 'POST',
      url: '/comment/updatecomment',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: update,
    }).then((res) => {
      setCommentContent(res.data)
      setVisibleLg1(false)
      list()
    })
  }
  const handleEditComment = (data) => {
    const commentContent = data.content
    setCommentContent(commentContent)
    setVisibleLg1(true)
  }

  return (
    <CCol>
      <CCard style={boxsize}>
        <CCol className="col-md-12 px-3 py-3">
          <CCol className="row">
            <CCol className="col-md-10 px-4">
              {/* <CAvatar className="ms-6" src={login.profilephoto} /> */}
              <strong>{login.nickname}</strong>
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
                  onChange={contentHandler}
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
              <CButton
                color="danger"
                variant="outline"
                onClick={() => {
                  document.getElementById('commentcontent').value = ''
                }}
              >
                취소
              </CButton>
            </CCol>
          </CRow>
        </CCol>
      </CCard>

      {commentlist.map((data, key) => {
        if (data.co_idx == data.ref) {
          return (
            <CCol key={data.co_idx}>
              <CCard className="mt-3 px-4 mb-3" color="light">
                <CCol className="col-md-12">
                  <CCol className="row">
                    <CCol className="col-md-10 px-2 py-3">
                      <CAvatar className="ms-6" src={data.profilephoto} />
                      &nbsp;&nbsp;<strong>{data.nickname}</strong>
                    </CCol>
                  </CCol>
                  <CRow className="row">
                    <CCol className="col-md-12 mx-2">{data.content}</CCol>
                  </CRow>
                  <CCol className="col-md-12 mt-2 mb-3" align="end">
                    {login.nickname === data.nickname && (
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={() => handleEditComment(data)}
                      >
                        수정
                      </CButton>
                    )}
                    <CModal
                      size="lg"
                      visible={visibleLg1}
                      onClose={() => setVisibleLg1(false)}
                      key={key}
                    >
                      <CModalBody>
                        <CCol className="col-md-12 px-3 py-3">
                          <CCol className="row">
                            <CCol className="col-md-10 px-4">
                              <CAvatar className="ms-6" src={data.profilephoto} />
                              <strong>닉네임: {data.nickname}</strong>
                            </CCol>
                            <CCol className="col-md-2 px-4"></CCol>
                          </CCol>
                          <CCol className="row" align="center">
                            <CCol className="col-md-12 py-3 px-4">
                              <CForm>
                                <CFormTextarea
                                  rows={3}
                                  id="commentcontent"
                                  placeholder={commentContent}
                                  onChange={contentHandler}
                                ></CFormTextarea>
                              </CForm>
                            </CCol>
                          </CCol>
                        </CCol>
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="secondary"
                          onClick={() => {
                            setVisibleLg1(visibleLg)
                            setCommentContent(data.content)
                          }}
                        >
                          취소
                        </CButton>
                        <CButton color="primary" onClick={updatecomment}>
                          <CFormInput type="hidden" id="coidx" value={data.co_idx} />
                          작성
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    &nbsp;
                    <CButton
                      color="primary"
                      variant="outline"
                      onClick={() => {
                        setVisibleLg(!visibleLg), setCommentIdx(data.co_idx)
                      }}
                    >
                      대댓글작성
                    </CButton>
                    <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
                      <CModalBody>
                        <CCol className="col-md-12 px-3 py-3">
                          <CCol className="row">
                            <CCol className="col-md-10 px-4">
                              <CAvatar className="ms-6" src={login.profilephoto} />
                              <strong>닉네임: {login.nickname}</strong>
                            </CCol>
                            <CCol className="col-md-2 px-4"></CCol>
                          </CCol>
                          <CCol className="row" align="center">
                            <CCol className="col-md-12 py-3 px-4">
                              <CForm>
                                <CFormTextarea
                                  rows={3}
                                  placeholder="답글을 작성해주세요"
                                  id="commentcontent"
                                  onChange={contentHandler}
                                ></CFormTextarea>
                              </CForm>
                            </CCol>
                          </CCol>
                        </CCol>
                      </CModalBody>
                      <CModalFooter>
                        <CButton
                          color="secondary"
                          onClick={() => {
                            setVisibleLg(!visibleLg)
                          }}
                        >
                          취소
                        </CButton>
                        <CButton color="primary" onClick={replycomment}>
                          작성
                        </CButton>
                      </CModalFooter>
                    </CModal>
                    &nbsp;
                    {login.nickname === data.nickname && (
                      <CButton
                        color="danger"
                        variant="outline"
                        onClick={() => deletereply(data.co_idx)}
                      >
                        삭제
                      </CButton>
                    )}
                  </CCol>
                </CCol>
              </CCard>
            </CCol>
          )
        } else {
          return (
            <div className="row justify-content-between">
              <div className="col-1 p-0.5">
                <div className="row mt-2" align="center">
                  <FiCornerDownRight size="36px" />
                </div>
              </div>
              <div className="col-11">
                <div className="col-md-12 my-1" key={data.co_idx}>
                  <CCol>
                    <CCard className="p-3" color="light">
                      <CCol className="col-md-12">
                        <CCol className="row">
                          <CCol className="col-md-5 ps-3">
                            <CAvatar className="ms-6" src={data.profilephoto} />
                            &nbsp;&nbsp;<strong>{data.nickname}</strong>
                          </CCol>
                        </CCol>
                        <CRow className="row">
                          <CCol className="col-md-12 m-2">{data.content}</CCol>
                        </CRow>
                        <CCol className="col-md-12mb-1" align="end">
                          {login.nickname === data.nickname && (
                            <CButton
                              color="primary"
                              variant="outline"
                              onClick={() => handleEditComment(data)}
                            >
                              수정
                            </CButton>
                          )}
                          <CModal
                            size="lg"
                            visible={visibleLg1}
                            onClose={() => setVisibleLg1(false)}
                            key={key}
                          >
                            <CModalBody>
                              <CCol className="col-md-12 px-3 py-3">
                                <CCol className="row">
                                  <CCol className="col-md-10 px-4">
                                    <CAvatar className="ms-6" src={data.profilephoto} />
                                    <strong>닉네임: {data.nickname}</strong>
                                  </CCol>
                                  <CCol className="col-md-2 px-4"></CCol>
                                </CCol>
                                <CCol className="row" align="center">
                                  <CCol className="col-md-12 py-3 px-4">
                                    <CForm>
                                      <CFormTextarea
                                        rows={3}
                                        id="commentcontent"
                                        placeholder={commentContent}
                                        onClick={contentHandler}
                                      ></CFormTextarea>
                                    </CForm>
                                  </CCol>
                                </CCol>
                              </CCol>
                            </CModalBody>
                            <CModalFooter>
                              <CButton
                                color="secondary"
                                onClick={() => {
                                  setVisibleLg1(visibleLg)
                                  setCommentContent(data.content)
                                }}
                              >
                                취소
                              </CButton>
                              <CButton color="primary" onClick={updatecomment}>
                                <CFormInput type="hidden" id="coidx" value={data.co_idx} />
                                작성
                              </CButton>
                            </CModalFooter>
                          </CModal>
                          &nbsp;
                          <CButton
                            color="primary"
                            variant="outline"
                            onClick={() => {
                              setVisibleLg(!visibleLg), setCommentIdx(data.co_idx)
                            }}
                          >
                            대댓글작성
                          </CButton>
                          <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
                            <CModalBody>
                              <CCol className="col-md-12 px-3 py-3">
                                <CCol className="row">
                                  <CCol className="col-md-10 px-4">
                                    <CAvatar className="ms-6" src={login.profilephoto} />
                                    <strong>닉네임: {login.nickname}</strong>
                                  </CCol>
                                  <CCol className="col-md-2 px-4"></CCol>
                                </CCol>
                                <CCol className="row" align="center">
                                  <CCol className="col-md-12 py-3 px-4">
                                    <CForm>
                                      <CFormTextarea
                                        rows={3}
                                        placeholder="답글을 작성해주세요"
                                        id="commentcontent"
                                        onChange={(event) => {
                                          const value = event.target.value
                                          setCommentContent(value)
                                        }}
                                      ></CFormTextarea>
                                    </CForm>
                                  </CCol>
                                </CCol>
                              </CCol>
                            </CModalBody>
                            <CModalFooter>
                              <CButton
                                color="secondary"
                                onClick={() => {
                                  setVisibleLg(!visibleLg)
                                }}
                              >
                                취소
                              </CButton>
                              <CButton color="primary" onClick={replycomment}>
                                작성
                              </CButton>
                            </CModalFooter>
                          </CModal>
                          &nbsp;
                          {login.nickname === data.nickname && (
                            <CButton
                              color="danger"
                              variant="outline"
                              onClick={() => deletereply(data.co_idx)}
                            >
                              삭제
                            </CButton>
                          )}
                        </CCol>
                      </CCol>
                    </CCard>
                  </CCol>
                </div>
              </div>
            </div>
          )
        }
      })}
    </CCol>
  )
}
export default Comments

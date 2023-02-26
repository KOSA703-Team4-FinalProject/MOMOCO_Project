import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormInput,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import $ from 'jquery'

import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import Comments from 'src/components/Comments'
import { Editor } from '@tinymce/tinymce-react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

const title = {
  fontSize: 25,
  border: '2px',
}
const username = {
  fontSize: 16,
  border: '2px',
}
const userimg = {
  width: '45px',
  height: '45px',
}
const tag = {
  fontSize: 15,
  border: '2px',
}

const Boardcontent = (props) => {
  const [boardcontent, setBoardcontent] = useState([])
  const [commentlist, setCommentlist] = useState([])
  const params = useParams()
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  const [previewModal, setPreviewModal] = useState(false)
  const myparams = {
    url: params.url,
    idx: params.idx,
  }
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/board/boardcontent',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      setBoardcontent(res.data)
    })

    //댓글 목록
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
  }, [])

  //삭제하기
  const deletecommon = () => {
    const param = {
      url: params.url,
      idx: params.idx,
    }
    axios({
      method: 'POST',
      url: '/board/boarddelete',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: param,
    }).then((res) => {
      setBoardcontent('')
    })
  }
  //미리보기 다운로드
  const [visibleXL, setVisibleXL] = useState(false)

  const [list, SetList] = useState([])
  const [ImgModal, setImgModal] = useState(false)
  const [file, SetFile] = useState('')
  const [link, SetLink] = useState('')
  const [imageURL, setImageURL] = useState('')

  const filesubmit = (e) => {
    e.preventDefault()

    const type = e.target.value
    const tar = e.target
    const name = $(tar).attr('value1')
    console.log(name)
    if (type == 'image/jpeg' || type == 'image/png') {
      setImgModal(!ImgModal)
      const reqData = {
        url: params.url,
        content: name,
      }
      axios({
        method: 'POST',
        url: '/board/viewImage',
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: 'blob',
        params: reqData,
      }).then((res) => {
        console.log(res)

        const myFile = new File([res.data], 'imageName')
        const reader = new FileReader()
        reader.onload = (ev) => {
          const previewImage = String(ev.target?.result)
          setImageURL(previewImage) // myImage라는 state에 저장
        }
        reader.readAsDataURL(myFile)
      })
    }
  }
  const filesubmit1 = (e) => {
    e.preventDefault()

    const type = e.target.value
    const tar = e.target
    const name = $(tar).attr('value1')

    if (type == 'text/plain') {
      axios({
        method: 'GET',
        url: '/api/token',
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then((res) => {
        if (res.data == '') {
          Swal.fire('Error', '잘못된 접근입니다.', 'error')
        } else {
          const url =
            'http://localhost:8090/controller/board/fileDown?url=' + params.url + '&content=' + name

          const download = document.createElement('a')
          download.href = url
          download.setAttribute('download', name)
          download.setAttribute('type', 'application/json')
          download.click()
        }
      })
    }
  }
  return (
    <div>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}></CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-9" style={title}>
                      <strong className="pt-3">{boardcontent.title} </strong>&nbsp;
                      <CBadge color="info" shape="rounded-pill" style={tag}>
                        {boardcontent.label}
                      </CBadge>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-md-1">
                      <CAvatar className="ms-4" src={boardcontent.profilephoto} style={userimg} />
                    </div>
                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-12" align="left" style={username}>
                          {boardcontent.nickname}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12" align="left">
                          {boardcontent.w_date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12" align="right"></div>
                  </div>
                  <hr></hr>
                  <div align="center">
                    <CButton
                      type="submit"
                      className="my-3 mx-1"
                      variant="outline"
                      value={boardcontent.filetype}
                      value1={boardcontent.save_filename}
                      onClick={filesubmit}
                    >
                      미리보기
                      <CModal visible={ImgModal} onClose={() => setImgModal(false)} size="xl">
                        <CModalHeader onClose={() => setImgModal(false)}>
                          <CModalTitle>미리보기</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          {/* 이미지 파일일 경우 */}
                          {boardcontent.filetype === 'image/jpeg' ||
                          boardcontent.filetype === 'image/png' ? (
                            <img
                              src={imageURL}
                              alt=""
                              style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                          ) : (
                            // 이미지 파일이 아닐 경우 생략
                            ''
                          )}
                        </CModalBody>
                      </CModal>
                    </CButton>
                    &nbsp;&nbsp;
                    <CButton
                      onClick={filesubmit1}
                      type="submit"
                      className="my-3 mx-1"
                      variant="outline"
                      value={boardcontent.filetype}
                      value1={boardcontent.save_filename}
                    >
                      다운로드
                    </CButton>
                  </div>
                  <hr></hr>
                  <br></br>
                  <CCard>
                    <div className="row">
                      <div className="col-md-12">
                        <Editor
                          value={boardcontent.content}
                          name="tinyEditor"
                          apiKey="avqk22ebgv68f2q9uzprdbapxmxjwdbke8xixhbo24x2iyvp"
                          init={{
                            height: 300,
                            selector: 'div.tinymce',
                            plugins: ['quickbars'],
                            toolbar: false,
                            menubar: false,
                            inline: false,
                          }}
                        />
                      </div>
                      {boardcontent.code == null || boardcontent.code == '' ? (
                        <></>
                      ) : (
                        <div className="col-md-12 mt-3">
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
                            value={boardcontent.code}
                            width="100%"
                            fontSize={20}
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  </CCard>
                  <br></br>
                  <CCard>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="col-md-6 ps-4" align="center"></div>
                      </div>
                      <div className="col-md-4" align="center"></div>
                    </div>
                  </CCard>
                </div>
              </div>
            </div>
          </div>
        </CCardBody>

        <div align="right" className="me-4">
          {login.nickname === boardcontent.nickname && (
            <Link to={`/ws/${params.url}/boardedit/${boardcontent.idx}`}>
              <CButton color="primary" variant="outline">
                수정
              </CButton>
            </Link>
          )}
          &nbsp;
          <Link
            to={`/ws/${params.url}/replyboardwrite/${boardcontent.b_idx}/${boardcontent.ref}/${boardcontent.step}/${boardcontent.depth}`}
          >
            <CButton color="primary" variant="outline">
              답글
            </CButton>
          </Link>
          &nbsp;
          {login.nickname === boardcontent.nickname && (
            <Link to={`/ws/${params.url}/boardlist`}>
              <CButton color="danger" variant="outline" onClick={deletecommon}>
                삭제
              </CButton>
            </Link>
          )}
          &nbsp;
          <Link to={`/ws/${params.url}/boardlist`}>
            <CButton color="primary" variant="outline">
              목록으로
            </CButton>
          </Link>
        </div>
        <br></br>

        <div>
          <div className="ms-4 me-4">
            <Comments idx={params.idx} />
            <br></br>
          </div>
        </div>
      </CCard>
    </div>
  )
}

export default Boardcontent

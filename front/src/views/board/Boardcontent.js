import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CForm,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../../oauth'
import Comments from 'src/components/Comments'
import { Editor } from '@tinymce/tinymce-react'
import { FormControlUnstyledContext } from '@mui/base'
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
                    <CButton color="primary" variant="outline">
                      미리보기
                    </CButton>{' '}
                    &nbsp;
                    <CButton color="primary" variant="outline">
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
            <Link to={`/ws/${params.url}/boardedit/${boardcontent.b_idx}`}>
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

        <div className="p-4">
          <div className="ms-5 me-5">
            <Comments idx={params.idx} />
            <br></br>
          </div>
        </div>
      </CCard>
    </div>
  )
}

export default Boardcontent

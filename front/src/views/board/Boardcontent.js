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

  const navigateToboardwrite = (params) => {
    navigate(`/ws/boardwrite/${params.url}`)
  }
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
                    <div className="col-md-12" align="right">
                      <CAvatar
                        className="ms-6"
                        src="data:image/jpeg;base64,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"
                      />
                      &nbsp; 메타몽&nbsp;
                      <CAvatar
                        className="ms-6"
                        src="data:image/jpeg;base64,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"
                      />
                      &nbsp; 메타몽
                    </div>
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
            <Link to={`/ws/${params.url}/boardedit/${boardcontent.idx}`}>
              <CButton color="primary" variant="outline">
                수정
              </CButton>{' '}
            </Link>
          )}
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

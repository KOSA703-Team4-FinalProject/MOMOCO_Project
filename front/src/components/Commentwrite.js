import { CAvatar, CButton, CCard, CForm, CFormTextarea } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import Login from 'src/views/login/Login'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const boxsize = {
  height: '130px',
}

const Commentwrite = (props) => {
  const params = useParams()
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  //로그인한 유저
  const login = JSON.parse(localStorage.getItem('login'))
  console.log('댓글 작성' + props.idx + props.url)
  const [commentcontent, setCommentcontent] = useState([])
  const send = () => {
    const view = {
      url: params.url,
      u_idx: login.u_idx,
    }
  }
  useEffect(() => {
    const myparams = {
      url: params.url,
      idx: params.idx,
    }
    axios({
      method: 'POST',
      url: '/comment/commentcontent',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: myparams,
    }).then((res) => {
      setCommentcontent(res.data)
    })
  }, [])
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <CCard style={boxsize}>
            <div className="col-md-12">
              <div className="row">
                <div className={`col-md-12 mt-3 ${commentcontent.ref === 1 ? 'ml-2' : ''}`}>
                  <CAvatar className="ms-6" src={commentcontent.profilephoto} />
                  &nbsp;<strong>{commentcontent.nickname}</strong>
                </div>
              </div>
              <div className="row">
                <div className={`col-md-12 mt-2 ${commentcontent.ref === 1 ? 'ml-2' : ''}`}>
                  {commentcontent.content}
                </div>
              </div>
              <div className="col-md-12 mt-2 mb-4" align="end">
                <CButton color="primary" variant="outline">
                  수정
                </CButton>{' '}
                &nbsp;
                <CButton color="primary" variant="outline" onClick={send}>
                  대댓글작성
                </CButton>{' '}
                &nbsp;
                <CButton color="danger" variant="outline">
                  삭제
                </CButton>
              </div>
            </div>
          </CCard>
        </div>
      </div>
    </div>
  )
}
export default Commentwrite

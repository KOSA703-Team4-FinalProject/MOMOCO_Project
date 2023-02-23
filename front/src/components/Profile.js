import { CButton, CCard } from '@coreui/react'
import { BsGithub } from 'react-icons/bs'
import $ from 'jquery'
import { useDispatch } from 'react-redux'
import { changeUserProfile } from 'src/store'
import { useParams } from 'react-router'
import CryptoJS from 'crypto-js'

import { PRIMARY_KEY } from '../oauth'

const divProfile = {
  radius: '4px',
}

const imgProfile = {
  width: '100%',
  height: '100%',
  margin: 'auto',
  display: 'block',
}

const Profile = (props) => {
  const dispatch = useDispatch()
  const params = useParams()

  const login = JSON.parse(localStorage.getItem('login'))

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token

  //프로필 닫기
  $(document).on('click', '.profileclosebtn', () => {
    dispatch(changeUserProfile(false))
  })

  const user = props.user

  const gotoGitHub = () => {
    const go = document.createElement('a')

    go.href = user.github
    go.setAttribute('target', '_blank')
    go.click()
  }

  const gotoChat = () => {

    const reqData = {
      url: params.url,
      to_u_idx: user.u_idx,
      to_nickname: user.nickname,
      u_idx: login.u_idx,
      nickname: login.nickname,
      r_name: user.nickname+"_"+login.nickname,
    }
    
    console.log(reqData)
    axios({
      method: 'POST',
      url: '/api/chatroom/pairRoomCreate',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res)=>{
      console.log(res)
    })

  }

  return (
    <div className="row px-3">
      <CCard className="col">
        <div className="m-1 pt-1">
          <img src={user.profilephoto} style={imgProfile} />
        </div>
      </CCard>
      <CCard className="p-4 col">
        <div className="row" style={divProfile}>
          <div className="col-md-12">
            <div className="row">
              <h4 className="col-10">
                <strong>{user.nickname}</strong>
              </h4>
            </div>
            <h6 className="ps-1">{user.email}</h6>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-7">
                <CButton color="primary" variant="outline" onClick={gotoGitHub}>
                  <BsGithub size="20" /> GitHub
                </CButton>
              </div>
              <div className="col-md-5">
                {user.nickname == login.nickname ? (
                  <></>
                ) : (
                  <CButton color="primary" variant="outline" onClick={gotoChat}>
                    채팅
                  </CButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </CCard>
    </div>
  )
}

export default Profile

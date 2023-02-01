import { CButton, CCard, CCardBody, CCloseButton } from '@coreui/react'
import { BsGithub, BsFillXSquareFill } from 'react-icons/bs'
import $ from 'jquery'

import momocologo from '../assets/images/momocologo.png'
import { useDispatch } from 'react-redux'
import { changeUserProfile } from 'src/store'

const profileCss = {
  position: 'absolute',
  top: '200px',
  left: '500px',
  margin: '0 auto',
}

const divProfile = {
  radius: '4px',
}

const imgProfile = {
  width: '100%',
  height: '100%',
  margin: 'auto',
  display: 'block',
}

const Profile = () => {
  const dispatch = useDispatch()

  //프로필 닫기
  $(document).on('click', '.profileclosebtn', () => {
    dispatch( changeUserProfile(false) )
  })

  return (
    <div className="row px-3" style={profileCss}>
      <CCard className="col">
        <div>
          <img src={momocologo} style={imgProfile} />
        </div>
      </CCard>
      <CCard className="p-4 col">
        <div className="row" style={divProfile}>
          <div className="col-md-12">
            <div className="row">
              <h4 className="col-10">
                <strong>사용자 닉네임!</strong>
              </h4>
              <BsFillXSquareFill size="35px" className="profileclosebtn col-2 mb-1" align="end" />
            </div>
            <h5 className="ps-1">test@test.com</h5>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <CButton color="primary" variant="outline">
                  <BsGithub size="25" /> GitHub
                </CButton>
              </div>
              <div className="col-md-4 pe-3" align="end">
                <CButton color="primary" variant="outline">
                  채팅
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </CCard>
    </div>
  )
}

export default Profile

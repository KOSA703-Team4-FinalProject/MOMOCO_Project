import { CButton, CCard, CCardBody, CCloseButton } from '@coreui/react'
import { BsGithub, BsFillXSquareFill } from 'react-icons/bs'
import $ from 'jquery'

import momocologo from '../assets/images/momocologo.png'
import { useDispatch } from 'react-redux'
import { changeUserProfile } from 'src/store'



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

  //프로필 닫기
  $(document).on('click', '.profileclosebtn', () => {
    dispatch( changeUserProfile(false) )
  })

  const user = props.user
  console.log(user)

  return (
    <div className="row px-3">
      <CCard className="col">
        <div className='m-1 pt-1'>
          <img src={user.avatar_url} style={imgProfile} />
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
                <CButton color="primary" variant="outline">
                  <BsGithub size="21" /> GitHub
                </CButton>
              </div>
              <div className="col-md-5">
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

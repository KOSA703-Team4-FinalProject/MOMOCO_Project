import { cilFile, cilFolderOpen, cilImage } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard } from '@coreui/react'
import { useState } from 'react'
import { AiOutlineLeftCircle } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawerDetailType, changeTalkDrawer } from 'src/store'
import $ from 'jquery'

import '../scss/chatRoom.scss'

const TalkDrawerDetail = (props) => {
  const dispatch = useDispatch()
  let drawerDetail = useSelector((state) => state.drawerDetailType)

  const drawerDetailCss = {
    position: 'absolute',
    top: '125px',
    left: '49%',
    margin: '0 auto',
  }

  //채팅방 서랍 세부 모아보기 닫기 버튼 클릭
  $(document).on('click', '.drawerDetailclosebtn', function () {
    dispatch( changeDrawerDetailType(["", false]) )
    dispatch( changeTalkDrawer(true) )
  })

  return (
    <div style={drawerDetailCss}>
      <div className="main2">
        <CCard>
          <div className="row pt-2 ps-2 m-2">
            <h4 className="col">
              <AiOutlineLeftCircle className="drawerDetailclosebtn col" size="30" />{' '}
              <strong className="m-2">{drawerDetail.type} 서랍</strong>
            </h4>
          </div>
        </CCard>
        <CCard>
          <div className="row pt-1" align="center">
            <div className="m-3 col-3">
              <CIcon className="ms-2" icon={cilImage} size="4xl" />
              <h5 className="col ms-2">
                <strong>{drawerDetail.type}</strong>
              </h5>
            </div>
            <div className="m-3 col-3">
              <CIcon className="ms-2" icon={cilFile} size="4xl" />
              <h5 className="col ms-2">
                <strong>파일</strong>
              </h5>
            </div>
            <div className="m-3 col-3">
              <BiLinkExternal size="70" />
              <h5 className="col ms-2">
                <strong>링크</strong>
              </h5>
            </div>
          </div>
        </CCard>
      </div>
    </div>
  )
}

export default TalkDrawerDetail

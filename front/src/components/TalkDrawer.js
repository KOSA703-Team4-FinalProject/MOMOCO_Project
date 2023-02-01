import { cilFolderOpen, cilImagePlus, cilInfo, cilLink, cilUserFollow } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CCard, CCloseButton, CCol, CPopover, CRow } from '@coreui/react'
import { BsPlusCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { changeDrawerDetailType, changeTalkDrawer, changeUserProfile } from 'src/store'
import $ from 'jquery'

import '../scss/chatRoom.scss'

const TalkDrawer = () => {

  const dispatch = useDispatch()

  const drawerCss = {
    position: "absolute",
    top: "125px",
    left: "1000px",
    margin: "0 auto"
  }

  //채팅방 서랍 닫기
  $(document).on('click', '.talkdrawerclosebtn', function () {
    dispatch( changeTalkDrawer(false) )
  })

  //채팅방 서랍의 파일 모아보기 버튼 클릭
  $(document).on('click', '.fildrawerebtn', function () {
    dispatch( changeDrawerDetailType(['파일', true]) )
    dispatch( changeTalkDrawer(false) )
  })
  //채팅방 서랍의 이미지 모아보기 버튼 클릭
  $(document).on('click', '.imgdrawerebtn', function () {
    dispatch( changeDrawerDetailType(['이미지', true]) )
    dispatch( changeTalkDrawer(false) )
  })
  //채팅방 서랍의 링크 모아보기 버튼 클릭
  $(document).on('click', '.linkdrawerebtn', function () {
    dispatch( changeDrawerDetailType(['링크', true]) )
    dispatch( changeTalkDrawer(false) )
  })

  return (
    <div style={drawerCss}>
      <div className='main2'>
        <CCard>
          <header className="pt-2 m-2 px-4">
            <CRow>
              <CCol xs="auto" className="me-auto pt-1">
                <div className="h4 col">
                  <strong>채팅방 서랍</strong>{' '}
                  <CPopover
                    title="채팅방 서랍"
                    content="채팅방의 파일, 이미지, 링크를 모아보세요."
                    placement="bottom"
                  >
                    <CIcon className="pt-1 col" icon={cilInfo} size="xl"></CIcon>
                  </CPopover>
                </div>
              </CCol>
              <CCol xs="auto" className="pt-1 me-3">
                <CCloseButton className='talkdrawerclosebtn' />
              </CCol>
            </CRow>
          </header>
        </CCard>
        <CCard>
          <div className="row pt-1" align="center">
            <div className="fildrawerebtn m-4 col">
              <CIcon className="ms-2" icon={cilFolderOpen} size="xl" />
              <h5 className="col">
                <strong>파일</strong>
              </h5>
            </div>
            <div className="imgdrawerebtn m-4 col">
              <CIcon className="ms-2" icon={cilImagePlus} size="xl" />
              <h5 className="col">
                <strong>이미지</strong>
              </h5>
            </div>
            <div className="linkdrawerebtn m-4 col">
              <CIcon className="ms-2" icon={cilLink} size="xl" />
              <h5 className="col">
                <strong>링크</strong>
              </h5>
            </div>
          </div>
        </CCard>
        <CCard>
          <div className="m-4 ps-3 pt-1">
            <h4 align="center">
              <strong>대화 상대</strong>
            </h4>
            <hr />
            <div className="profilebtn row pt-2 ps-2" onClick={()=>{ dispatch( changeUserProfile(true) ) }}>
              <CAvatar color="secondary">CUI</CAvatar>
              <h5 className="col pt-2">
                <strong>메타몽</strong>
              </h5>
            </div>
            <div className="profilebtn row pt-2 ps-2">
              <CAvatar color="secondary">CUI</CAvatar>
              <h5 className="col pt-1">
                <strong>마자용</strong>
              </h5>
            </div>
            <div className="profilebtn row pt-2 ps-2">
              <CAvatar color="secondary">CUI</CAvatar>
              <h5 className="col pt-1">
                <strong>이상해씨</strong>
              </h5>
            </div>
            <hr />
            <div className="row pt-2 ps-2">
              <h4 className="col" align="center">
                <BsPlusCircle size="28" className="col" />{" "}
                <strong className='pt-1'>친구추가</strong>
              </h4>
            </div>
          </div>
        </CCard>
      </div>
    </div>
  )
}

export default TalkDrawer

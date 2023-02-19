import {
  CAvatar,
  CButton,
  CCard,
  CCol,
  CForm,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { useEffect } from 'react'
import { PRIMARY_KEY } from 'src/oauth'
import CryptoJS from 'crypto-js'
import Login from 'src/views/login/Login'
import { Link, useParams } from 'react-router-dom'
import { param } from 'jquery'
import $ from 'jquery'
import { useState } from 'react'
import { useRef } from 'react'
const boxsize = {
  height: '250px',
  weight: '500px',
}
const params = useParams()
// AES알고리즘 사용 복호화
const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
//인코딩, 문자열로 변환, JSON 변환
const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
const accessToken = decrypted.token
//로그인한 유저
const login = JSON.parse(localStorage.getItem('login'))
const ModifyComment = (props) => {
  return (
    <div>
      <CCol>
        <CCard style={boxsize}>
          <CRow>
            <CCol className="col-md-12 px-3 py-3">
              <CCol className="row">
                <CCol className="col-md-10 px-4">
                  <CAvatar className="ms-6" src={login.profilephoto} />
                  <strong> {login.nickname}</strong>
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
                    ></CFormTextarea>
                  </CForm>
                </CCol>
              </CCol>

              <CRow>
                <CCol className="col-md-12 mt-2 mb-2 px-4" align="end">
                  <CButton color="primary" variant="outline" onClick={replycomment}>
                    수정하기
                  </CButton>
                  &nbsp;
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    </div>
  )
}
export default ModifyComment

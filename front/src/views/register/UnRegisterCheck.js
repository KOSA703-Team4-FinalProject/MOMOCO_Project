import React from 'react'
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import RegAndLoginHeader from 'src/components/RegAndLoginHeader'
import momocologo from 'src/assets/images/momocologo.png'
               

const UnRegisterCheck = () => {
    return (
        <>

        <div className="bg-dark min-vh-100 d-flex flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md={8}>
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm>
                        <h2><strong>회원탈퇴</strong></h2>
                        <p className="text-medium-emphasis">비밀번호를 확인해주세요</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={icon.cilLockLocked} />
                          </CInputGroupText>
                          <CFormInput placeholder="Password" autoComplete="username" />
                          <CButton color="danger" className="px-4" onClick = {()=> {

                          // if문을 써서 비밀번호가 회원 비밀번호화 일치하면
                          Swal.fire({
                            title: '정말 탈퇴하시겠습니까?',
                            icon: 'question',
                            showCancelButton: true,
                            cancelButtonColor: '#3085d6',		//버튼 색상 변경
                            cancelButtonText: "취소",
                            confirmButtonColor: '#d33',	//버튼 색상 변경
                            confirmButtonText: "확인",
                            reverseButtons: true			//버튼 순서 변경
                          }).then(result => {
                            if(result.isConfirmed){ // 만약 confirm 에서 확인 버튼을 눌렀다면
                              Swal.fire({
                                icon : 'success',
                                title : '회원탈퇴가 완료되었습니다.'
                              })
                            } else if(result.isDismissed){// 만약 confirm에서 취소 버튼을 눌렀다면 
                              
                            }
                          })
                          }}>
                              확인
                            </CButton>
                        </CInputGroup>
                        <CRow>
                          <CCol xs={6}>
                           
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                 
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        </>
      )
}

export default UnRegisterCheck
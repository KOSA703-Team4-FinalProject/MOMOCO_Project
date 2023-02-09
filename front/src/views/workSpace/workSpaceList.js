import React, { useEffect } from 'react'
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
  CCardFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import RegAndLoginHeader from 'src/components/RegAndLoginHeader'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import momocologo from 'src/assets/images/momocologo.png'
import { map } from 'jquery'

const workSpaceList = () => {
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate();

  const login = JSON.parse(localStorage.getItem('login'))

  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
  }

  useEffect(() => {
    axios({
      url: 'api/getWorkSpace',
      method: 'POST',
      data: params,
    }).then((res) => {
      setWorkspacelist(res.data)
    })

    console.log(workspacelist)
  }, [])

  return (
    <>
      <div className="min-vh-100 align-items-center">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>
                      <strong>WorkSpace List</strong>
                    </h2>
                    <p className="text-medium-emphasis my-1">
                      깃허브의 레파지토리와 연동된 momoco의 워크스페이스입니다.
                    </p>
                    {workspacelist.map((data, idx) => {
                      console.log(data)

                      return (
                        <div key={data.url} onClick={()=>{
                          navigate(`/ws/${data.url}/dashboard`)
                        }}>
                          <h3>
                            {data.url} : {data.space_name}
                          </h3>
                        </div>
                      )
                    })}
                    <CInputGroup className="mb-4 my-5">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput placeholder="워크스페이스 이름" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cilLinkBroken} />
                      </CInputGroupText>
                      <CFormInput type="text" placeholder="momoco.kr/워크스페이스 주소" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={icon.cibGithub} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="불러온 github 레파지토리 이름"
                        required
                      />
                    </CInputGroup>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </div>
    </>
  )
}

export default workSpaceList

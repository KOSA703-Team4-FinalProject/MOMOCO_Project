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
  CWidgetStatsF,
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
import styled from 'styled-components'

const workSpaceList = () => {
  const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to right,
        rgba(20, 20, 20, 0.1) 10%,
        rgba(20, 20, 20, 0.7) 70%,
        rgba(20, 20, 20, 1)
      ),
      url({momoco});
    background-size: cover;
  `
  const [workspacelist, setWorkspacelist] = useState([])
  const navigate = useNavigate()

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
      <div className="min-vh-100 align-items-center Container">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>
                      <strong>{params.nickname}`s WorkSpace </strong>
                    </h2>
                    {workspacelist.map((data, idx) => {
                      console.log(data)

                      return (
                        <div
                          key={data.url}
                          onClick={() => {
                            navigate(`/ws/${data.url}/dashboard`)
                          }}
                        >
                          <br />

                          <CCol xs={6}>
                            <CWidgetStatsF
                              className="mb-3"
                              color="primary"
                              icon={<CIcon icon={icon.cilChartPie} height={24} />}
                              padding={false}
                              title={data.space_name}
                              value="89.9%"
                            />
                          </CCol>
                        </div>
                      )
                    })}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
          <img src={momocologo} width="40%" />
        </CRow>
      </div>
    </>
  )
}

export default workSpaceList

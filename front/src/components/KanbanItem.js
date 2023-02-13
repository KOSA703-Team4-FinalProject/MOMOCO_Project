import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { Suspense, useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import CryptoJS from 'crypto-js'
import { PRIMARY_KEY } from '../oauth'
import { Link, useNavigate, useParams } from 'react-router-dom'
import KanbanDetail from 'src/views/kanban/KanbanDetail'
import axios from 'axios'

const KanbanItem = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [kanbanItemList, setKanbanItemList] = useState([])
  const [conList, setConList] = useState()
  const [view, setView] = useState(false)
  const [view2, setView2] = useState(false)

  const navigate = useNavigate()
  const param = useParams()
  const login = JSON.parse(localStorage.getItem('login'))

  let font = {
    fontSize: '1rem',
  }

  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

  const accessToken = decrypted.token

  const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  )

  useEffect(() => {
    const params = {
      u_idx: login.u_idx,
      nickname: login.nickname,
      url: param.url,
    }

    axios({
      url: '/api/kanban/getKanban',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      console.log(res.data)
      setKanbanItemList(res.data)
      setView(true)
    })

    const params2 = {
      url: param.url,
    }

    axios({
      url: '/api/status/getStatus',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params2,
    }).then((res) => {
      console.log(res.data)
      setConList(res.data)
      setView2(true)
    })
  }, [])

  function myView(data) {
    {
      data.map((data2) => {
        return (
          <div className="py-1" key={data2.idx}>
            <CCard className="draggable" draggable="true">
              <CRow>
                <CCol xs="auto" className="me-auto">
                  <CCardHeader>{data2.title}</CCardHeader>
                </CCol>
                <CCol xs="auto">
                  <CDropdown alignment="end">
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      <CIcon icon={icon.cilChevronBottom} />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem>wlsgo</CDropdownItem>
                      <CDropdownItem>Another action</CDropdownItem>
                      <CDropdownItem>Something else here...</CDropdownItem>
                      <CDropdownItem disabled>Disabled action</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CCol>
              </CRow>
              <CCardBody>
                <CCardTitle>
                  <a onClick={() => setVisibleXL(!visibleXL)} style={font}>
                    {data2.content}
                  </a>
                </CCardTitle>
              </CCardBody>
              <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                <CModalBody>
                  <KanbanDetail />
                </CModalBody>
              </CModal>
            </CCard>
          </div>
        )
      })
    }
  }

  return (
    <>
      {view == false ? (
        <></>
      ) : view2 == false ? (
        <></>
      ) : (
        <Suspense fallback={loading}>
          {kanbanItemList.map((data, key) => {
            return (
              <CCard
                style={{ width: '300px' }}
                className="bg-light py-3 me-2 container1"
                key={conList[key].s_name}
              >
                <CRow>
                  <CCol xs="auto" className="me-auto bg-light">
                    {conList[key].s_name}
                  </CCol>
                  <CCol xs="auto">
                    {' '}
                    <CDropdown alignment="end">
                      <CDropdownToggle color="transparent" caret={false} className="p-0">
                        <CIcon icon={icon.cilOptions} />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem>Action</CDropdownItem>
                        <CDropdownItem>Another action</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CCol>
                </CRow>
                <Suspense fallback={loading}>
                  {data.map((data2) => {
                    return (
                      <div className="py-1" key={data2.idx}>
                        <CCard className="draggable" draggable="true">
                          <CRow>
                            <CCol xs="auto" className="me-auto">
                              <CCardHeader>{data2.title}</CCardHeader>
                            </CCol>
                            <CCol xs="auto">
                              <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="p-0">
                                  <CIcon icon={icon.cilChevronBottom} />
                                </CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem>wlsgo</CDropdownItem>
                                  <CDropdownItem>Another action</CDropdownItem>
                                  <CDropdownItem>Something else here...</CDropdownItem>
                                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </CCol>
                          </CRow>
                          <CCardBody>
                            <CCardTitle>
                              <a onClick={() => setVisibleXL(!visibleXL)} style={font}>
                                {data2.content}
                              </a>
                            </CCardTitle>
                          </CCardBody>
                          <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                            <CModalBody>
                              <KanbanDetail />
                            </CModalBody>
                          </CModal>
                        </CCard>
                      </div>
                    )
                  })}
                </Suspense>
              </CCard>
            )
          })}
        </Suspense>
      )}
    </>
  )
}

export default KanbanItem

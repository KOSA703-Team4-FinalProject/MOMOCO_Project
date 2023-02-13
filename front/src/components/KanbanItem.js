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
import React, { useEffect, useState } from 'react'
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

  const navigate = useNavigate()
  const param = useParams()
  const login = JSON.parse(localStorage.getItem('login'))
  const params = {
    u_idx: login.u_idx,
    nickname: login.nickname,
    url: param.url,
  }

  let font = {
    fontSize: '1rem',
  }

  useEffect(() => {
    // AES알고리즘 사용 복호화
    const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
    //인코딩, 문자열로 변환, JSON 변환
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    const accessToken = decrypted.token

    axios({
      url: '/api/kanban/getKanban',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      console.log(res.data)
      setConList(res.data.conNum)

      setKanbanItemList(res.data)
    })
  }, [])

  const view = (data) => {
    console.log(data)
  }

  return (
    <div>
      {conList == null ? (
        <></>
      ) : (
        <>
          {conList.map((data) => (
            <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1" key={data}>
              <CRow>
                <CCol xs="auto" className="me-auto bg-light">
                  {data}
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
              {view(data)}
            </CCard>
          ))}
        </>
      )}
    </div>
  )
}

export default KanbanItem

import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  Cbutton,
  CButton,
  CCardHeader,
  CCardTitle,
  CCardText,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTooltip,
  CLink,
  CPopover,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CForm,
  CFormTextarea,
  CFormLabel,
  CFormSelect,
  CCollapse,
  CHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import KanbanItem from '../../components/KanbanItem'
import { useEffect, useRef, useState } from 'react'
import HorizontalScroll from 'react-horizontal-scrolling'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { PRIMARY_KEY } from '../../oauth'
import { width } from '@mui/system'
import { Navigate, useParams } from 'react-router-dom'
import $ from 'jquery'

const Kanban = () => {
  const [visible, setVisible] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  // 변수
  const [addKanbanItem, setAddKanbanItem] = useState([])
  const [statusList, setStateList] = useState([])
  const [kanbanlist, setKanbanlist] = useState('')
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  const params = useParams()

  const url = params.url
  const login = JSON.parse(localStorage.getItem('login'))

  //전체 일정 추가
  const addKanban = () => {
    const reqData = {
      s_idx: $('#status_select option:selected').val(),
      nickname: login.nickname,
      title: $('#kanbantitle').val(),
      content: $('#kanbancontent').val(),
      b_code: 6,
      label: '.',
      u_idx: login.u_idx,
      url: url,
    }
    console.log(reqData)

    if (confirm('등록하시겠습니까?')) {
      axios({
        method: 'POST',
        url: '/api/kanban/addKanban',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reqData,
      }).then((res) => {
        console.log(res)
        alert('등록이 완료 되었습니다.')
        setVisible(!visible)
        setKanbanlist('1')
        getStatus()
      })
    } else {
      alert('취소되었습니다')
    }
  }

  const addColumn = () => {
    const reqData = {
      s_name: $('#addcolumntitle').val(),
      url: url,
    }

    axios({
      method: 'POST',
      url: '/api/kanban/addKanbanColumn',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: reqData,
    }).then((res) => {
      console.log(res)
      setKanbanlist('2')
    })
  }

  const getStatus = () => {
    const params2 = {
      url: params.url,
    }

    axios({
      url: '/api/status/getStatus',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params2,
    }).then((res) => {
      setStateList(res.data)
    })
  }

  useEffect(() => {
    getStatus()
  }, [kanbanlist])

  /**
   * [x] 엘리먼트의 .draggable, .container의 배열로 선택자를 지정합니다.
   * [x] draggables를 전체를 루프하면서 dragstart, dragend를 이벤트를 발생시킵니다.
   * [x] dragstart, dragend 이벤트를 발생할때 .dragging라는 클래스를 토글시킨다.
   * [x] dragover 이벤트가 발생하는 동안 마우스 드래그하고 마지막 위치해놓은 Element를 리턴하는 함수를 만듭니다.
   */

  return (
    <>
      <CCard className="col-md-12 my-3">
        <CCardBody onClick={() => setVisible(!visible)}>
          <CIcon icon={icon.cilMedicalCross} /> Add Item
        </CCardBody>
      </CCard>

      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CIcon icon={icon.cibGithub} className="me-2" />
              <CFormLabel htmlFor="exampleFormControlInput1">Add Item</CFormLabel>
              <CFormInput
                type="text"
                id="kanbantitle"
                placeholder="제목을 입력해주세요"
                maxLength={11}
              />
            </div>
            <hr />
            상태 입력
            <br />
            <br />
            <CFormSelect id="status_select" aria-label="상태 입력">
              {statusList.map((sta) => (
                <option value={sta.s_idx} key={sta.s_idx}>
                  {sta.s_name}
                </option>
              ))}
            </CFormSelect>
            <br />
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
              <br />
              <br />
              <CFormTextarea
                id="kanbancontent"
                rows={4}
                placeholder="내용을 입력해주세요"
              ></CFormTextarea>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            취소
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              addKanban()
            }}
          >
            등록
          </CButton>
          {/* 등록 시 알림 sweetalert2 */}
        </CModalFooter>
      </CModal>

      <CCard style={{ width: '100%' }} className="">
        <HorizontalScroll>
          <CCardBody className="mx-2">
            <CRow>
              {/*  */}
              {/* 카드 + 아이템이 들어갈 곳 */}
              <KanbanItem props={kanbanlist} />

              <CCard style={{ width: '300px' }} className="">
                <CHeader onClick={() => setVisibleB(!visibleB)}>
                  <CIcon icon={icon.cilPlus} />
                </CHeader>
                <CRow>
                  <CCol xs={12}>
                    <CCollapse visible={visibleB}>
                      <CCard className="mt-3">
                        <CCardBody>
                          <div className="mb-3">
                            <CForm>
                              <CFormLabel htmlFor="exampleFormControlTextarea1">
                                <strong>컬럼 추가</strong>
                              </CFormLabel>
                              <br />
                              <br />
                              제목
                              <CFormInput
                                type="text"
                                id="addcolumntitle"
                                placeholder="제목을 입력해주세요"
                              />
                              <br />
                              <div align="end">
                                <CButton
                                  className="me-2"
                                  variant="outline"
                                  color="primary"
                                  onClick={() => {
                                    if (confirm('컬럼을 등록하시겠습니까?')) {
                                      alert('등록을 완료했습니다.')
                                      setVisibleB(!visibleB)
                                      addColumn()
                                    } else {
                                      alert('취소했습니다.')
                                    }
                                  }}
                                >
                                  등록
                                </CButton>

                                <CButton
                                  variant="outline"
                                  color="danger"
                                  onClick={() => setVisibleB(!visibleB)}
                                >
                                  {' '}
                                  취소
                                </CButton>
                              </div>
                            </CForm>
                          </div>
                        </CCardBody>
                      </CCard>
                    </CCollapse>
                  </CCol>
                </CRow>
              </CCard>
            </CRow>
          </CCardBody>
        </HorizontalScroll>
      </CCard>
    </>
  )
}

export default Kanban

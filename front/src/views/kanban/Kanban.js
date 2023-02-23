import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CFormInput,
  CForm,
  CFormTextarea,
  CFormLabel,
  CFormSelect,
  CCollapse,
  CHeader,
  CFormCheck,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
import Swal from 'sweetalert2'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import KanbanItem from '../../components/KanbanItem'
import { useEffect, useRef, useState } from 'react'
import HorizontalScroll from 'react-horizontal-scrolling'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { PRIMARY_KEY } from '../../oauth'
import { useParams } from 'react-router-dom'
import $ from 'jquery'
//라벨컴포넌트 필요 요소
import Label from 'src/components/Label'
import { chooseLabel } from 'src/store'
import { useDispatch, useSelector } from 'react-redux'

const Kanban = () => {
  const [visible, setVisible] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const [statusList, setStateList] = useState([])
  const [kanbanlist, setKanbanlist] = useState('')
  const [u_idxlist, SetU_idxlist] = useState([]) // 알람보낼 유저 아이디 리스트
  const [alarmList, setAlarmList] = useState('') //알람 보낼 u_idx 리스트
  // AES알고리즘 사용 복호화
  const bytes = CryptoJS.AES.decrypt(localStorage.getItem('token'), PRIMARY_KEY)
  //인코딩, 문자열로 변환, JSON 변환
  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  const accessToken = decrypted.token
  const params = useParams()

  const url = params.url
  const login = JSON.parse(localStorage.getItem('login'))

  //라벨
  const chooseLabel = useSelector((state) => state.chooseLabel)
  const [label, SetLabel] = useState('')
  const [style, SetStyle] = useState('')
  useEffect(() => {
    SetLabel(chooseLabel.label)
    SetStyle(chooseLabel.style)
  }, [chooseLabel])

  //전체 일정 추가
  const addKanban = () => {
    const reqData = {
      s_idx: $('#status_select option:selected').val(),
      nickname: login.nickname,
      title: $('#kanbantitle').val(),
      content: $('#kanbancontent').val(),
      b_code: 6,
      label: label,
      u_idx: login.u_idx,
      url: url,
      u_idxList: alarmList,
    }
    console.log(reqData.title)
    if (!reqData.title || !reqData.content) {
      Swal.fire({
        icon: 'warning', // 여기다가 아이콘 종류를 쓰면 됩니다.
        title: '제목, 내용을 모두 입력해주세요',
      })
    } else {
      Swal.fire({
        title: '등록하시겠습니까?',
        text: '',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '등록', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: true, // 버튼 순서 거꾸로
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          axios({
            method: 'POST',
            url: '/api/kanban/addKanban',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: reqData,
          }).then((res) => {
            console.log(res)
            Swal.fire({
              icon: 'success', // 여기다가 아이콘 종류를 쓰면 됩니다.
              title: '등록이 완료 되었습니다',
            })
            setVisible(!visible)
            setKanbanlist('1')
            getStatus()
          })
        } else {
          Swal.fire({
            icon: 'error', // 여기다가 아이콘 종류를 쓰면 됩니다.
            title: '취소되었습니다',
          })
        }
      })
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
      console.log(res.data)
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

    axios({
      method: 'GET',
      url: '/api/alarm/teamlist',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        url: url,
      },
    }).then((res) => {
      console.log(res)
      SetU_idxlist([])
      res.data.map((data) => {
        SetU_idxlist((u_idxlist) => [...u_idxlist, data])
      })
    })
  }, [kanbanlist])

  /**
   * [x] 엘리먼트의 .draggable, .container의 배열로 선택자를 지정합니다.
   * [x] draggables를 전체를 루프하면서 dragstart, dragend를 이벤트를 발생시킵니다.
   * [x] dragstart, dragend 이벤트를 발생할때 .dragging라는 클래스를 토글시킨다.
   * [x] dragover 이벤트가 발생하는 동안 마우스 드래그하고 마지막 위치해놓은 Element를 리턴하는 함수를 만듭니다.
   */

  //알림 전송할 u_idx List 생성
  const checkAList = (e) => {
    const result = e.target.checked
    const u_idx = e.target.value

    if (result == true) {
      setAlarmList(alarmList + ',' + u_idx)
    } else {
      const str = alarmList.split(',')
      setAlarmList([])

      str.map((res) => {
        if (res != u_idx) {
          setAlarmList(alarmList + ',' + u_idx)
        }
      })
    }
  }

  return (
    <>
      <CCard className="col-md-12 my-3">
        <CCardBody onClick={() => setVisible(!visible)}>
          <CIcon icon={icon.cilMedicalCross} /> Add Item
        </CCardBody>
      </CCard>

      <CModal size="xl" alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalBody className="p-3">
          <CForm>
            <CIcon icon={icon.cibGithub} className="me-2" />
            <CFormLabel htmlFor="exampleFormControlInput1">
              <h4>Add Item</h4>
            </CFormLabel>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                <strong>
                  라벨 선택{' '}
                  <CButton color={chooseLabel.style} shape="rounded-pill" size="sm">
                    {chooseLabel.label}
                  </CButton>
                </strong>
              </CFormLabel>
              <CCol sm={10}>
                <CCol className="mb-3">
                  <Label />
                </CCol>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                <strong>문서 제목</strong>
              </CFormLabel>
              <CCol sm={10}>
                <CCol className="mb-3">
                  <CFormInput type="text" id="kanbantitle" placeholder="제목을 입력해주세요" />
                </CCol>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                <strong>진행 상태</strong>
              </CFormLabel>
              <CCol sm={10}>
                <CCol className="mb-3">
                  <CFormSelect id="status_select" aria-label="상태 입력">
                    {statusList.map((sta) => (
                      <option value={sta.s_idx} key={sta.s_idx}>
                        {sta.s_name}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                <strong>알림 전송</strong>
              </CFormLabel>
              <CCol sm={10}>
                {u_idxlist.map((data) => {
                  return (
                    <>
                      <CFormCheck
                        inline
                        className="u_idx"
                        value={data.u_idx}
                        onChange={checkAList}
                      />
                      <CAvatar className="ms-2" src={data.profilephoto} />
                      <strong>{data.nickname} </strong>
                    </>
                  )
                })}
              </CCol>
            </CRow>

            <div className="mb-3">
              <CFormTextarea
                id="kanbancontent"
                rows={7}
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

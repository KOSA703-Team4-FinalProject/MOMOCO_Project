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
  CModalHeader,
  CModalTitle,
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
import { Octokit } from 'octokit'

const Kanban = () => {
  const [visible, setVisible] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const [statusList, setStateList] = useState([])
  const [kanbanlist, setKanbanlist] = useState('')
  const [u_idxlist, SetU_idxlist] = useState([]) // 알람보낼 유저 아이디 리스트
  const [alarmList, setAlarmList] = useState('') //알람 보낼 u_idx 리스트

  const [commitsList, setCommitsList] = useState([])
  const [listview, setListView] = useState(false)

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
      label: $('#selectlabel').val(),
      b_code: 6,
      label: label,
      u_idx: login.u_idx,
      url: url,
      u_idxList: alarmList,
    }
    console.log(reqData.title)
    console.log(reqData.content)
    if (!reqData.title || !reqData.content || !reqData.label) {
      Swal.fire({
        icon: 'warning', // 여기다가 아이콘 종류를 쓰면 됩니다.
        title: '라벨, 제목, 내용을 모두 입력해주세요',
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

    if (!reqData.s_name) {
      Swal.fire({
        icon: 'warning', // 여기다가 아이콘 종류를 쓰면 됩니다.
        title: '컬럼명을 입력해주세요',
      })
    } else {
      Swal.fire({
        title: '컬럼을 등록하시겠습니까?',
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
            url: '/api/kanban/addKanbanColumn',
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
            setVisibleB(!visibleB)
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
    // axios({
    //   method: 'POST',
    //   url: '/api/kanban/addKanbanColumn',
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   data: reqData,
    // }).then((res) => {
    //   console.log(res.data)
    //   setKanbanlist('2')
    // })
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

  //github에서 이슈 불러오기
  const loadIssue = (e) => {
    axios({
      method: 'GET',
      url: '/api/workspaceowner',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { url: params.url },
    }).then((res) => {
      getIssue(res.data)
    })
  }

  const octokit = new Octokit({
    auth: `Bearer ${accessToken}`,
  })

  const getIssue = (data) => {
    //레파지토리 이름
    const repos = data.linked_repo
    //레포지토리 주인
    const owner = data.owner

    console.log(repos)
    console.log(owner)

    octokit
      .request('GET /repos/{owner}/{repo}/issues', {
        owner: owner,
        repo: repos,
      })
      .then((res) => {
        console.log(res.data)
        setCommitsList(() => [])
        res.data.map((d) => {
          setCommitsList((commitsList) => [...commitsList, d])
        })
        setListView(true)
      })
  }

  //이슈 클릭시 content에 추가
  const clickIssue = (e) => {
    const tar = e.target
    const targ = $(tar).closest('.issue').attr('issueSrc')
    const title = $(tar).closest('.issue').attr('title')
    const num = $(tar).closest('.issue').attr('num')

    console.log(targ)

    $('#kanbancontent').val(targ)
    $('#kanbantitle').val('#' + num + ' ' + title)

    setListView(false)
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
            <CRow>
              <CFormLabel htmlFor="exampleFormControlInput1">
                <CCol md={12}>
                  <CRow className="justify-content-between">
                    <div className="row col-3">
                      <h4>
                        <CIcon icon={icon.cibGithub} size="lg" className="me-2" />
                        <strong>Add Item</strong>
                      </h4>
                    </div>
                    <div className="col-4" align="end">
                      <CButton color="primary" variant="outline" onClick={loadIssue}>
                        Issue 불러오기
                      </CButton>
                    </div>
                  </CRow>
                </CCol>
              </CFormLabel>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-2 col-form-label">
                <strong>라벨 선택 </strong>
                {chooseLabel.label != '' ? (
                  <CButton
                    color={chooseLabel.style}
                    shape="rounded-pill"
                    size="sm"
                    id="selectlabel"
                  >
                    {chooseLabel.label}
                  </CButton>
                ) : (
                  <strong>하세요</strong>
                )}
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
                              컬럼명
                              <CFormInput
                                type="text"
                                id="addcolumntitle"
                                placeholder="컬럼명을 입력해주세요"
                              />
                              <br />
                              <div align="end">
                                <CButton
                                  className="me-2"
                                  variant="outline"
                                  color="success"
                                  onClick={addColumn}
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
        {/* 이슈 불러오기 목록 */}
        <CModal
          alignment="center"
          scrollable
          backdrop="static"
          visible={listview}
          onClose={() => setListView(false)}
        >
          <CModalHeader onClose={() => setListView(false)}>
            <CModalTitle>Issue List</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {commitsList.map((data) => {
              return (
                <CCard
                  key={data.id}
                  className="my-3 p-3 issue"
                  issueSrc={data.html_url}
                  title={data.title}
                  num={data.number}
                  onClick={clickIssue}
                >
                  <CCard className="p-2 mt-2">
                    <h5>
                      <strong>{data.title}</strong>
                    </h5>
                  </CCard>

                  <div align="end" className="m-2">
                    <CAvatar src={data.user.avatar_url} className="me-2" />
                    {data.user.login}
                  </div>

                  {data.body}
                </CCard>
              )
            })}
          </CModalBody>
        </CModal>
      </CCard>
    </>
  )
}

export default Kanban

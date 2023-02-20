import {
  CButton,
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
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CHeader,
  CModal,
  CModalBody,
  CModalFooter,
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
import $ from 'jquery'

const KanbanItem = (props) => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [s_name, setS_name] = useState('')

  const [kanbanItemList, setKanbanItemList] = useState([])
  const [columnValue, setColumnValue] = useState([])
  const [conList, setConList] = useState()
  const [view, setView] = useState(false)
  const [view2, setView2] = useState(false)
  const [action1, setAction1] = useState(false)

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

  const getKanban = () => {
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
      setAction1(true)
    })
  }

  // 모든 아이템 삭제
  const deleteAllKanbanItem = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')

    const params = { url: param.url, s_idx: content_type }
    console.log('모두 삭제')
    console.log(params.url)

    if (confirm('해당 컬럼의 모든 아이템을 삭제하시겠습니까?')) {
      alert('삭제가 완료되었습니다.')
      axios({
        url: '/api/kanban/deleteAllKanbanItem',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: params,
      }).then((res) => {
        console.log(res.data)
        getKanban()
      })
    } else {
      alert('취소했습니다.')
    }
  }

  // 모든 컬럼 삭제
  const deleteKanbanColumn = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')

    const params = { s_idx: content_type, url: param.url }
    console.log('컬럼 삭제 : ' + params.s_idx)

    if (params.s_idx < 4) {
      alert('기본 컬럼은 삭제할 수 없습니다.')
    } else {
      axios({
        url: '/api/kanban/get',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: params,
      }).then((res) => {
        const data = res.data

        setS_name(data.s_name)
        const list = data.map((item) => {
          // 각 항목에 대한 정보 출력하기
          console.log(item.idx)

          return (
            '(글번호 : ' +
            item.idx +
            ' / ' +
            '제목 : ' +
            item.title +
            ' / ' +
            '작성자 : ' +
            item.nickname +
            ' / ' +
            '게시판 : ' +
            item.b_code +
            ')  '
          )
        })
        if (
          confirm('삭제시 캘린더와 칸반의 글들이 모두 삭제됩니다. 정말 지우시겠습니까?  ' + list)
        ) {
          alert('삭제가 완료 되었습니다.')
          axios({
            url: '/api/kanban/deleteKanbanColumn',
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: params,
          }).then((res) => {
            getKanban()
          })
        } else {
          alert('취소했습니다.')
        }
      })
    }
  }

  // 컬럼 제목 수정 모달 띄우기
  const editKanbanColumnNameModal = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const content_type1 = $(tag).attr('id')
    const editName = $('#editColumnName').val()
    console.log(content_type)
    const title = $('#ViewTitle')
    const params = { s_idx: content_type, url: param.url }
    console.log('컬럼 제목 수정 : ' + content_type)

    if (params.s_idx < 4) {
      alert('기본 컬럼은 제목 수정이 불가합니다.')
    } else {
      setTitleVisible(!titleVisible)
      setColumnValue(content_type)
    }
  }

  const editKanbanColumnName = (e) => {
    e.preventDefault()
    const name = e.target.elements.editColumnName.value
    const params = { s_name: name, s_idx: columnValue, url: param.url }

    axios({
      method: 'POST',
      url: '/api/kanban/modifyKanbanColumnName',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      console.log(res)
      alert('수정이 완료 되었습니다.')
      setTitleVisible(!titleVisible)
      getKanban()
    })
  }

  useEffect(() => {
    getKanban()
  }, [props])

  // 내일 수정해야 할 부분

  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable') //nodeList 반환
    const containers = document.querySelectorAll('.container1')

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', (event) => {
        draggable.classList.remove('dragging')

        let target = $(event.target)

        let supertag = target.closest('.container1')

        let childtag = $(supertag).children()
        console.log(childtag)

        let arr = []
        let num = 0

        $(childtag).each(function () {
          let request4 = {
            // b_idx: b_idx,
            side: num,
            // s_idx: s_idx,
          }
          arr.push(request4)

          num += 1
        })
        console.log(arr)
        // for (let i = 1; i < arr.length; i++) {
        //   let request5 = {
        //     title: arr[i].title,

        //     side: arr[i].side,
        //     s_idx: s_idx,
        //   }

        arr.map((item, i) => {
          let request5 = {
            // b_idx: item[i].b_idx,
            // side: item[i].side,
            // s_idx: item[i].s_idx,
          }
          let data = JSON.stringify(request5)

          axios({
            type: 'put',
            url: '/api/kanban/updateLocationKanban',
            data: data,
            dataType: 'text',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {},
          })
        })

        // }
      })
    })

    containers.forEach((container) => {
      container.addEventListener('dragover', (e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientX)
        const draggable = document.querySelector('.dragging')
        if (afterElement === undefined) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement) //드래그 할수 있는 위치 중 옮겨진 위치에 삽입
        }
      })
    })

    function getDragAfterElement(container, x) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = x - box.left - box.width / 2
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        },
        { offset: Number.NEGATIVE_INFINITY },
      ).element
    }
  }, [view, view2, action1, kanbanItemList])

  // 내일 수정해야 할 부분

  return (
    <>
      {view2 == false ? (
        <></>
      ) : view == false ? (
        <></>
      ) : (
        <Suspense fallback={loading}>
          {conList.map((data, key) => {
            return (
              <CCard
                style={{ width: '300px' }}
                className="bg-dark py-3 me-2 container1"
                key={conList[key].s_name}
              >
                <CRow>
                  <CCol xs="auto" className="me-auto text-light">
                    <input type="hidden"></input>
                    {conList[key].s_name}
                  </CCol>
                  <CCol xs="auto">
                    {' '}
                    <CDropdown alignment="end">
                      <CDropdownToggle color="transparent" caret={false} className="p-0">
                        <CIcon icon={icon.cilOptions} className="text-light" />
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          value={conList[key].s_idx}
                          onClick={editKanbanColumnNameModal}
                        >
                          카드 제목 수정
                        </CDropdownItem>
                        <CDropdownItem value={conList[key].s_idx} onClick={deleteKanbanColumn}>
                          카드 삭제
                        </CDropdownItem>
                        <CDropdownItem value={conList[key].s_idx} onClick={deleteAllKanbanItem}>
                          아이템 모두 삭제
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                    <CModal
                      alignment="center"
                      visible={titleVisible}
                      onClose={() => setTitleVisible(false)}
                    >
                      <CModalBody>
                        <CForm onSubmit={editKanbanColumnName} value={conList[key].s_idx}>
                          <div className="mb-3">
                            <CIcon icon={icon.cibGithub} className="me-2" />
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              <strong>컬럼명 변경</strong>
                            </CFormLabel>
                            <hr />
                            새로운 컬럼명
                            <br />
                            <br />
                            <CFormInput type="text" id="editColumnName" />
                          </div>

                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setTitleVisible(false)}>
                              취소
                            </CButton>
                            <CButton color="primary" type="submit">
                              변경
                            </CButton>
                            {/* 등록 시 알림 sweetalert2 */}
                          </CModalFooter>
                        </CForm>
                      </CModalBody>
                    </CModal>
                  </CCol>
                </CRow>
                {kanbanItemList[key] == null ? (
                  <></>
                ) : (
                  <Suspense fallback={loading}>
                    {kanbanItemList[key].map((data2) => {
                      return (
                        <div className="" key={data2.idx}>
                          <CCard className="draggable" draggable="true">
                            <CRow>
                              <CCol xs="auto" className="me-auto">
                                <CCardHeader>{data2.title}</CCardHeader>
                              </CCol>
                              <CCol xs="auto">
                                <CDropdown alignment="end">
                                  <CDropdownToggle
                                    color="transparent"
                                    caret={false}
                                    className="p-0"
                                  >
                                    <CIcon icon={icon.cilChevronBottom} />
                                  </CDropdownToggle>
                                  <CDropdownMenu>
                                    {/* <CDropdownItem
                                      onClick={() => {
                                        deleteKanbanColumn()
                                      }}
                                    >
                                      컬럼 삭제
                                    </CDropdownItem> */}
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
                            <CModal
                              size="xl"
                              visible={visibleXL}
                              onClose={() => setVisibleXL(false)}
                            >
                              <CModalBody>
                                <KanbanDetail />
                              </CModalBody>
                            </CModal>
                          </CCard>
                        </div>
                      )
                    })}
                  </Suspense>
                )}
              </CCard>
            )
          })}
        </Suspense>
      )}
    </>
  )
}

export default KanbanItem

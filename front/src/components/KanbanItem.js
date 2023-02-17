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
  CFormTextarea,
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
import $ from 'jquery'

const KanbanItem = () => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [kanbanItemList, setKanbanItemList] = useState([])
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

  const deleteAllKanbanItem = () => {
    const params = { s_idx: $('#s_name_delete').val(), url: param.url }
    console.log(data)

    axios({
      url: '/api/kanban/deleteAllKanbanItem',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      console.log(res.data)
    })
  }

  const deleteKanbanColumn = () => {
    const params = { s_idx: $('#s_name_delete').val(), url: param.url }

    axios({
      url: '/api/kanban/deleteKanbanColumn',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      console.log(res.data)
    })
  }

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
      setAction1(true)
    })
  }, [])

  // 내일 수정해야 할 부분

  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable') //nodeList 반환
    const containers = document.querySelectorAll('.container1')

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
        console.log('뭐라도 좀 나와라' + main)
        let target = $(event.target)
        let children1 = $(target).children()
        let ch = $(children1).children().eq(0)

        let supertag = target.closest('.container')
        let childtag = $(supertag).children()

        let arr = []
        let num = 0

        $(childtag).each(function () {
          let request4 = {
            title: $(this).html().trim().split('<', 1)[0],
            side: num,
          }

          arr.push(request4)

          num += 1
        })

        let main = arr[0].s_idx

        for (let i = 1; i < arr.length; i++) {
          let request5 = {
            title: arr[i].title,

            side: arr[i].side,
            content: main,
          }

          let data = JSON.stringify(request5)
          console.log(data)
          axios({
            type: 'put',
            url: '/api/kanban/updateLocationKanban',
            data: data,
            dataType: 'text',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {},
          })
        }
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
  }, [view, view2, action1])

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
                    <input type="hidden" id="s_name_delete" value={conList[key].s_idx}></input>
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
                          onClick={() => {
                            deleteAllKanbanItem()
                          }}
                        >
                          모두 삭제
                        </CDropdownItem>
                        <CDropdownItem>제목 수정</CDropdownItem>
                        <CDropdownItem>Something else here...</CDropdownItem>
                        <CDropdownItem disabled>Disabled action</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
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
                                    <CDropdownItem
                                      onClick={() => {
                                        deleteKanbanColumn()
                                      }}
                                    >
                                      컬럼 삭제
                                    </CDropdownItem>
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

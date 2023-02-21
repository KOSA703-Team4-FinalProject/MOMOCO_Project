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
  CFormSelect,
  CFormText,
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
import { useRef } from 'react'

const KanbanItem = (props) => {
  const [visibleXL, setVisibleXL] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const [visiblemodify, setVisibleModify] = useState(false)
  const [s_name, setS_name] = useState('')
  const [getidx, setGetIdx] = useState('')
  const [value, setValue] = useState('')
  const [inputtitle1, setInputTitle1] = useState('')
  const [inputtitle2, setInputTitle2] = useState('')
  const [statusList, setStateList] = useState([])
  const [itemvisible, setItemVisible] = useState(false)
  const [itemDetail, setItemDetail] = useState([])
  const [kanbanItemList, setKanbanItemList] = useState([])
  const [columnValue, setColumnValue] = useState([])
  const [conList, setConList] = useState()
  const [view, setView] = useState(false)
  const [view2, setView2] = useState(false)
  const [action1, setAction1] = useState(false)

  const navigate = useNavigate()
  const param = useParams()
  const login = JSON.parse(localStorage.getItem('login'))
  const modifyModal = useRef()

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
  // 칸반 전체 불러오기
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
      // console.log(res.data)
      // setKanbanItemList(res.data)
      // setView(true)

      console.log(res.data)

      // let arr = []
      // $(res.data).each(function (data, key) {
      //   console.log(res.data)
      //   console.log(data)
      //   if ($(res.data[data]).attr('content').length > 10) {
      //     let request4 = {
      //       content: $(res.data[data]).attr('content').substring(0, 10) + '...',
      //     }
      //     arr.push(request4)
      //   }
      // })

      // console.log(arr)
      // console.log($(res.data[0]).attr('content').length)

      // const data = res.data

      // const modifiedData = data.map((item,i) => {
      //   if ($(item[i]).attr('content').length >= 10) {
      //     $(item[i]).attr('content') = $(item[i]).attr('content').substring(0, 10) + '...'
      //   }
      //   return item
      // })

      // console.log(modifiedData)
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
      // console.log(res.data)
      setConList(res.data)
      setView2(true)
      setAction1(true)
      setStateList(res.data)
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

    const params = { s_idx: content_type, url: param.url }

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
      url: '/api/kanban/modifyKanbanColumnName',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      alert('수정이 완료 되었습니다.')
      setTitleVisible(!titleVisible)
      getKanban()
    })
  }

  // 아이템 상세보기

  const KanbanItemDetail = (e) => {
    setVisibleXL(!visibleXL)

    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { idx: content_type, url: param.url }

    setGetIdx(content_type)

    axios({
      url: '/api/kanban/GetKanbanItemDetail',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: params,
    }).then((res) => {
      setItemDetail(res.data)
    })
  }
  // 칸반 아이템 삭제하기
  const KanbanItemDelete = (e) => {
    const tag = e.target
    const content_type = $(tag).attr('value')
    const params = { b_idx: content_type, url: param.url }

    if (confirm('해당 아이템을 삭제하시겠습니까?')) {
      alert('삭제가 완료 되었습니다.')
      axios({
        url: '/api/kanban/KanbanItemDelete',
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
  }

  // 수정 버튼을 클릭했을때 실행
  const handleButtonClick = () => {
    setVisibleXL(!visibleXL)
    setVisibleModify(!visiblemodify)
  }
  // 수정 모달에서 완료 버튼 눌렀을 때 실행되는 메소드
  const modifyButtonClick = () => {
    // 내용

    const reqData = {
      title: inputtitle1,
      content: inputtitle2,
      idx: getidx,
      url: param.url,
    }

    console.log(reqData)

    if (confirm('수정하시겠습니까?')) {
      axios({
        method: 'POST',
        url: '/api/kanban/modifyKanbanItem',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: reqData,
      }).then((res) => {
        console.log(res)
        alert('수정이 완료 되었습니다.')
        getKanban()
        setVisibleModify(!visiblemodify)
      })
    } else {
      alert('취소되었습니다')
    }
  }

  const onChange1 = (e) => {
    setInputTitle1(e.target.value)
    console.log(inputtitle1)
  }

  const onChange2 = (e) => {
    setInputTitle2(e.target.value)
    console.log(inputtitle2)
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

        $(childtag).each(function (data, key) {
          if (data > 1) {
            let request4 = {
              b_idx: $(childtag[data]).attr('value'),
              side: num,
              s_idx: $(childtag[0]).attr('value'),
            }
            arr.push(request4)
            num += 1
          }
        })

        arr.map((item, i) => {
          let request5 = {
            b_idx: item.b_idx,
            side: item.side,
            s_idx: item.s_idx,
            url: param.url,
          }

          console.log(request5)

          // 위치 업데이트 axios
          axios({
            method: 'PUT',
            url: '/api/kanban/updateLocationKanban',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: request5,
          }).then((res) => {
            console.log(res)
          })
        })

        // }
      })
    })

    containers.forEach((container1) => {
      container1.addEventListener('dragover', (e) => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container1, e.clientX)
        const draggable = document.querySelector('.dragging')
        if (afterElement === undefined) {
          container1.appendChild(draggable)
        } else {
          container1.insertBefore(draggable, afterElement) //드래그 할수 있는 위치 중 옮겨진 위치에 삽입
        }
      })
    })

    function getDragAfterElement(container1, x) {
      const draggableElements = [...container1.querySelectorAll('.draggable:not(.dragging)')]

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
                style={{ width: '300px', height: '600px', overflowY: 'scroll' }}
                className="bg-dark py-3 me-2 container1"
                key={conList[key].s_name}
              >
                <CCol xs="auto" className="me-auto text-light" value={conList[key].s_idx}>
                  {conList[key].s_name.length > 15
                    ? conList[key].s_name.substr(0, 15) + '...    '
                    : conList[key].s_name + '      '}

                  <CDropdown>
                    <CDropdownToggle color="transparent" caret={false} className="p-0">
                      {'        '}
                      <CIcon
                        icon={icon.cilCaretBottom}
                        className="text-light align-content-right"
                      />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem value={conList[key].s_idx} onClick={editKanbanColumnNameModal}>
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
                </CCol>
                <CCol xs="auto">
                  {' '}
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

                {kanbanItemList[key] == null ? (
                  <></>
                ) : (
                  <Suspense fallback={loading}>
                    {kanbanItemList[key].map((data2) => {
                      return (
                        <CCard
                          className="draggable my-2"
                          value={data2.b_idx}
                          draggable="true"
                          key={data2.idx}
                        >
                          <CRow>
                            <CCol xs="auto" className="me-auto">
                              <CCardHeader className="bg-light">
                                {' '}
                                {data2.title.length > 10
                                  ? data2.title.substr(0, 10) + '...'
                                  : data2.title}
                              </CCardHeader>
                              {/* <input type="text" value={data2.b_idx} /> */}
                            </CCol>
                            <CCol xs="auto">
                              <CDropdown alignment="end">
                                <CDropdownToggle color="transparent" caret={false} className="p-0">
                                  <CIcon icon={icon.cilChevronBottom} />
                                </CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem value={data2.idx} onClick={KanbanItemDetail}>
                                    아이템 상세보기
                                  </CDropdownItem>
                                  <CDropdownItem value={data2.b_idx} onClick={KanbanItemDelete}>
                                    아이템 삭제
                                  </CDropdownItem>
                                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </CCol>
                          </CRow>
                          <CCardBody>
                            <CCardText>
                              {data2.content.length > 10
                                ? data2.content.substr(0, 10) + '...'
                                : data2.content}
                            </CCardText>
                          </CCardBody>
                          <br />

                          <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                            <CModalBody>
                              <CCard className="col-md-12 container-fluid">
                                <CIcon icon={icon.cibGithub} className="me-2" />
                                <CFormLabel htmlFor="exampleFormControlInput1">Item</CFormLabel>
                                <b>제목 : {itemDetail.title}</b>
                                <hr />
                                <b>상태 : {itemDetail.s_name}</b>
                                <br />
                                <CCard style={{ height: '200px', overflowY: 'scroll' }}>
                                  <b>{itemDetail.content}</b>
                                </CCard>
                                <br />
                                <CCol className="mz-2" align="center">
                                  <CButton
                                    color="dark"
                                    variant="outline"
                                    onClick={() => {
                                      setVisibleXL(!visibleXL)
                                    }}
                                  >
                                    닫기
                                  </CButton>
                                  {'  '}
                                  <CButton
                                    color="danger"
                                    variant="outline"
                                    onClick={handleButtonClick}
                                  >
                                    수정
                                  </CButton>
                                </CCol>
                                <br />
                              </CCard>
                            </CModalBody>
                          </CModal>
                          {/* 수정 모달 화면 */}

                          <CModal
                            size="xl"
                            visible={visiblemodify}
                            onClose={() => setVisibleModify(false)}
                          >
                            <CModalBody>
                              <CForm>
                                <CCard className="col-md-12 container-fluid" ref={modifyModal}>
                                  <CIcon icon={icon.cibGithub} className="me-2" />
                                  <CFormLabel htmlFor="exampleFormControlInput1" align="center">
                                    <strong>{itemDetail.title}</strong> 수정
                                  </CFormLabel>
                                  <hr />
                                  <b>제목</b>
                                  <br />

                                  <CFormInput
                                    type="text"
                                    className="modifyTitle"
                                    onChange={onChange1}
                                    placeholder={itemDetail.title}
                                  ></CFormInput>
                                  <hr />

                                  <br />
                                  <b>내용</b>
                                  <br />
                                  <CFormTextarea
                                    id="modifyContent"
                                    onChange={onChange2}
                                    style={{ height: '200px', overflowY: 'scroll' }}
                                    placeholder={itemDetail.content}
                                  />

                                  <br />
                                  <CCol className="mz-2" align="center">
                                    <CButton
                                      color="dark"
                                      variant="outline"
                                      onClick={() => {
                                        setVisibleModify(!visiblemodify)
                                      }}
                                    >
                                      닫기
                                    </CButton>
                                    {'  '}
                                    <CButton
                                      color="danger"
                                      variant="outline"
                                      onClick={modifyButtonClick}
                                    >
                                      완료
                                    </CButton>
                                  </CCol>
                                  <br />
                                </CCard>
                              </CForm>
                            </CModalBody>
                          </CModal>
                        </CCard>
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

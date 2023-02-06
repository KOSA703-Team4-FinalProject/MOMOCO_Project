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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import KanbanItem from '../../components/KanbanItem'
import { useEffect, useRef, useState } from 'react'
import HorizontalScroll from 'react-horizontal-scrolling'
import { width } from '@mui/system'

const Kanban = () => {
  const [visible, setVisible] = useState(false)

  /**
   * [x] 엘리먼트의 .draggable, .container의 배열로 선택자를 지정합니다.
   * [x] draggables를 전체를 루프하면서 dragstart, dragend를 이벤트를 발생시킵니다.
   * [x] dragstart, dragend 이벤트를 발생할때 .dragging라는 클래스를 토글시킨다.
   * [x] dragover 이벤트가 발생하는 동안 마우스 드래그하고 마지막 위치해놓은 Element를 리턴하는 함수를 만듭니다.
   */

  useEffect(() => {
    let draggables = document.querySelectorAll('.draggable')
    let containers = document.querySelectorAll('.container1')

    draggables.forEach((draggable) => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
      })

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
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
          container1.insertBefore(draggable, afterElement)
        }
      })
    })

    function getDragAfterElement(container1, x) {
      const draggableElements = [...container1.querySelectorAll('.draggable:not(.dragging)')]
      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect()
          const offset = x - box.left - box.width / 2
          // console.log(offset);
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
          } else {
            return closest
          }
        },
        { offset: Number.NEGATIVE_INFINITY },
      ).element
    }
  }, [])

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
                type="email"
                id="exampleFormControlInput1"
                placeholder="제목을 입력해주세요"
              />
            </div>

            <hr />

            <CFormSelect
              aria-label="상태 입력"
              options={[
                '상태 입력',
                { label: '상태1', value: '1' },
                { label: '상태2', value: '2' },
                { label: '상태3', value: '3' },
              ]}
            />
            <br />
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">내용</CFormLabel>
              <CFormTextarea
                id="exampleFormControlTextarea1"
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
          <CButton color="primary">등록</CButton>
          {/* 등록 시 알림 sweetalert2 */}
        </CModalFooter>
      </CModal>

      <CCard style={{ width: '100%' }} className="">
        <HorizontalScroll>
          <CCardBody className="mx-2">
            <CRow>
              {/*  */}
              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto bg-light">
                    To-Do
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

                {/* 카드가 들어갈 곳 */}
                <KanbanItem />
                <KanbanItem />
              </CCard>
              {/*  */}

              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    In Progress
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

                {/* 카드가 들어갈 곳 */}
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
              </CCard>

              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    Done
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

                {/* 카드가 들어갈 곳 */}
                <div className="py-1">
                  <KanbanItem />
                  {/* 여기에 계속 추가되면 됩니다.... */}
                </div>

                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
              </CCard>

              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    Done
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

                {/* 카드가 들어갈 곳 */}
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
              </CCard>

              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    Done
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

                {/* 카드가 들어갈 곳 */}
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
              </CCard>

              <CCard style={{ width: '300px' }} className="bg-light py-3 me-2 container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    Done
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

                {/* 카드가 들어갈 곳 */}
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
                <KanbanItem />
              </CCard>

              <CCard style={{ width: '300px' }} className="">
                <CCardHeader>
                  <CIcon
                    icon={icon.cilPlus}
                    onClick={() => {
                      alert('플러스 클릭')
                    }}
                  />
                </CCardHeader>
              </CCard>
            </CRow>
          </CCardBody>
        </HorizontalScroll>
      </CCard>
    </>
  )
}

export default Kanban

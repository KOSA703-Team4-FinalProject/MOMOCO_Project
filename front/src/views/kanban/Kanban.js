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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import * as icon from '@coreui/icons'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import KanbanItem from '../../components/KanbanItem'
import { useEffect, useRef } from 'react'

const Kanban = () => {
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
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCard className="col-md-3 bg-light">
              <CCard className="container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    <CCardHeader>To-Do</CCardHeader>
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
              </CCard>

              <CCardFooter
                onClick={() => {
                  alert('클릭1')
                }}
              >
                + Add Item
              </CCardFooter>
            </CCard>

            <CCard className="col-md-3 bg-light ">
              <CCard className="container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    <CCardHeader>In Progress</CCardHeader>
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

              <CCardFooter
                onClick={() => {
                  alert('클릭2')
                }}
              >
                + Add Item
              </CCardFooter>
            </CCard>

            <CCard className="col-md-3 bg-light">
              <CCard className="container1">
                <CRow>
                  <CCol xs="auto" className="me-auto">
                    <CCardHeader>Done</CCardHeader>
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
              </CCard>

              <CCardFooter
                onClick={() => {
                  alert('클릭3')
                }}
              >
                + Add Item
              </CCardFooter>
            </CCard>
            <CCard className="col-md-3">
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
      </CCard>
    </>
  )
}

export default Kanban

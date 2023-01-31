import { cilCommentSquare, cilLibraryAdd, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CDropdown, CDropdownMenu, CDropdownToggle, CFormInput, CRow } from '@coreui/react'
import { useSelector } from 'react-redux'

import '../scss/chatRoom.scss'

const ChatRoom = () => {

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon
          icon={cilCommentSquare}
          size="lg"
          onClick={() => {
            dispatch(changechatView())
          }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <aside>
          <header className="row px-4">
            <input className="createRoominput col-md-8 p-4" placeholder="채팅방 만들기"></input>
            <button className="col-md-4">
              <h4>
                <CIcon icon={cilLibraryAdd} size="xl" />
              </h4>
            </button>
          </header>
          <ul className="roomlist">
            <li>
              <CRow className="px-5">
                <CCol xs="auto" className="enterroombtn me-auto">
                  <h2>기본 채팅방</h2>
                </CCol>
                <CCol xs="auto" className="deleteroombtn">
                  <h2>
                    <CIcon icon={cilTrash} size="xl" />
                  </h2>
                </CCol>
              </CRow>
            </li>
            <li>
              <CRow className="px-5">
                <CCol xs="auto" className="enterroombtn me-auto">
                  <h2>만들어진 채팅방</h2>
                </CCol>
                <CCol xs="auto" className="deleteroombtn">
                  <h2>
                    <CIcon icon={cilTrash} size="xl" />
                  </h2>
                </CCol>
              </CRow>
            </li>
          </ul>
        </aside>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default ChatRoom

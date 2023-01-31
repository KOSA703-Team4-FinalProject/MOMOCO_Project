import { cilLibraryAdd, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCol, CModal, CModalBody, CModalHeader, CModalTitle, CRow } from '@coreui/react'
import $ from 'jquery';

import '../scss/chatRoom.scss'

const ChatRoom = () => {

  //채팅방 생성 버튼 클릭
  $(document).on("click", ".createRoombtn", function(){
    $(".createRoominput").val("");
  })

  return (
    <div>
      <aside>
        <header className="row px-4">
          <input className="createRoominput col-md-8 p-4" placeholder="채팅방 만들기"></input>
          <button className="createRoombtn col-md-4">
            <h4>
              <CIcon icon={cilLibraryAdd} size="xl" />
            </h4>
          </button>
        </header> 
        <ul className="roomlist">
          <li>
            <CRow className="px-5 pt-3">
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
            <CRow className="px-5 pt-3">
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
    </div>
  )
}

export default ChatRoom

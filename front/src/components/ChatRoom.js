import { cilLibraryAdd, cilTrash } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CCol, CFormInput, CRow } from "@coreui/react"

import '../scss/chatRoom.scss'

const ChatRoom = () => {

    return (
        <div className="container">
            <aside>
                <header className="row">
                    <input className="createRoominput col-8" placeholder="채팅방 만들기"></input>
                    <button className="col-4"><h4><CIcon icon={cilLibraryAdd} size="xl"/></h4></button>
                </header>
                <ul className="roomlist">
                    <li>
                        <CRow className="px-4">
                            <CCol xs="auto" className="enterroombtn me-auto">
                                <h2>기본 채팅방</h2>
                            </CCol>
                            <CCol xs="auto" className="deleteroombtn">
                                <h2><CIcon icon={cilTrash} size="xl" /></h2>
                            </CCol>
                        </CRow>
                    </li>
                    <li>
                        <CRow className="px-4">
                            <CCol xs="auto" className="enterroombtn me-auto">
                                <h2>만들어진 채팅방</h2>
                            </CCol>
                            <CCol xs="auto" className="deleteroombtn">
                                <h2><CIcon icon={cilTrash} size="xl" /></h2>
                            </CCol>
                        </CRow>
                    </li>
                </ul>
            </aside>
        </div>
    )
}

export default ChatRoom
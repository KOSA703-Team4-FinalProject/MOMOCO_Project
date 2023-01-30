
import { cilNotes } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../scss/chatRoom.scss'

const Chat = () => {

    return (
        <main>
            <header>
                <div className='row'>
                    <div className='col-8'>
                        <h2 className='chat-room'>기본 채팅방</h2>
                        <h3 className='chat-no'>123 messages</h3>
                    </div>
                    <div className='exitbtn col-2'>
                        <h2 id="exittext"><CIcon icon={cilNotes} size="xl" /></h2>
                    </div>
                </div>
            </header>
            <ul className='chat'>
                <li className='you'>
                    <div className='entete'>
                        <span className="status green"></span>
                        <h2>Vincent</h2>
					    <h3>10:12AM, Today</h3>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                    </div>
                </li>
                <li className='me'>
                    <div className="entete">
                        <h3>10:12AM, Today</h3>
                        <h2>Vincent</h2>
                        <span className="status blue"></span>
                    </div>
                    <div className="triangle"></div>
                    <div className="message">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                    </div>
                </li>
            </ul>
            <footer>
                <textarea placeholder='Type your message'></textarea>
                <a href="#">Send</a>
            </footer>
        </main>
    )
}

export default Chat
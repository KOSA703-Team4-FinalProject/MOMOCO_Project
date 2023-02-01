import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import ChatRoom from './ChatRoom'
import { useSelector } from 'react-redux'
import Chat from './Chat'
import TalkDrawer from './TalkDrawer'
import TalkDrawerDetail from './TalkDrawerDetail'
import Profile from './Profile'

const AppContent = () => {

  let room = useSelector((state) => state.roomView)
  let chat = useSelector((state) => state.chatView)
  let drawer = useSelector((state) => state.talkDrawer)
  let drawerDetail = useSelector((state) => state.drawerDetailType)
  let user = useSelector((state) => state.userProfile)

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
      {room && <ChatRoom />}
      {chat && <Chat />}
      {drawer && <TalkDrawer />}
      {drawerDetail.view && <TalkDrawerDetail />}
      {user && <Profile />}
    </CContainer>
  )
}

export default React.memo(AppContent)

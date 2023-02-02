import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/login/Login')) // 로그인
const Register = React.lazy(() => import('./views/register/Register')) // 회원가입
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const WorkSpace = React.lazy(() => import('./views/workSpace/workSpace')) // 워크 스페이스

class App extends Component {
  render() {
    return (
      <>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/gitlogin" name="Login Page" element={<Login />} />
            <Route exact path="/workSpace" name="workSpace Page" element={<WorkSpace />} />
            <Route exact path="/gitregister" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
      </>
    )
  }
}

export default App

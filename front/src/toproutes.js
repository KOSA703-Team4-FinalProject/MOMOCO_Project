import React from 'react'

// Pages
const Login = React.lazy(() => import('./views/login/Login')) // 로그인
const WorkSpace = React.lazy(() => import('./views/workSpace/workSpace')) // 워크 스페이스
const WorkSpaceList = React.lazy(() => import('./views/workSpace/workSpaceList')) // 회원가입
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Callback = React.lazy(() => import('./views/login/Callback')) //github 로그인 callback 페이지
const Profile = React.lazy(() => import('./views/login/Profile'))
const AboutUs = React.lazy(() => import('./views/login/AboutUs'))

const toproutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/gitlogin', name: 'Login', exact: true, element: Login },
  { path: '/workSpace', name: 'WorkSpace', exact: true, element: WorkSpace },
  { path: '/workSpaceList', name: 'WorkSpaceList', exact: true, element: WorkSpaceList },
  { path: '/oauth/callback', name: 'Callback', exact: true, element: Callback }, //로그인 callback
  { path: '/profile', name: 'Profile', exact: true, element: Profile }, //토큰을 서버로 보낼곳
  { path: '/aboutus', name: 'AboutUs', exact: true, element: AboutUs }, //소개 페이지
]

export default toproutes

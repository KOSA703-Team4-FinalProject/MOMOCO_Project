import React from 'react'

// Pages
const Login = React.lazy(() => import('./views/login/Login')) // 로그인
const WorkSpace = React.lazy(() => import('./views/workSpace/workSpace')) // 워크 스페이스
const WorkSpaceList = React.lazy(() => import('./views/workSpace/workSpaceList')) // 회원가입
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const toproutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/gitlogin', name: 'Login', exact: true, element: Login },
  { path: '/workSpace', name: 'WorkSpace', exact: true, element: WorkSpace },
  { path: '/workSpaceList', name: 'WorkSpaceList', exact: true, element: WorkSpaceList },
]

export default toproutes

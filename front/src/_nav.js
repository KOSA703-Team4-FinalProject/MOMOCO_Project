import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalendar,
  cilChart,
  cilChartPie,
  cilClearAll,
  cilCopy,
  cilListRich,
  cilScrubber,
  cilTask,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { CiViewTimeline } from 'react-icons/ci'

const _nav = [
  {
    component: CNavItem,
    name: '전체보기',
    to: '/allboardlist',
    icon: <CIcon icon={cilClearAll} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '일정 관리',
  },
  {
    component: CNavItem,
    name: '캘린더',
    to: '/calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: '칸반보드',
    to: '/kanban',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '문서 관리',
  },
  {
    component: CNavItem,
    name: '문서 저장소',
    to: '/docStorage',
    icon: <CIcon icon={cilCopy} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '차트',
  },
  {
    component: CNavItem,
    name: 'Git 차트',
    to: '/gitchart',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Commit 로그',
    to: '/gittimeline',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'GitHub Issue',
    to: '/IssueTimeLine',
    icon: <CIcon icon={cilScrubber} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: '게시판',
  },
  {
    component: CNavItem,
    name: '자유 게시판',
    to: '/boardlist',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav

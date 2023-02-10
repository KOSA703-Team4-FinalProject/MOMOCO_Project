import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarcode,
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChart,
  cilChartPie,
  cilCopy,
  cilCursor,
  cilDescription,
  cilDrop,
  cilListRich,
  cilNotes,
  cilPencil,
  cilPin,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilTask,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { CiViewTimeline } from "react-icons/ci";

const _nav = [
  {
    component: CNavItem,
    name: '전체보기',
    to: '/boardlist',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
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
    name: 'Git 타임라인',
    to: '/gitchart',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Git 차트',
    to: '/gittimeline',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
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

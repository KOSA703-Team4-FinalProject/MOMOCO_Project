import React from 'react'

import {
  CAvatar,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsF,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'

import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cibGithub,
  cilChartPie,
} from '@coreui/icons'
import { useParams } from 'react-router-dom'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Link, Route, Routes } from 'react-router-dom'
import { Icon } from '@mui/material'
import { AiFillGithub } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'
import momoco1 from '../../assets/images/momocologo.png'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const login = JSON.parse(localStorage.getItem('login'))

  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]

  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader className="pt-3 my-auto">
          <h5>
            <BsGithub size={25} />
            <strong> 깃허브</strong>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <BsGithub size={20} />
                    <strong> momoco(ws) 커밋 이력</strong>
                  </h6>
                </CCardHeader>
                <CCardBody>
                  <CCol xs="auto" className="me-auto">
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          Merge remote-tracking branch 'origin/JM'...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 모모코 탈퇴 만드는 중...</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 자유게시판 ....</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          230224 8시 46분 칸반 아이템 추가 오류...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 멤버 초대</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <BsGithub size={20} />
                    <strong> 미해결 issue List</strong>
                  </h6>
                </CCardHeader>
                <CCardBody>
                  <CCol xs="auto" className="me-auto">
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          Merge remote-tracking branch 'origin/JM'...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 모모코 탈퇴 만드는 중...</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 자유게시판 ....</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          230224 8시 46분 칸반 아이템 추가 오류...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 멤버 초대</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader className="pt-3 my-auto">
          <h5>
            <img src={momoco1} width="25px" />
            <strong> momoco 게시판</strong>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <img src={momoco1} width="20px" />
                    <strong> 새로운 전체 글 목록</strong>
                  </h6>
                </CCardHeader>
                <CCardBody>
                  <CCol xs="auto" className="me-auto">
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          <CBadge color="light" textColor="black">
                            자유
                          </CBadge>{' '}
                          Merge remote-tracking branch ...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          <CBadge color="success">문서</CBadge> 테스트.............
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          <CBadge color="info">일정</CBadge> 자유게시판 ....
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          <CBadge color="danger">칸반</CBadge> 230224 8시 46분 칸반추가 오류...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          <CBadge color="light" textColor="black">
                            자유{' '}
                          </CBadge>
                          멤버 초대
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol>
              <CCard>
                <CCardHeader className="py-2 my-auto">
                  <h6>
                    <img src={momoco1} width="20px" />
                    <strong> 확인 안한 글</strong>
                  </h6>
                </CCardHeader>
                <CCardBody>
                  <CCol xs="auto" className="me-auto">
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          Merge remote-tracking branch 'origin/JM'...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 모모코 탈퇴 만드는 중...</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 자유게시판 ....</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto">
                          {' '}
                          230224 8시 46분 칸반 아이템 추가 오류...
                        </CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                    <CCard className="px-2 py-1">
                      <CRow>
                        <CCol className="col-md-1 my-auto">
                          <CAvatar src={login.profilephoto} />
                        </CCol>
                        <CCol className="col-md-9 my-auto"> 멤버 초대</CCol>
                        <CCol className="col-md-2 my-auto">09/12</CCol>
                      </CRow>
                    </CCard>
                  </CCol>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic {' & '} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-medium-emphasis small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Recurring Clients</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}
                          {'asd '}
                          <span className="text-medium-emphasis small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard

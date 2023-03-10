import React from 'react'

import Viewchat from './views/viewchat/Viewchat'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))
const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

//calendar
const Calendar = React.lazy(() => import('./views/calendar/Calendar'))
//commboard?????????
//boardlist
const Boardlist = React.lazy(() => import('./views/board/Boardlist'))
//boardcontent
const Boardcontent = React.lazy(() => import('./views/board/Boardcontent'))
//boardwrite
const Boardwrite = React.lazy(() => import('./views/board/Boardwrite'))
//boardedit
const Boardedit = React.lazy(() => import('./views/board/Boardedit'))
//????????? ????????????
const AllBoardList = React.lazy(() => import('./views/board/AllBoardList'))
//?????? ??????
const Comments = React.lazy(() => import('./components/Comments'))

//???????????????
const Mypage = React.lazy(() => import('./views/mypage/Mypage'))
//??? ????????????
const Gittimeline = React.lazy(() => import('./views/git/Gittimeline'))
//?????? ????????????
const IssueTimeLine = React.lazy(() => import('./views/git/IssueList'))
const Gittime = React.lazy(() => import('./views/git/Gittime'))
//?????????
const Gitchart = React.lazy(() => import('./views/git/Gitchart'))
//????????????
const videochat = React.lazy(() => import('./views/viewchat/Viewchat'))
// kanban ??????
const Kanban = React.lazy(() => import('./views/kanban/Kanban'))
const KanbanDetail = React.lazy(() => import('./views/kanban/KanbanDetail.js'))
// unregister
const UnRegisterCheck = React.lazy(() => import('./views/register/UnRegisterCheck')) // ????????????
//?????? ?????????
const docStorage = React.lazy(() => import('./views/docStorage/docStorage'))
//???????????? ????????????
const Projectmain = React.lazy(() => import('./views/project/Projectmain'))
//???????????? ???????????????
const Projectcontent = React.lazy(() => import('./views/project/Projectcontent'))
const ReplyBoardWrite = React.lazy(() => import('./views/board/replyBoardWrite')) //commonboard ??????

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/calendar', name: 'calendar', exact: true, element: Calendar },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/boardlist', name: 'boardlist', exact: true, element: Boardlist }, //CommonBoard????????? ??????
  { path: '/boardcontent/:idx', name: 'Boardcontent', exact: true, element: Boardcontent }, //CommonBoard????????? ?????? ??????
  { path: '/boardwrite', name: 'Boardwrite', exact: true, element: Boardwrite },
  {
    path: '/replyboardwrite/:b_idx/:ref/:step/:depth',
    name: 'Boardwrite',
    exact: true,
    element: ReplyBoardWrite,
  }, // commonboard????????????
  { path: '/boardedit/:idx', name: 'Boardedit', exact: true, element: Boardedit },
  { path: '/mypage', name: 'Mypage', exact: true, element: Mypage },
  { path: '/viewchat', name: 'Viewchat', exact: true, element: Viewchat },
  { path: '/gittimeline', name: 'Gittimeline', exact: true, element: Gittimeline }, //???????????????
  { path: '/gitchart', name: 'GitChart', exact: true, element: Gitchart }, //?????????
  { path: '/gittime', name: 'Gittime', exact: true, element: Gittime }, //?????????????????????
  { path: '/kanban', name: 'Kanban', element: Kanban }, // ????????????
  { path: '/unregistercheck', name: 'UnRegisterCheck', element: UnRegisterCheck }, // ???????????? ??????
  { path: '/docStorage', name: 'docStorage', element: docStorage }, // ???????????????
  { path: '/docStorage/:idx', name: 'docStorage', element: docStorage }, // ??????????????? ?????????
  { path: '/kanbandetail', name: 'KanbanDetail', element: KanbanDetail }, // ?????? ????????? ????????????
  { path: '/projectmain', name: 'ProjectManagement', exact: true, element: Projectmain }, //?????????????????? ??????
  { path: '/projectcontent', name: 'ProjectContent', exact: true, element: Projectcontent }, //?????????????????? ??????
  { path: '/comments', name: 'Comments', exact: true, element: Comments }, //??????????????????
  { path: '/allboardlist', name: 'allboardlist', exact: true, element: AllBoardList }, //?????????????????????
  { path: '/IssueTimeLine', name: 'IssueTimeLine', exact: true, element: IssueTimeLine }, //?????? ?????? ??????
]

export default routes

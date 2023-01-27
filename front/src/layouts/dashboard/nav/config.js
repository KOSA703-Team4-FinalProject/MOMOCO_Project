// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/Project/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'all board',
    path: '/Project/allboard',
    icon: icon('ic_user'),
  },
  {
    title: 'kanban',
    path: '/Project/kanban',
    icon: icon('ic_cart'),
  },
  {
    title: 'cal',
    path: '/Project/cal',
    icon: icon('ic_blog'),
  },
  {
    title: 'document',
    path: '/Project/document',
    icon: icon('ic_blog'),
  },
  {
    title: 'gitchart',
    path: '/Project/gitchart',
    icon: icon('ic_blog'),
  },
  {
    title: 'board',
    path: '/Project/board',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;

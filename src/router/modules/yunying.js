import Layout from '@/layout'

const router = {
  path: '/yunying',
  component: Layout,
  name: '运营管理',
  meta: { title: '运营管理',  affix: true, roles: ['yunying_manager'] },
  children: [{
    path: 'banner',
    name: 'banner',
    component: () =>
        import ('@/views/banner/banner'),
    meta: { title: 'banner管理',  affix: true, roles: ['banner_manager'], activeMenu: '/yunying/banner' },
    children: []
  },
  {
    path: 'jubao',
    name: '举报管理',
    component: () =>
        import ('@/views/banner/jubao'),
    meta: { title: '举报管理', affix: true, roles: ['jubao_manager'], activeMenu: '/yunying/jubao' },
    children: []
  },
  {
    path: 'feedback',
    name: '用户反馈',
    component: () =>
        import ('@/views/banner/feedback'),
    meta: { title: '用户反馈', affix: true, roles: ['feedback_manager'], activeMenu: '/yunying/feedback' },
    children: []
  }

  ]
}

export default router

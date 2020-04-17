import Layout from '@/layout'

const router = {
  path: '/yunying',
  component: Layout,
  name: '运营管理',
  meta: { title: '运营管理', icon: 'code_block', affix: true, roles: ['oauth_manager'] },
  children: [{
    path: 'banner',
    name: 'banner',
    component: () =>
        import ('@/views/banner/banner'),
    meta: { title: 'banner管理', icon: 'code_block', affix: true, roles: ['menu_manager'], activeMenu: '/yunying/banner' },
    children: []
  },
  {
    path: 'jubao',
    name: '举报管理',
    component: () =>
        import ('@/views/banner/jubao'),
    meta: { title: '举报管理', icon: 'code_block', affix: true, roles: ['menu_manager'], activeMenu: '/yunying/jubao' },
    children: []
  },
  {
    path: 'feedback',
    name: '用户反馈',
    component: () =>
        import ('@/views/banner/feedback'),
    meta: { title: '用户反馈', icon: 'code_block', affix: true, roles: ['menu_manager'], activeMenu: '/yunying/feedback' },
    children: []
  }

  ]
}

export default router

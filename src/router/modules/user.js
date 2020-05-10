import Layout from '@/layout'

const router = {
  path: '/user',
  component: Layout,
  name: '用户管理',
  meta: { title: '用户管理',  affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'user',
      name: '客户端用户管理',
      component: () =>
                import('@/views/user/user'),
      meta: { title: '客户端用户管理',  affix: true, roles: ['menu_manager'], activeMenu: '/user/user' }

    }

  ]
}

export default router

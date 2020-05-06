import Layout from '@/layout'

const router = {
  path: '/user',
  component: Layout,
  name: '用户管理',
  meta: { title: '用户管理', icon: 'account', affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'user',
      name: '用户管理',
      component: () =>
                import('@/views/user/user'),
      meta: { title: '客户端用户管理', icon: 'account', affix: true, roles: ['account_manager'], activeMenu: '/user' }

    }

  ]
}

export default router

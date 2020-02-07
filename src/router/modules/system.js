/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/system',
  component: Layout,
  name: '系统管理',
  meta: { title: '系统管理', icon: 'system', affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'account',
      name: '账号管理',
      component: () => import('@/views/system/account/index'),
      meta: { title: '账号管理', icon: 'account', affix: true, roles: ['account_manager'], activeMenu: '/system/account' },
      children: []
    },
    {
      path: 'role',
      name: '角色管理',
      component: () => import('@/views/system/role/index'),
      meta: { title: '角色管理', icon: 'role', affix: true, roles: ['role_manager'], activeMenu: '/system/role' },
      children: []
    }
  ]
}

export default router

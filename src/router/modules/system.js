/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/system',
  component: Layout,
  name: '系统管理',
  meta: { title: '系统管理',  affix: true, roles: ['system_manager'] },
  children: [
    {
      path: 'account',
      name: '账号管理',
      component: () => import('@/views/system/account/index'),
      meta: { title: '账号管理',  affix: true, roles: ['account_manager'], activeMenu: '/system/account' },
      children: []
    },
    {
      path: 'role',
      name: '角色管理',
      component: () => import('@/views/system/role/index'),
      meta: { title: '角色管理', affix: true, roles: ['role_manager'], activeMenu: '/system/role' },
      children: []
    }
    // {
    //   path: 'menu',
    //   name: '菜单管理',
    //   component: () => import('@/views/system/menu/index'),
    //   meta: { title: '菜单管理',  affix: true, roles: ['menu_manager'], activeMenu: '/system/menu' },
    //   children: []
    // }
  ]
}

export default router

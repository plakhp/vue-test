/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const router = {
  path: '/user',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      name: '用户管理',
      meta: { title: '用户管理', icon: 'user', affix: true, roles: ['user_manager'] }
    },
    {
      path: 'add',
      component: () => import('@/views/user/components/View'),
      name: '新增用户',
      meta: { title: '新增用户', icon: 'user', affix: true, roles: ['user_manager_add'] },
      hidden: true
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/user/components/View'),
      name: '编辑用户',
      meta: { title: '编辑用户', icon: 'user', affix: true, roles: ['user_manager_modify'] },
      hidden: true
    }
  ]
}

export default router

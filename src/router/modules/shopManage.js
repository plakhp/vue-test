import Layout from '@/layout'

const router = {
  path: '/shopManage',
  component: Layout,
  name: '商户管理',
  meta: { title: '商户管理', icon: 'chart', affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'joinExamine',
      name: '入驻审核',
      component: () =>
        import ('@/views/shopManage/joinExamine'),
      meta: { title: '入驻审核', icon: 'chart', affix: true, roles: ['menu_manager'], activeMenu: '/shopManage/joinExamine' },
      children: []
    }

  ]
}

export default router

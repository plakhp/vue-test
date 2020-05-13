import Layout from '@/layout'

const router = {
  path: '/shopManage',
  component: Layout,
  name: '商户管理',
  meta: { title: '商户管理',  affix: true, roles: ['shopmanage_manager'] },
  children: [
    {
      path: 'joinExamine',
      name: '入驻审核',
      component: () =>
        import ('@/views/shopManage/joinExamine'),
      meta: { title: '入驻审核',  affix: true, roles: ['examin_manager'], activeMenu: '/shopManage/joinExamine' },
      children: []
    }

  ]
}

export default router

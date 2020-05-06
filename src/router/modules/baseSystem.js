import Layout from '@/layout'

const router = {
  path: '/baseSystem',
  component: Layout,
  name: '基础设置',
  meta: { title: '基础设置', icon: 'system', affix: true, roles: ['menu_manager'] },
  children: [{
    path: 'shop_class',
    name: '商户分类',
    component: () =>
        import ('@/views/baseSystem/shop_class'),
    meta: { title: '商户分类', icon: 'system', affix: true, roles: ['menu_manager'], activeMenu: '/baseSystem/shop_class' },
    children: []
  },
  {
    path: 'word',
    name: '热门关键词设置',
    component: () =>
        import ('@/views/baseSystem/word'),
    meta: { title: '热门关键词设置', icon: 'system', affix: true, roles: ['menu_manager'], activeMenu: '/baseSystem/word' },
    children: []
  }

  ]
}

export default router

import Layout from '@/layout'

const router = {
  path: '/goods',
  component: Layout,
  name: '商品管理',
  meta: { title: '商品管理',  affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'goods',
      name: '商品管理',
      component: () =>
                import('@/views/goods/goods'),
      meta: { title: '商品管理',  affix: true, roles: ['menu_manager'], activeMenu: '/goods/goods' }

    },
    {

      path: '/goods/goods_detail',
      name: '查看商品',
      component: () => import('@/views/goods/goods_detail'),
      hidden: true

    }

  ]
}

export default router

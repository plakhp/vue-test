import Layout from '@/layout'

const router = {
  path: '/order',
  component: Layout,
  name: '订单管理',
  meta: { title: '订单管理', icon: 'ordered_list', affix: true, roles: ['oauth_manager'] },
  children: [
    {
      path: 'goodsOrder',
      name: '商品订单',
      component: () =>
        import ('@/views/order/goodsOrder'),
      meta: { title: '商品订单', icon: 'ordered_list', affix: true, roles: ['menu_manager'], activeMenu: '/order/goodsOrder' },
      children: []
    },
    {
      path: 'fundOrder',
      name: '资金订单',
      component: () =>
        import ('@/views/order/fundOrder'),
      meta: { title: '资金订单', icon: 'ordered_list', affix: true, roles: ['menu_manager'], activeMenu: '/order/fundOrder' },
      children: []
    }

  ]
}

export default router

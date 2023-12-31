import Layout from '@/layout'

const router = {
  path: '/trends',
  component: Layout,
  name: '动态管理',
  meta: { title: '动态管理',  affix: true, roles: ['trends_manager'] },
  children: [
    {
      path: 'imgTrends',
      name: '图片动态',
      component: () =>
        import ('@/views/trends/imgTrends'),
      meta: { title: '图片动态',  affix: true, roles: ['imgTrends_manager'], activeMenu: '/trends/imgTrends' },
      children: []
    },
    {
      path: 'videoTrends',
      name: '视频动态',
      component: () =>
        import ('@/views/trends/videoTrends'),
      meta: { title: '视频动态', affix: true, roles: ['videoTrends_manager'], activeMenu: '/trends/videoTrends' },
      children: []
    }

  ]
}

export default router

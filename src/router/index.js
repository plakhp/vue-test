import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import systemRouter from './modules/system' // 系统管理

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    children: [
      {
        path: 'tinymce',
        component: () => import('@/views/demo/tinymce'),
        name: 'TinymceDemo',
        meta: { title: 'Tinymce' }
      },
      {
        path: 'markdown',
        component: () => import('@/views/demo/markdown'),
        name: 'MarkdownDemo',
        meta: { title: 'Markdown' }
      },
      {
        path: 'json-editor',
        component: () => import('@/views/demo/json-editor'),
        name: 'JsonEditorDemo',
        meta: { title: 'Json Editor' }
      },
      {
        path: 'split-pane',
        component: () => import('@/views/demo/split-pane'),
        name: 'SplitpaneDemo',
        meta: { title: 'SplitPane' }
      },
      {
        path: 'avatar-upload',
        component: () => import('@/views/demo/avatar-upload'),
        name: 'AvatarUploadDemo',
        meta: { title: 'Avatar Upload' }
      },
      {
        path: 'dropzone',
        component: () => import('@/views/demo/dropzone'),
        name: 'DropzoneDemo',
        meta: { title: 'Dropzone' }
      },
      {
        path: 'sticky',
        component: () => import('@/views/demo/sticky'),
        name: 'StickyDemo',
        meta: { title: 'Sticky' }
      },
      {
        path: 'count-to',
        component: () => import('@/views/demo/count-to'),
        name: 'CountToDemo',
        meta: { title: 'Count To' }
      },
      {
        path: 'mixin',
        component: () => import('@/views/demo/mixin'),
        name: 'ComponentMixinDemo',
        meta: { title: 'componentMixin' }
      },
      {
        path: 'back-to-top',
        component: () => import('@/views/demo/back-to-top'),
        name: 'BackToTopDemo',
        meta: { title: 'Back To Top' }
      },
      {
        path: 'drag-dialog',
        component: () => import('@/views/demo/drag-dialog'),
        name: 'DragDialogDemo',
        meta: { title: 'Drag Dialog' }
      },
      {
        path: 'drag-select',
        component: () => import('@/views/demo/drag-select'),
        name: 'DragSelectDemo',
        meta: { title: 'Drag Select' }
      },
      {
        path: 'dnd-list',
        component: () => import('@/views/demo/dnd-list'),
        name: 'DndListDemo',
        meta: { title: 'Dnd List' }
      },
      {
        path: 'drag-kanban',
        component: () => import('@/views/demo/drag-kanban'),
        name: 'DragKanbanDemo',
        meta: { title: 'Drag Kanban' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  systemRouter,

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

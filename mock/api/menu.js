'use strict';

/**
 * @Author: charles.yu
 * @Date: 2020/2/7 8:29 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/7 8:29 PM
 * @Desc
 */

export default [
  {
    url: '/admin/menu/treeList',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: [{
          id: 1,
          title: '系统管理',
          menuCode: 'oauth_manager',
          menuType: 'menu',
          orders: 1,
          subMenu: [
            {
              id: 2,
              title: '账号管理',
              menuCode: 'account_manager',
              menuType: 'menu',
              orders: 1,
              subMenu: [
                {
                  id: 3,
                  title: '新增账号',
                  menuCode: 'account_manager_add',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 4,
                  title: '编辑账号',
                  menuCode: 'account_manager_modify',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 5,
                  title: '删除账号',
                  menuCode: 'account_manager_delete',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 6,
                  title: '查询账号',
                  menuCode: 'account_manager_search',
                  menuType: 'button',
                  orders: 1
                }
              ]
            },
            {
              id: 7,
              title: '角色管理',
              menuCode: 'role_manager',
              menuType: 'menu',
              orders: 1,
              subMenu: [
                {
                  id: 8,
                  title: '新增角色',
                  menuCode: 'role_manager_add',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 9,
                  title: '编辑角色',
                  menuCode: 'role_manager_modify',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 10,
                  title: '删除角色',
                  menuCode: 'role_manager_delete',
                  menuType: 'button',
                  orders: 1
                },
                {
                  id: 11,
                  title: '查询角色',
                  menuCode: 'role_manager_search',
                  menuType: 'button',
                  orders: 1
                }
              ]
            }
          ]
        }]
      }
    }
  },

  {
    url: '/admin/menu/insert',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: {
        }
      }
    }
  },

  {
    url: '/admin/menu/\.*',
    type: 'put',
    response: _ => {
      return {
        code: 0,
        data: {
        }
      }
    }
  },

  {
    url: '/admin/menu/\.*',
    type: 'delete',
    response: _ => {
      return {
        code: 0,
        data: {}
      }
    }
  }

]


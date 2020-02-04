'use strict';

/**
 * @Author: charles.yu
 * @Date: 2020/1/29 1:31 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/1/29 1:31 PM
 * @Desc
 */
import Mock from 'mockjs'

const List = []
const count = 2

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'menuIds|1': [1,2,3,4,5],
    'roleName|1': ['管理员', '普通用户'],
    'status|1': [0, 1],
  }))
}

export default [
  {
    url: '/admin/role/select',
    type: 'get',
    response: config => {
      const { name, status, pageNum = 1, pageSize = 20 } = config.query

      let mockList = List.filter(item => {
        if (name && item.roleName.indexOf(name) < 0) return false
        if (status && item.status.indexOf(status) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1))

      return {
        code: 0,
        data: {
          records: pageList,
          total: mockList.length,
          size: parseInt(pageSize),
          pages: mockList.length / pageSize,
          current: parseInt(pageNum)
        }
      }
    }
  },

  {
    url: '/admin/role/roleMap',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: [{
          id: 1,
          roleName: '管理员'
        }, {
          id: 2,
          roleName: '普通员工'
        }]

      }
    }
  },

  {
    url: '/admin/role/insert',
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
    url: '/admin/adminUser/deleteById/\.*',
    type: 'delete',
    response: _ => {
      return {
        code: 0,
        data: {}
      }
    }
  },

  {
    url: '/admin/role/updateById',
    type: 'put',
    response: _ => {
      return {
        code: 0,
        data: {}
      }
    }
  },

  {
    url: '/admin/role/getMenuTree/\.*',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: [{
          title: '系统管理',
          menuCode: 'oauth_manager',
          menuType: 'menu',
          subMenu: [
            {
              title: '账号管理',
              menuCode: 'account_manager',
              menuType: 'menu',
              subMenu: [
                {
                  title: '新增账号',
                  menuCode: 'account_manager_add',
                  menuType: 'button'
                },
                {
                  title: '编辑账号',
                  menuCode: 'account_manager_modify',
                  menuType: 'button'
                },
                {
                  title: '删除账号',
                  menuCode: 'account_manager_delete',
                  menuType: 'button'
                },
                {
                  title: '查询账号',
                  menuCode: 'account_manager_search',
                  menuType: 'button'
                }
              ]
            },
            {
              title: '角色管理',
              menuCode: 'role_manager',
              menuType: 'menu',
              subMenu: [
                {
                  title: '新增角色',
                  menuCode: 'role_manager_add',
                  menuType: 'button'
                },
                {
                  title: '编辑角色',
                  menuCode: 'role_manager_modify',
                  menuType: 'button'
                },
                {
                  title: '删除角色',
                  menuCode: 'role_manager_delete',
                  menuType: 'button'
                },
                {
                  title: '查询角色',
                  menuCode: 'role_manager_search',
                  menuType: 'button'
                }
              ]
            }
          ]
        }]
      }
    }
  },

  {
    url: '/admin/role/getEntireMenuTree',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: [{
          title: '系统管理',
          menuCode: 'oauth_manager',
          menuType: 'menu',
          subMenu: [
            {
              title: '账号管理',
              menuCode: 'account_manager',
              menuType: 'menu',
              subMenu: [
                {
                  title: '新增账号',
                  menuCode: 'account_manager_add',
                  menuType: 'button'
                },
                {
                  title: '编辑账号',
                  menuCode: 'account_manager_modify',
                  menuType: 'button'
                },
                {
                  title: '删除账号',
                  menuCode: 'account_manager_delete',
                  menuType: 'button'
                },
                {
                  title: '查询账号',
                  menuCode: 'account_manager_search',
                  menuType: 'button'
                }
              ]
            },
            {
              title: '角色管理',
              menuCode: 'role_manager',
              menuType: 'menu',
              subMenu: [
                {
                  title: '新增角色',
                  menuCode: 'role_manager_add',
                  menuType: 'button'
                },
                {
                  title: '编辑角色',
                  menuCode: 'role_manager_modify',
                  menuType: 'button'
                },
                {
                  title: '删除角色',
                  menuCode: 'role_manager_delete',
                  menuType: 'button'
                },
                {
                  title: '查询角色',
                  menuCode: 'role_manager_search',
                  menuType: 'button'
                }
              ]
            }
          ]
        }]
      }
    }
  }
]

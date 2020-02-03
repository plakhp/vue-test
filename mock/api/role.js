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
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'menuIds|1': [1,2,3,4,5],
    employee: '@first @last',
    'roleName|1': ['管理员', '普通用户'],
    'status|1': [0, 1],
    display_time: '@datetime',
  }))
}

export default [
  {
    url: '/admin/role/select',
    type: 'get',
    response: config => {
      const { name, pageNum = 1, pageSize = 20 } = config.query

      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
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
    url: '/admin/adminUser/insert',
    type: 'post',
    response: config => {
      console.log(config)
      const { id } = config.query
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
    response: config => {
      console.log(config)
      const { id } = config.query
      return {
        code: 0,
        data: {}
      }
    }
  },

  {
    url: '/admin/adminUser/updateById/\.*',
    type: 'put',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  }
]


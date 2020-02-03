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
    timestamp: +Mock.Random.date('T'),
    'deptId|1': [1,2,3,4,5],
    userName: '@first',
    employee: '@first @last',
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^1[3456789]\d{9}$/,
    'role|1': ['管理员', '普通用户'],
    'status|1': [0, 1],
    display_time: '@datetime',
  }))
}

export default [
  {
    url: '/admin/adminUser/select',
    type: 'get',
    response: config => {
      const { searchKey, pageNum = 1, pageSize = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (searchKey && item.userName.indexOf(searchKey) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

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
    url: '/admin/adminUser/\.*/update',
    type: 'put',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  }
]


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
    'deptId|1': [1,2,3,4,5],
    userName: '@first',
    nickName: '@first @last',
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /^1[3456789]\d{9}$/,
    'roleId|1': [1, 2],
    'roleName|1': ['管理员', '普通用户'],
    'status|1': [-1, 0, 1]
  }))
}

export default [
  {
    url: '/admin/adminUser/select',
    type: 'get',
    response: config => {
      const { userName, employee, phoneNum, pageNum = 1, pageSize = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (userName && item.userName.indexOf(userName) < 0) return false
        if (employee && item.nickName.indexOf(employee) < 0) return false
        if (phoneNum && item.phone.indexOf(phoneNum) < 0) return false
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
    url: '/admin/adminUser/\.*/update',
    type: 'put',
    response: _ => {
      return {
        code: 0,
        data: {}
      }
    }
  },

  {
    url: '/admin/adminUser/resetPassword',
    type: 'put',
    response: _ => {
      return {
        code: 0,
        data: {}
      }
    }
  },

  {
    url: '/admin/adminUser/\.*/frozen-on-off',
    type: 'patch',
    response: config => {
     
      List.map(item => {
        return item
      })
      return {
        code: 0,
        data: {}
      }
    }
  }
]


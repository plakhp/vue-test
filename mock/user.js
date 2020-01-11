const tokens = {
  admin: {
    token: 'admin-token'
  },
  customer: {
    token: 'customer-token'
  }
}

const users = {
  'admin-token': {
    id: 1,
    roleId: 1,
    email: '399252280@qq.com',
    phone: '18550402280',
    remark: '系统管理员',
    nickName: '系统管理员',
    roleName: '系统总管理员',
    userName: 'admin',
    status: 1,
    userMenus: [{
      id: 12,
      menuCode: 'user_manager',
      parentId: 0,
      menuType: 'menu',
      level: 1,
      orders: 1,
      dropDown: 1,
      subMenu: [
        {
          id: 13,
          menuCode: 'user_manager_add',
          parentId: 12,
          menuType: 'button',
          level: 2,
          orders: 1,
          icon: null,
          dropDown: null,
          subMenu: []
        },
        {
          id: 14,
          menuCode: 'user_manager_modify',
          parentId: 12,
          menuType: 'button',
          level: 2,
          orders: 1,
          icon: null,
          dropDown: null,
          subMenu: []
        }
      ]
    }],
    role: {
      remark: '系统总管理员拥有全部权限',
      menuIds: '12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,31,32,33,1,2,3,4,5,6,7,8,9,10,11',
      roleName: '系统总管理员',
      leafMenuIds: '12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,31,32,33,1,2,3,4,5,6,7,8,9,10,11',
      status: 0,
      id: 1
    },
    token: 'admin-token'
  },
  'customer-token': {}
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账户名或密码错误'
        }
      }

      return {
        code: 200,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，没获取到用户信息'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200,
        data: 'success'
      }
    }
  }
]

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
      title: '系统管理',
      menuCode: 'system_manager',
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
              menuType: 'button',
            },
            {
              title: '编辑账号',
              menuCode: 'account_manager_modify',
              menuType: 'button',
            },
            {
              title: '删除账号',
              menuCode: 'account_manager_delete',
              menuType: 'button',
            },
            {
              title: '查询账号',
              menuCode: 'account_manager_search',
              menuType: 'button',
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
              menuType: 'button',
            },
            {
              title: '编辑角色',
              menuCode: 'role_manager_modify',
              menuType: 'button',
            },
            {
              title: '删除角色',
              menuCode: 'role_manager_delete',
              menuType: 'button',
            },
            {
              title: '查询角色',
              menuCode: 'role_manager_search',
              menuType: 'button'
            }
          ]
        }
      ]
    }],
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

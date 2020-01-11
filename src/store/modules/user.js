import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  roles: [],
  roleButtons: []
}

function genRoles(menus) {
  const roles = []
  menus.map(menu => {
    if (menu.menuCode) {
      roles.push(menu.menuCode)
    }
    if (menu.subMenu && menu.subMenu.length > 0) {
      genRoles(menu.subMenu).map(role => {
        roles.push(role)
      })
    }
  })
  return roles
}

function genRoleButtons(menus) {
  const buttons = []
  menus.map(menu => {
    if (menu.menuType === 'button') {
      buttons.push(menu.menuCode)
    }
    if (menu.subMenu && menu.subMenu.length > 0) {
      genRoleButtons(menu.subMenu)
    }
  })
  return buttons
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ROLE_BUTTONS: (state, roleButtons) => {
    state.roleButtons = roleButtons
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // Change the right API
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // Change the right API
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { userMenus, nickName, avatar } = data

        // roles must be a non-empty array
        if (!userMenus || userMenus.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        console.log('menus', userMenus)
        const roles = genRoles(userMenus)
        console.log('roles: ', roles)
        const roleButtons = genRoleButtons(userMenus)

        commit('SET_ROLES', roles)
        commit('SET_ROLE_BUTTONS', roleButtons)
        commit('SET_NAME', nickName)
        commit('SET_AVATAR', avatar)
        resolve({ roles })
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

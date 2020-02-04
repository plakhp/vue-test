'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/1/29 1:59 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/1/29 1:59 PM
 * @Desc
 */
import { list, dropdown, add, del, edit, getMenusById, getAllMenus } from '@/api/role'

const state = {}

const mutations = {}

const actions = {
  list({ commit }, data) {
    return new Promise((resolve, reject) => {
      list(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  dropdown({ commit }) {
    return new Promise((resolve, reject) => {
      dropdown().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  add({ commit }, data) {
    return new Promise((resolve, reject) => {
      add(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  del({ commit }, data) {
    return new Promise((resolve, reject) => {
      del(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  edit({ commit }, data) {
    return new Promise((resolve, reject) => {
      edit(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getMenusById({ commit }, data) {
    return new Promise((resolve, reject) => {
      getMenusById(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getAllMenus({ commit }) {
    return new Promise((resolve, reject) => {
      getAllMenus().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

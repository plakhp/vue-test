'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/1/29 1:59 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/1/29 1:59 PM
 * @Desc
 */
import { list, add, del, edit } from '@/api/menu'

const state = {}

const mutations = {}

const actions = {
  list({ commit }) {
    return new Promise((resolve, reject) => {
      list().then(response => {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/2/13 11:22 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/13 11:22 PM
 * @Desc
 */
import { upload } from '@/api/common'

const state = {}

const mutations = {}

const actions = {
  upload({ commit }, data) {
    return new Promise((resolve, reject) => {
      upload(data).then(response => {
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

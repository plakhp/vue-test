'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/2/4 11:47 AM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/4 11:47 AM
 * @Desc
 */
import request from '@/utils/request'

const server = process.env.VUE_APP_SERVER_OAUTH

export function list() {
  return request({
    url: `/${server}/menu/treeList`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: `/${server}/menu/insert`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/${server}/menu/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/${server}/menu/${data.id}`,
    method: 'put',
    data
  })
}

'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/1/29 1:55 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/1/29 1:55 PM
 * @Desc
 */
import request from '@/utils/request'

const server = process.env.VUE_APP_SERVER_ADMIN

export function list(data) {
  return request({
    url: `/${server}/adminUser/select`,
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: `/${server}/adminUser/insert`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/${server}/adminUser/deleteById/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/${server}/adminUser/${data.id}/update`,
    method: 'put',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: `/${server}/adminUser/resetPassword`,
    method: 'put',
    data
  })
}

export function editStatus(id) {
  return request({
    url: `/${server}/adminUser/${id}/frozen-on-off`,
    method: 'patch'
  })
}


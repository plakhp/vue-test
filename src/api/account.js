'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/1/29 1:55 PM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/1/29 1:55 PM
 * @Desc
 */
import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/admin/adminUser/select',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: `/admin/adminUser/insert`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/admin/adminUser/deleteById/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/admin/adminUser/${data.id}/update`,
    method: 'put',
    data
  })
}

export function detail(id) {
  return request({
    url: `/accounts/${id}`,
    method: 'get'
  })
}

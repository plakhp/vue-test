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
    url: '/accounts',
    method: 'get',
    params: data
  })
}

export function add(data) {
  return request({
    url: `/accounts/`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/accounts/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/accounts/${data.id}`,
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

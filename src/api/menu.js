'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/2/4 11:47 AM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/4 11:47 AM
 * @Desc
 */
import request from '@/utils/request'

export function list() {
  return request({
    url: '/admin/menu/treeList',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: `/admin/menu/insert`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/admin/menu/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/admin/menu/${data.id}`,
    method: 'put',
    data
  })
}

'use strict'

/**
 * @Author: charles.yu
 * @Date: 2020/2/4 11:47 AM
 * @Last Modified by: charles.yu
 * @Last Modified time: 2020/2/4 11:47 AM
 * @Desc
 */
import request from '@/utils/request'

const server = process.env.VUE_APP_SERVER_ADMIN

export function list(data) {
  return request({
    url: `/${server}/role/select`,
    method: 'get',
    params: data
  })
}

export function dropdown() {
  return request({
    url: `/${server}/role/roleMap`,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: `/${server}/role/insert`,
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: `/${server}/role/deleteById/${id}`,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: `/${server}/role/updateById`,
    method: 'put',
    data
  })
}

export function getMenusById(id) {
  return request({
    url: `/${server}/role/getMenuTree/${id}`,
    method: 'get'
  })
}

export function getAllMenus() {
  return request({
    url: `/${server}/role/getEntireMenuTree`,
    method: 'get'
  })
}


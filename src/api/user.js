import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin-auth/oauth/admin/login',
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin-auth/admin/userInfo',
    method: 'get',
    params: { token }
  })
}

export function editPassword(data) {
  return request({
    url: '/admin/adminUser/changePassword',
    method: 'put',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

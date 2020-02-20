import request from '@/utils/request'

const authServer = process.env.VUE_APP_SERVER_OAUTH
const adminServer = process.env.VUE_APP_SERVER_ADMIN

export function login(data) {
  return request({
    url: `/${authServer}/oauth/admin/login`,
    method: 'get',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: `/${authServer}/admin/userInfo`,
    method: 'get',
    params: { token }
  })
}

export function editPassword(data) {
  return request({
    url: `/${adminServer}/adminUser/changePassword`,
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

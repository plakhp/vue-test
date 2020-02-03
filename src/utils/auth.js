import Cookies from 'js-cookie'

const TokenKey = 'Ipzoe-Admin-Token'
const TenantId = 'Tenant-Id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTenantId() {
  return Cookies.get(TenantId)
}

export function setTenantId(tenantId) {
  return Cookies.set(TenantId, tenantId)
}

export function removeTenantId() {
  return Cookies.remove(TenantId)
}


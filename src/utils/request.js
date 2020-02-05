import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, getTenantId } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})

service.postJson = (params) => service({
  url: params.url,
  method: 'get',
  data: params.data,
  headers: { 'Content-Type': 'application/json' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // 启用时，修改为正确的app_id
    config.headers['AppId'] = store.state.app.appId

    if (store.getters.token) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }

    // 多租户
    if (getTenantId()) {
      config.headers['TenantId'] = getTenantId()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200 or 0, it is judged as an error.
    if (res.code !== 0) {
      // Notification.error({
      //   title: '数据异常',
      //   message: res.msg
      // })
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 401: Token expired;
      if (res.code === 401) {
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // Notification.error({
    //   title: '系统异常',
    //   message: error.message
    // })
    return Promise.reject(error)
  }
)

export default service

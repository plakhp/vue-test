import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// import Element from 'element-ui'
import './styles/element-variables.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import { getToken } from '@/utils/auth'
Vue.use(ViewUI)
// 导入axios
import axios from 'axios'
// 配置请求的根路径
const server = process.env.VUE_APP_BASE_API + '/' + process.env.VUE_APP_SERVER_OAUTH + '/'
// console.log(server, '11111111111111111111111111')

axios.defaults.baseURL = server
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = getToken()
  return config
})
Vue.prototype.$http = axios
import Qs from 'qs' // 引入方式
Vue.prototype.$qs = Qs // 全局加载
// 时间过滤器
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
/**
   * If you don't want to use mock-server
   * you want to use MockJs for mock api
   * you can execute: mockXHR()
   *
   * Currently MockJs will be used in the production environment,
   * please remove it before going online! ! !
   */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'development') {
//   mockXHR()
// }

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

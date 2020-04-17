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

Vue.use(ViewUI)
// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = ''
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios
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

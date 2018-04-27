// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import './assets/icon/iconfont.css'
import axios from 'axios'
// 引入echarts
import echarts from 'echarts'
import App from './App'
import moment from 'moment'
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.axios = axios
Vue.prototype.moment = moment

Vue.filter('F2C', function (value) {
  const func = r => {
    r.MAX = r.MAX + ''
    r.MIN = r.MIN + ''
    if (r.LAST_TEMP) {
      r.LAST_TEMP = r.LAST_TEMP ? ((+r.LAST_TEMP - 32) / 1.8).toFixed(1) : 'loading'
    }
    return Object.assign({}, r, {
      TEMP: ((+r.TEMP - 32) / 1.8).toFixed(1),
      MAX: ((+r.MAX.replace('*', '') - 32) / 1.8).toFixed(1),
      MIN: ((+r.MIN.replace('*', '') - 32) / 1.8).toFixed(1)
    })
  }
  if (value.rows) {
    value.rows = value.rows.map(func)
  } else {
    value = value.map(func)
  }

  return value
})
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

import Vue from 'vue'
import Router from 'vue-router'
// import nav from '@/components/nav'
// import {chart1} from '@/views/demo'
import {todayWeather, analyze, history} from '@/views/weather'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/todayWeather'
    },
    {
      path: '/todayWeather',
      name: 'todayWeather',
      component: todayWeather
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: analyze
    },
    {
      path: '/history',
      component: history
    }
  ]
})

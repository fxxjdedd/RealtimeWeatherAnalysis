import Vue from 'vue'
import Router from 'vue-router'
// import nav from '@/components/nav'
// import {chart1} from '@/views/demo'
import {todayWeather, temperature, windSpeed, airQuality, rainFall, airPressure, history} from '@/views/weather'
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
      path: '/temperature',
      name: 'temperature',
      component: temperature
    },
    {
      path: '/windSpeed',
      name: 'windSpeed',
      component: windSpeed
    },
    {
      path: '/airQuality',
      name: 'airQuality',
      component: airQuality
    },
    {
      path: '/rainFall',
      name: 'rainFall',
      component: rainFall
    },
    {
      path: '/airPressure',
      name: 'airPressure',
      component: airPressure
    },
    {
      path: '/history',
      component: history
    },
    {
      path: '/quit',
      component: windSpeed
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import nav from '@/components/nav'
// import {chart1} from '@/views/demo'
import {todayWeather, temperature, windSpeed, airQuality, rainFall, airPressure} from '@/views/weather'
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
      path: '/3',
      component: windSpeed
    },
    {
      path: '/4',
      component: windSpeed
    },
    {
      path: '/5',
      component: windSpeed
    },
    {
      path: '/6',
      component: windSpeed
    }
  ]
})

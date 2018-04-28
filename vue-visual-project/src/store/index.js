import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  filterData: {
    todayWeather: {
      city: '济南',
      realtime: {}
    },
    analyze: {
      city: '济南',
      timeType: 'date',
      startTime: '',
      endTime: '',
      chart: 'temperature'
    },
    history: {
      city: '济南',
      startTime: '',
      endTime: ''
    }
  },
  propertyMap: {
    'city': '城市',
    'date': '日期',
    'TEMP': '平均气温',
    'DEWP': '平均露点',
    'SLP': '平均海平面气压',
    'STP': '平均收集站气压',
    'VISIB': '平均可见度',
    'WDSP': '平均风速',
    'MXSPD': '最大持续风速',
    'GUST': '最大阵风',
    'MAX': '最高温度',
    'MIN': '最低温度',
    'PRCP': '总降水量',
    'SNDP': '积雪厚度',
    'FRSHTT': '天气情况'
  }
}

const getters = {
  filterData: (state) => state.filterData,
  propertyMap: (state) => state.propertyMap
}

const mutations = {
  updateFilterData (state, data) {
    state.filterData[data.key][data.type] = data.value
    console.log(state.filterData[data.key])
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations
})

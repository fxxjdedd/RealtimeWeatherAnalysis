import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  filterData: {
    todayWeather: {
      city: '济南'
    },
    temperature: {
      city: '济南',
      timeType: 'date',
      startTime: new Date().getTime() - 3600 * 24 * 1000 * 7,
      endTime: new Date().getTime()
    },
    windSpeed: {
      city: '济南',
      timeType: 'date',
      startTime: new Date().getTime() - 3600 * 24 * 1000 * 7,
      endTime: new Date().getTime()
    },
    rainFall: {
      city: '济南',
      timeType: 'date',
      startTime: new Date().getTime() - 3600 * 24 * 1000 * 7,
      endTime: new Date().getTime()
    },
    airPressure: {
      city: '济南',
      timeType: 'date',
      startTime: new Date().getTime() - 3600 * 24 * 1000 * 7,
      endTime: new Date().getTime()
    },
    airQuality: {
      city: '济南',
      timeType: 'date',
      startTime: new Date().getTime() - 3600 * 24 * 1000 * 7,
      endTime: new Date().getTime()
    }
  }
}

const getters = {
  filterData: (state) => state.filterData
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


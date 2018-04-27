<template>
  <div class="TodayWeather">
    <el-row :gutter="20" class="TodayWeather__Header">
      <el-col :span="8">
        <div class="TodayWeather__Header-title">
          <h2>{{curFilterData.city}} 今日天气</h2>
        </div>
      </el-col>
      <el-col :offset="13" :span="3">
        <div class="TodayWeather__Header-time">
          <time-box></time-box>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="TodayWeather__Middle">
      <el-col :span="8">
        <el-card class="TodayWeather__Middle-card">
          <span>气温</span>
          <ve-gauge :data="middleGauge.data|F2C" :settings="middleGauge.settings" height="250px"></ve-gauge>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="TodayWeather__Middle-card">
          <span>温差</span>
          <ve-line :data="middleDiff.data|F2C" :settings="middleDiff.settings"  height="250px"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="TodayWeather__Middle-card">
          <span>风速</span>
          <wind-speed :data="lastData"></wind-speed>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="TodayWeather__Bottom">
      <el-col :span="16">
        <el-card class="TodayWeather__Bottom-card">
          <ve-line :data="bottomCard.data|F2C" :settings="bottomCard.settings"></ve-line>
        </el-card>
      </el-col>
      <el-col :span="8" class="TodayWeather__Bottom__Right">
        <div>
          <el-card class="TodayWeather__Bottom__Right-card">
            <weather-condition :data="lastData"></weather-condition>
          </el-card>
        </div>
        <div>
          <el-card class="TodayWeather__Bottom__Right-card">
            <predict :data="predictData|F2C"></predict>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {TimeBox, WindSpeed, WeatherCondition, Predict} from '@/components/commons'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  components: {
    TimeBox,
    WindSpeed,
    WeatherCondition,
    Predict
  },
  data () {
    return {
      limitedData: [],
      predictData: []
    }
  },
  watch: {
    'curFilterData.realtime': {
      immediate: true, // 立即执行
      // timeBox的时间变化以及顶部城市筛选的变化都会触发更新
      async handler (value, old) {
        let num = 1
        const {data} = await axios.get('http://101.201.66.163:3000/api/get', {
          params: Object.assign({}, this.curFilterData, {index: -1, num})
        })
        this.realtimeData = data.data[0] || {}

        const resp = await axios.get('http://101.201.66.163:3000/api/predict', {
          params: this.curFilterData
        })
        this.predictData = resp.data.data
      }
    },
    'curFilterData.city': {
      // timeBox的时间变化以及顶部城市筛选的变化都会触发更新
      async handler (value, old) {
        let num = this.limitedData.length
        const {data} = await axios.get('http://101.201.66.163:3000/api/get', {
          params: Object.assign({}, this.curFilterData, {index: -1, num})
        })
        this.limitedData = data.data
        const resp = await axios.get('http://101.201.66.163:3000/api/predict', {
          params: this.curFilterData
        })
        this.predictData = resp.data.data
      }
    }
  },
  computed: {
    ...mapGetters([
      'filterData',
      'propertyMap'
    ]),
    curFilterData () {
      return this.filterData[this.$route.name]
    },
    lastData () {
      return this.realtimeData.slice(this.realtimeData.length - 1)
    },
    realtimeData: {
      get () {
        return this.limitedData
      },
      set (value) {
        if (this.limitedData.length >= 90) {
          this.limitedData.splice(0, 1)
        }
        this.limitedData.push(value)
      }
    },
    bottomCard () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.realtimeData
        },
        settings: {
          metrics: ['TEMP', 'WDSP', 'DEWP'],
          dimension: ['date'],
          labelMap: this.propertyMap
        }
      }
    },
    middleGauge () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.lastData
        },
        settings: {
          dimension: 'date',
          metrics: 'TEMP'
        }
      }
    },
    middleDiff () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.realtimeData.length <= 7 ? this.realtimeData
            : this.realtimeData.slice(this.realtimeData.length - 7)
        },
        settings: {
          metrics: ['MAX', 'MIN'],
          dimension: ['date'],
          labelMap: this.propertyMap,
          area: true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TodayWeather {
  &__Header {
    text-align: left;
  }
  &__Middle {
    &-card {
      height: 250px;
      text-align: left;
      span {
        font-weight: bold;
      }
    }
  }
  &__Bottom {
    margin-top: 20px;
    &-card {
      height: 400px;
    }
    &__Right {
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &-card {
        height: 185px;
      }
    }
  }
}
</style>

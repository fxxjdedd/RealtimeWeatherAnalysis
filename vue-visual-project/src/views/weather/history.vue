<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
            <div>
                <ve-scatter :data="windSpeedData.data"
                            :grid="windSpeedData.grid"
                            :visual-map="windSpeedData.map"
                            :settings="windSpeedData.settings"
                            :title="windSpeedData.title"
                            :legend-visible="false"
                            :events="windSpeedData.event"
                            height="300px"></ve-scatter>
            </div>
        </el-col>
        <el-col :span="12">
                <ve-line :data="airPressureData.data"
                         :settings="airPressureData.settings"
                         :title="airPressureData.title"
                         :legend-visible="false"
                         :events="airPressureData.event"
                         height="300px"></ve-line>
        </el-col>
        <!-- <el-col :span="8">
                <ve-line :data="airQualityData.data"
                        :settings="airQualityData.settings"
                        :title="airQualityData.title"
                        :legend-visible="false"
                        height="300px"></ve-line>
        </el-col> -->
    </el-row>
    <el-row>
        <el-col :span="12">
            <div>
                <ve-line :data="temperatureData.data"
                         :settings="temperatureData.settings"
                         :title="temperatureData.title"
                         :events="temperatureData.event"
                         height="400px"></ve-line>
            </div>
        </el-col>
        <el-col :span="12">
                <ve-histogram :data="rainFallData.data"
                              :settings="rainFallData.settings"
                              :title="rainFallData.title"
                              :legend-visible="false"
                              :events="rainFallData.event"
                              height="400px"></ve-histogram>
        </el-col>
    </el-row>
    </el-main>

  </el-container>
</template>
<script>
import {getData} from '@/api'
import 'echarts/lib/component/title'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      windSpeed: [],
      airPressure: [],
      airQuality: [],
      temperature: [],
      rainFall: [],
      windSpeedData: {},
      airPressureData: {},
      airQualityData: {},
      temperatureData: {},
      rainFallData: {}
    }
  },
  computed: {
    ...mapGetters([
      'propertyMap'
    ])
  },
  created () {
    this.allData()
  },
  methods: {
    async allData () {
      const vuexData = this.$store.state.filterData
      for (const key in vuexData) {
        if (key !== 'todayWeather') {
          const {data} = await getData(vuexData[key])
          this[key] = data
        }
      }
      this.getWindSpeed()
      this.getAirPressure()
      this.getTemperature()
      this.getRainFall()
    },
    getWindSpeed () {
      const self = this
      this.windSpeedData = {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.windSpeed
        },
        map: {
          type: 'continuous',
          dimension: 3,
          min: 0,
          max: 10,
          inRange: {
            color: ['#19d4ae', '#5ab1ef']
          },
          bottom: 60
        },
        settings: {
          metrics: ['WDSP'],
          dimension: ['date'],
          area: true,
          labelMap: this.propertyMap
        },
        grid: {
          left: 50
        },
        title: {text: '风速'},
        event: {
          click: function () {
            // self.$router.push({name: '/windSpeed'})
            // self.detail("/windSpeed")
            // console.log(self.windSpeed,self.path)
            // self.$store.dispatch("/windSpeed")
            // self.path = '/windSpeed'
            self.detail('windSpeed')
          }
        }
      }
    },
    getAirPressure () {
      const self = this
      this.airPressureData = {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.airPressure
        },
        settings: {
          metrics: ['SLP'],
          dimension: ['date'],
          area: true,
          labelMap: this.propertyMap
        },
        title: {text: '气压'},
        event: {
          click: function () {
            self.detail('airPressure')
          }
        }
      }
    },
    getAirQuality () {
      const self = this
      this.airQualityData = {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.airQuality
        },
        settings: {
          metrics: ['VISIB'],
          // FRSHTT  天气情况
          dimension: ['date'],
          labelMap: this.propertyMap
        },
        title: {text: '空气质量'},
        event: {
          click: function () {
            self.detail('airQuality')
          }
        }
      }
    },
    getTemperature () {
      const self = this
      this.temperatureData = {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.temperature
        },
        settings: {
          metrics: ['TEMP'],
          dimension: ['date'],
          labelMap: this.propertyMap
        },
        title: {text: '气温'},
        event: {
          click: function () {
            self.detail('temperature')
          }
        }
      }
    },
    getRainFall () {
      const self = this
      this.rainFallData = {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.rainFall
        },
        settings: {
          metrics: ['DEWP'],
          dimension: ['date'],
          labelMap: this.propertyMap
        },
        title: {text: '降水'},
        event: {
          click: function () {
            self.detail('rainFall')
          }
        }
      }
    },
    detail (data) {
      this.$router.push({name: '/rainFall'})
      alert(data)
    }
  }
}
</script>
<style scoped>
</style>

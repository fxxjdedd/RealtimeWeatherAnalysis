<template>
  <div class="Analyze">
    <el-row>
      <el-col :span="24">
        <line-chart
          :data="lineChart.data | F2C"
          :settings="lineChart.settings"
          :range="range"
          @change="range = arguments[0]">
        </line-chart>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="Analyze__Box" :span="8" style="height: 600px">
        <span>同比表</span>
        <el-table
          :data="mergedData | F2C"
          heigth="any">
          <el-table-column
            label="日期"
            prop="date">
          </el-table-column>
          <el-table-column
            label="温度 °C"
            :prop="keyProp.key">
          </el-table-column>
          <el-table-column
            label="同比去年 °C">
            <template slot-scope="scope">
              <span style="color: green" v-if="scope.row[`LAST_${keyProp.key}`]>scope.row[`${keyProp.key}`]">{{scope.row[`LAST_${keyProp.key}`]}}</span>
              <span style="color: red" v-else>{{scope.row[`LAST_${keyProp.key}`]}}</span>
            </template>
          </el-table-column>
        </el-table>

      </el-col>
      <el-col class="Analyze__Box" :span="8">
        <span>{{pieTitle}}占比</span>
        <ve-pie
          :data="leftPieData.data"
          :settings="leftPieData.settings"
          :legend-visible="false"
          height="350px">
        </ve-pie>
      </el-col>
      <el-col class="Analyze__Box" :span="8" style="height: 600px">
        <span>天气情况</span>
        <condition-table :data="rigthConditionData" style="heigth: 600px"></condition-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {LineChart, ConditionTable} from '@/components/commons'
import {mapGetters} from 'vuex'
import moment from 'moment'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
import { getDebouncedRequest } from '@/utils'
export default {
  components: {
    LineChart,
    ConditionTable
  },
  data () {
    return {
      tableData: [],
      backData: [],
      yoyData: [],
      range: [],
      conditionMap: {
        '000000': '晴朗',
        '000001': '雾天',
        '000010': '雨天',
        '000100': '下雪',
        '001000': '冰雹',
        '010000': '打雷',
        '100000': '龙卷风',
        '110000': '台风'
      },
      keyMap: {
        temperature: {
          key: 'TEMP',
          values: ['TEMP', 'MAX', 'MIN']
        },
        windSpeed: {
          key: 'WDSP',
          values: ['WDSP', 'MXSPD']
        },
        rainFall: {
          key: 'PRCP',
          values: ['PRCP', 'SNDP']
        },
        airPressure: {
          key: 'SLP',
          values: ['SLP', 'STP']
        }
      }
    }
  },
  watch: {
    result: {
      deep: true,
      async handler () {
        if (!this.request) return
        await this.initTotalData()
      }
    },
    range: {
      deep: true,
      async handler () {
        const params = this.analyzeParams
        const {data} = await this.request(params, 'http://101.201.66.163:3000/api/query')
        this.yoyData = data.data || []
      }
    }
  },
  async created () {
    this.request = getDebouncedRequest()
    setTimeout(async () => {
      await this.initTotalData()
    }, 1000)
  },
  computed: {
    ...mapGetters([
      'propertyMap'
    ]),
    result () {
      return this.$store.state.filterData[this.$route.name]
    },
    totalParams () {
      return Object.assign({}, this.result, {interval: this.interval})
    },
    analyzeParams () {
      return Object.assign({}, this.result, {
        startTime: this.yoyDateRange[0],
        endTime: this.yoyDateRange[1],
        interval: this.interval
      })
    },
    keyProp () {
      return this.keyMap[this.result.chart]
    },
    interval () {
      if (this.result.timeType === 'date') {
        return 1
      } else if (this.result.timeType === 'month') {
        return 30
      } else {
        return 365
      }
    },
    pieTitle () {
      const key = this.keyProp.key
      if (key === 'TEMP') {
        return '温度'
      } else if (key === 'WDSP') {
        return '风速'
      } else if (key === 'PRCP') {
        return '降水'
      } else {
        return '气压'
      }
    },
    lineChart () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.tableData
        },
        settings: {
          metrics: this.keyProp.values,
          dimension: ['date'],
          area: true,
          labelMap: this.propertyMap
        }
      }
    },
    analyzeData () {
      return this.tableData.slice(this.range[0], this.range[1])
    },
    dateRange () {
      if (!this.analyzeData.length) return []
      return [this.analyzeData[0].date, this.analyzeData[this.analyzeData.length - 1].date]
    },
    yoyDateRange () {
      return this.dateRange.map(d => {
        return moment(d, 'YYYYMMDD').subtract(1, 'years').format('YYYYMMDD')
      })
    },
    mergedData () {
      return this.analyzeData.map((d, i) => {
        if (!this.yoyData || !this.yoyData[i]) return d
        const lastData = {}
        lastData['LAST_' + this.keyProp.key] = this.yoyData[i][this.keyProp.key]
        console.log(lastData)
        return Object.assign({}, d, lastData)
      })
    },
    leftPieData () {
      return {
        data: {
          columns: ['key', 'value'],
          rows: this.leftPieCountData
        },
        settings: {
          dimension: 'key',
          metrics: 'value'
        }
      }
    },
    leftPieCountData () {
      return this.getCountData(this.analyzeData)
    },
    rigthConditionData () {
      return this.getConditionData(this.analyzeData)
    }
  },
  methods: {
    async initTotalData () {
      const params = this.totalParams
      console.log(params)
      const {data} = await this.request(params, 'http://101.201.66.163:3000/api/query')
      console.log('请求第')
      this.tableData = data.data || []
      this.range = [0, this.tableData.length]
    },
    getCountData (arr) {
      const hash = arr.reduce((item, next) => {
        let key
        if (this.keyProp.key === 'TEMP') {
          key = ((parseFloat(next.TEMP) - 32) / 1.8).toFixed(0) + '°C'
        } else {
          key = parseFloat(next[this.keyProp.key]).toFixed(0)
        }
        console.log(key)
        if (!item[key]) {
          item[key] = 0
        }
        item[key] += 1
        return item
      }, {})
      const result = []
      for (const key in hash) {
        result.push({
          key: key,
          value: hash[key]
        })
      }
      return result
    },
    getConditionData (arr) {
      const hash = arr.reduce((item, next) => {
        let condition = next.FRSHTT
        if (!item[condition]) {
          item[condition] = 0
        }
        item[condition] += 1
        return item
      }, {})
      const result = []

      for (const key in hash) {
        result.push({
          key: key,
          msg: this.conditionMap[key],
          value: hash[key]
        })
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.Analyze {
  height: 350px;
  &__Box {
    margin-top: 15px;
    font-weight: bold;
    text-align: left;
  }
}
</style>

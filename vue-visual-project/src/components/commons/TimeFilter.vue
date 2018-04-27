<template>
  <div class="time-filter">
      <div class="time-filter-item">
        <el-select size="small" v-model="chart" class="chart" placeholder="请选择" v-if="show">
          <el-option
            v-for="item in chartOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="time-filter-item">
        <el-select size="small" v-model="city" class="city" placeholder="请选择">
          <el-option
            v-for="item in cityOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="time-filter-item" v-if="show">
        <el-select size="small" class="timeType" v-model="timeType" placeholder="类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="time-filter-item" v-if="show">
        <el-date-picker
          size="small"
          v-model="date"
          align="right"
          type="daterange"
          value-format="yyyyMMdd"
          placeholder="选择日期">
        </el-date-picker>
      </div>
  </div>
</template>
<script>
export default {
  name: 'time-filter',
  data () {
    return {
      cityOptions: [],
      chartOptions: [
        {label: '温度', value: 'temperature'},
        {label: '风速', value: 'windSpeed'},
        {label: '降水', value: 'rainFall'},
        {label: '气压', value: 'airPressure'}
      ],
      options: [
        {
          value: 'year',
          label: '年'
        },
        {
          value: 'month',
          label: '月'
        },
        {
          value: 'date',
          label: '天'
        }
      ]
    }
  },
  computed: {
    chart: {
      get () {
        return this.$store.state.filterData[this.$route.name].chart
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value,
          type: 'chart'
        })
      }
    },
    city: {
      get () {
        return this.$store.state.filterData[this.$route.name].city
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value,
          type: 'city'
        })
      }
    },
    timeType: {
      get () {
        return this.$store.state.filterData[this.$route.name].timeType
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value,
          type: 'timeType'
        })
      }
    },
    date: {
      get () {
        return [
          this.$store.state.filterData[this.$route.name].startTime,
          this.$store.state.filterData[this.$route.name].endTime
        ]
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value: value[0],
          type: 'startTime'
        })
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value: value[1],
          type: 'endTime'
        })
      }
    },
    show () {
      return this.$route.path !== '/todayWeather'
    }
  },
  created () {
    this.getTime()
    this.getCity()
  },
  watch: {
    '$route.name' () {
      this.getTime()
    }
  },
  methods: {
    async getTime () {
      const {data} = await this.axios.get(`${process.env.BASE_API}/api/get?index=-1&num=1`)
      const starttime = this.moment(data.data[0].date, 'YYYYMMDD').subtract(7, 'days').format('YYYYMMDD') || ''
      const endtime = data.data[0].date || ''
      this.$store.commit('updateFilterData', {
        key: this.$route.name,
        type: 'startTime',
        value: starttime
      })
      this.$store.commit('updateFilterData', {
        key: this.$route.name,
        type: 'endTime',
        value: endtime
      })
    },
    async getCity () {
      const {data} = await this.axios.get(`${process.env.BASE_API}/api/cityList`, this.result)
      this.cityOptions = data.data
    }
  }
}
</script>
<style lang="scss" scoped>
.time-filter {
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
}
.time-filter-item {
  margin: 0 8px;
}
.city{
  width: 90px;
}
.chart {
  width: 90px;
}
.timeType{
  width: 80px;
}
</style>

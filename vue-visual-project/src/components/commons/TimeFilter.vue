<template>
  <div class="time-filter" v-if="showFilter">
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
      <div class="time-filter-item" v-show="showTypeFilter">
        <el-select size="small" class="timeType" v-model="timeType" placeholder="类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="time-filter-item" v-show="timeType=='year'">
        <el-date-picker
          size="small"
          v-model="startTime"
          align="right"
          value-format="yyyy"
          type="year"
          placeholder="选择年">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
          size="small"
          v-model="endTime"
          align="right"
          value-format="yyyy"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </div>
      <div class="time-filter-item" v-show="timeType=='month'">
        <el-date-picker
          size="small"
          v-model="startTime"
          align="right"
          type="month"
          value-format="yyyyMM"
          placeholder="选择月">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
          size="small"
          v-model="endTime"
          align="right"
          value-format="yyyyMM"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="time-filter-item" v-show="timeType=='date'">
        <el-date-picker
          size="small"
          v-model="startTime"
          align="right"
          type="date"
          value-format="yyyyMMdd"
          placeholder="选择日期">
        </el-date-picker>
        <span>-</span>
        <el-date-picker
          size="small"
          v-model="endTime"
          align="right"
          type="date"
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
    startTime: {
      get () {
        return this.$store.state.filterData[this.$route.name].startTime
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value,
          type: 'startTime'
        })
      }
    },
    endTime: {
      get () {
        return this.$store.state.filterData[this.$route.name].endTime
      },
      set (value) {
        this.$store.commit('updateFilterData', {
          key: this.$route.name,
          value,
          type: 'endTime'
        })
      }
    },
    showFilter () {
      return this.$route.path !== '/history'
    },
    showTypeFilter () {
      return this.$route.path !== '/todayWeather'
    }
  },
  created () {
    this.getTime()
    this.getCity()
  },
  methods: {
    async getTime () {
      const {data} = await this.axios.get(`${process.env.BASE_API}/api/get?index=-1&num=1`)
      // let starttime
      console.log(data)
      const starttime = this.moment(data.data[0].date, 'YYYYMMDD').subtract(7, 'days').format('YYYYMMDD')
      const endtime = data.data[0].date
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
.timeType{
  width: 80px;
}
</style>

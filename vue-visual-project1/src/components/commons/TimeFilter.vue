<template>
    <div class="time-filter" v-if="showFilter">
      <div>
        <span>城市</span>
        <el-select v-model="city" class="city" placeholder="请选择">
          <el-option
            v-for="item in cityOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>   
      <div class="time-filter" v-if="timeFilter">
        <span>以</span>
        <el-select class="timeType" @change="timeTypeChange" v-model="timeType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>为单位查看</span>
        <div v-show="timeType=='year'">
          <el-date-picker
            v-model="startTime"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
          <span>--</span>
          <el-date-picker
            v-model="endTime"
            align="right"
            type="year"
            placeholder="选择年">
          </el-date-picker>
        </div>
        <div v-show="timeType=='month'">
          <el-date-picker
            v-model="startTime"
            align="right"
            type="month"
            placeholder="选择月">
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          v-model="endTime"
          align="right"
          type="month"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div v-show="timeType=='date'">
        <el-date-picker
          v-model="startTime"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <span>--</span>
        <el-date-picker
          v-model="endTime"
          align="right"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
</div>
</template>
<script>
export default {
  name: 'time-filter',
  data () {
    return {
      week: '',
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
    timeFilter () {
      return this.$route.path !== '/todayWeather'
    }
  },
  created () {
    this.getCityList()
  },
  methods: {
    async getCityList () {
      const {data} = await this.axios.get(`${process.env.BASE_API}/api/cityList`, this.result)
      this.cityOptions = data.data
    },
    timeTypeChange: function () {
      console.log(this.timeType)
    }
  }
}
</script>
<style lang="scss" scoped>
.time-filter {
  height: 60px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.city{
  width: 90px;
}
.timeType{
  width: 60px;
}
</style>

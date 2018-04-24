<template>
  <div class="TodayWeather">
    <el-row :gutter="20" class="TodayWeather__Header">
      <el-col :span="8">
        <div class="TodayWeather__Header-title">
          <h2>{{curFilterData.city}} 今日天气</h2>
        </div>
      </el-col>
      <el-col :offset="10" :span="6">
        <div class="TodayWeather__Header-time">
          <time-box></time-box>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="TodayWeather__Middle">
      <el-col :span="6">
        <el-card class="TodayWeather__Middle-card">
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="TodayWeather__Middle-card">

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="TodayWeather__Middle-card">

        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="TodayWeather__Middle-card">

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

          </el-card>
        </div>
        <div>
          <el-card class="TodayWeather__Bottom__Right-card">

          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {TimeBox} from '@/components/commons'
import {mapGetters} from 'vuex'
// import axios from 'axios'
export default {
  components: {
    TimeBox
  },
  data () {
    return {
      realtimeData: []
    }
  },
  watch: {
    curFilterData: {
      deep: true,
      immediate: true, // 立即执行
      async handler (value) {
        // const {data} = await axios.get('http://101.201.66.163:3000/', {
        //   params: value
        // })
        const {data} = {'code': 0, 'message': 'invoke ok!', 'data': [{'city': '潍坊', 'date': '19570927', 'TEMP': '68.6', 'DEWP': '8', 'SLP': '40.3', 'STP': '8', 'VISIB': '1014.7', 'WDSP': '8', 'MXSPD': '9999.9', 'GUST': '0', 'MAX': '26.4', 'MIN': '8', 'PRCP': '11.0', 'SNDP': '8', 'FRSHTT': '15.9'}, {'city': '潍坊', 'date': '19570928', 'TEMP': '68.5', 'DEWP': '8', 'SLP': '45.3', 'STP': '8', 'VISIB': '1013.3', 'WDSP': '8', 'MXSPD': '9999.9', 'GUST': '0', 'MAX': '22.5', 'MIN': '8', 'PRCP': '10.9', 'SNDP': '8', 'FRSHTT': '19.0'}]}
        this.realtimeData = data
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
      height: 220px;
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

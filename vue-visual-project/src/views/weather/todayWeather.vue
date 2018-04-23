<template>
  <div class="TodayWeather">
    <el-row :gutter="20" class="TodayWeather__Header">
      <el-col :span="8">
        <div class="TodayWeather__Header-title">
          <h2>气象数据分析与预测平台</h2>
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
          <ve-line></ve-line>
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
export default {
  components: {
    TimeBox
  },
  watch: {
    curFilterData: {
      deep: true,
      handler (value) {
        console.log(value)
      }
    }
  },
  computed: {
    ...mapGetters([
      'filterData'
    ]),
    curFilterData () {
      return this.filterData[this.$route.name]
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

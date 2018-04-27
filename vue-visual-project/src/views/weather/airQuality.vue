<template>
  <el-container>
    <el-main>
      <button @click="changeType">切换图表类型</button>
      <ve-chart :data="chartData.data" :settings="chartData.settings"></ve-chart>
    </el-main>

  </el-container>
</template>
<script>
import {getData} from '@/api'
import {mapGetters} from 'vuex'
// import index from '../../../node_modules/.2.5.16@vue';
export default {
  data () {
    return {
      index: 0,
      typeArr: ['histogram', 'line', 'pie'],
      tableData: []
    }
  },
  watch: {
    result: {
      deep: true,
      immediate: true, // 立即执行
      async handler () {
        const {data} = await getData(this.result)
        this.tableData = data
      }
    }
  },
  computed: {
     ...mapGetters([
      'propertyMap'
    ]),
    result () {
      return this.$store.state.filterData[this.$route.name]
    },
    chartData () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.tableData
        },
        settings: {
          metrics: ['FRSHTT', 'VISIB'],
          dimension: ['date'],
          type: this.typeArr[this.index],
          metrics: ['成本', '利润'],
          dimension: ['日期']
        }
      }
    }
  },
  methods: {
    changeType: function () {
      this.index++
      if (this.index >= this.typeArr.length) { this.index = 0 }
      this.chartSettings = { type: this.typeArr[this.index] }
    }
  }
}
</script>
<style scoped>
</style>

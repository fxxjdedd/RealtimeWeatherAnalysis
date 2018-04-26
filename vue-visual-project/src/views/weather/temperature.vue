<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="16">
            <div>
              <ve-line :data="lineChart.data"
                     :settings="lineChart.settings"
                     height="500px"></ve-line>
            </div>
        </el-col>
        <el-col :span="8">
                <ve-pie :data="pieChart.data"
                        :settings="pieChart.settings"
                        :grid="pieChart.grid"
                        height="300px"
                        :legend-visible="false"></ve-pie>
            <div style="height:150px;background-color:green">
                预测
            </div>
        </el-col>
    </el-row>
    </el-main>

  </el-container>
</template>
<script>
import {getData} from '@/api'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      tableData: []
    }
  },
  watch: {
    result: {
      deep: true,
      immediate: true, // 立即执行
      async handler () {
        const {data} = await getData(this.result)
        this.tableData = data || []
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
    lineChart () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.tableData
        },
        settings: {
          metrics: ['TEMP', 'SLP'],
          dimension: ['date'],
          area: true,
          labelMap: this.propertyMap
        }
      }
    },
    pieChart () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.tableData
        },
        settings: {
          dimension: ['date'],
          limitShowNum: 12,
          roseType: 'radius',
          legendName: {
            '其他': '其他'
          }
          // labelMap: this.propertyMap
        },
        grid: {
          bottom: 30
        }
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
</style>

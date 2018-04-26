<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
            <div>
                <ve-scatter :data="scatterChart.data"
                            :grid="scatterChart.grid"
                            :visual-map="scatterChart.map"
                            :settings="scatterChart.settings"
                            height="500px"></ve-scatter>
            </div>
        </el-col>
        <el-col :span="12">
            <ve-pie :data="pieChart.data"
                    :settings="pieChart.settings"
                    :legend-visible="false"
                    :grid="pieChart.grid"
                    height="500px"></ve-pie>
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
    scatterChart () {
      return {
        data: {
          columns: ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT'],
          rows: this.tableData
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
          metrics: ['WDSP'],
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

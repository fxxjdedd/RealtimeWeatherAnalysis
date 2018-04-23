<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="16">
            <div>
                <ve-line :data="chartData"
                     :settings="chartSettings"
                     height="500px"></ve-line>
            </div>
        </el-col>
        <el-col :span="8">
                <ve-pie :data="chartData1"
                        :settings="chartSettings1"
                        height="300px"></ve-pie>
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
export default {
  created () {
    this.getList()
    this.getPie()
  },
  watch: {
    result: {
      deep: true,
      immediate: true, // 立即执行
      async handler () {
        const {data} = await getData(this.result)
        console.log(data)
        // this.tableData = data
      }
    }
  },
  computed: {
    result () {
      return this.$store.state.filterData[this.$route.name]
    }
  },
  methods: {
    getList: function () {
      this.chartData = {
        columns: ['日期', '成本', '利润'],
        rows: [
          { 日期: '1月1日', 成本: 1523, 利润: 1523, 占比: 0.12, 其他: 100 },
          { 日期: '1月2日', 成本: 1223, 利润: 1523, 占比: 0.345, 其他: 100 },
          { 日期: '1月3日', 成本: 2123, 利润: 1523, 占比: 0.7, 其他: 100 },
          { 日期: '1月4日', 成本: 4123, 利润: 1523, 占比: 0.31, 其他: 100 },
          { 日期: '1月5日', 成本: 3123, 利润: 1523, 占比: 0.12, 其他: 100 },
          { 日期: '1月6日', 成本: 7123, 利润: 1523, 占比: 0.65, 其他: 100 }
        ]
      }
      this.chartSettings = {
        stack: { 售价: ['成本', '利润'] },
        area: true
      }
    },
    getPie: function () {
      this.chartData1 = {
        columns: ['日期', '成本', '利润'],
        rows: [
          { '日期': '1月1号', '成本': 123, '利润': 3 },
          { '日期': '1月2号', '成本': 1223, '利润': 6 },
          { '日期': '1月3号', '成本': 2123, '利润': 90 },
          { '日期': '1月4号', '成本': 4123, '利润': 12 },
          { '日期': '1月5号', '成本': 3123, '利润': 15 },
          { '日期': '1月6号', '成本': 7123, '利润': 20 }
        ]
      }
      this.chartSettings1 = {
        dimension: '成本',
        metrics: '利润'
      }
    }
  }
}
</script>
<style scoped>
</style>

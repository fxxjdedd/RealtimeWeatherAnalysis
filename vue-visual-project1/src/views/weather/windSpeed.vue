<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
            <div>
                <ve-scatter :data="chartData" 
                            :grid="chartGrid" 
                            :visual-map="chartVisualMap" 
                            :settings="chartSettings"
                            height="500px"></ve-scatter>
            </div>
        </el-col>
        <el-col :span="12">
            <ve-pie :data="chartData1" 
                        :settings="chartSettings1"
                        height="500px"></ve-pie>
        </el-col>
    </el-row>
    </el-main>
    
  </el-container>
</template>
<script>
export default {
  created () {
    this.getList()
    this.getPie()
  },
  methods: {
    getList: function () {
      this.chartData = {
        columns: ['日期', '余额', '数量', '年龄'],
        rows: {
          '上海': [
          { '日期': '1-1', '余额': 123, '年龄': 3, '数量': 1244 },
          { '日期': '1-2', '余额': 1223, '年龄': 6, '数量': 2344 },
          { '日期': '1-3', '余额': 7123, '年龄': 9, '数量': 3245 },
          { '日期': '1-4', '余额': 4123, '年龄': 12, '数量': 4355 },
          { '日期': '1-5', '余额': 3123, '年龄': 15, '数量': 4564 },
          { '日期': '1-6', '余额': 2323, '年龄': 20, '数量': 6537 }
          ]
        }
      }
      this.chartSettings = {}
      this.chartVisualMap = {
        type: 'continuous',
        dimension: 3,
        min: 0,
        max: 30,
        inRange: {
          color: ['#19d4ae', '#5ab1ef']
        },
        bottom: 50
      }
      this.chartGrid = {
        left: 30
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
.view-contain {
  /* width: 70%; */
  /* height: 100%; */
  /* background: red; */
  /* margin:0 auto; */
}
</style>

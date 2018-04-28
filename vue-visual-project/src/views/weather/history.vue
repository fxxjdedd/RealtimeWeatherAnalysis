<template>
  <div class="History">
    <el-row  class="History__Header">
      <el-col :span="4">
        <h2>历史数据</h2>
      </el-col>
      <el-col :span="4" style="text-align: left">
        <h4>已收录 {{dataCount}} 条数据</h4>
      </el-col>
      <el-col :offset="12" :span="4">
        <el-button size="small" type="primary" icon="el-icon-download" @click="download">下载数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="tableData | F2C">
        <el-table-column
          label="城市"
          prop="city">
        </el-table-column>
        <el-table-column
          label="日期"
          prop="date">
        </el-table-column>
        <el-table-column
          label="平均气温"
          prop="TEMP">
        </el-table-column>
        <el-table-column
          label="最高温度"
          prop="MAX">
        </el-table-column>
        <el-table-column
          label="最低温度"
          prop="MIN">
        </el-table-column>
        <el-table-column
          label="总降水量"
          prop="PRCP">
        </el-table-column>
        <el-table-column
          label="气压"
          prop="SLP">
        </el-table-column>
        <el-table-column
          label="平均风速"
          prop="WDSP">
        </el-table-column>
        <el-table-column
          label="持续风速"
          prop="MXSPD">
        </el-table-column>
        <el-table-column
          label="天气情况">
          <template slot-scope="scope">
            <i :class="`icon-${scope.row.FRSHTT}`"></i>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import {DiamondChart} from '@/components/commons'
export default {
  components: {
    DiamondChart
  },
  data () {
    return {
      tableData: [],
      dataCount: 0,
      timer: {}
    }
  },
  async created () {
    const {data} = await axios.get('http://101.201.66.163:3000/api/queryLen')
    this.dataCount = data.len
    this.timer = setInterval(async () => {
      const {data} = await axios.get('http://101.201.66.163:3000/api/queryLen')
      this.dataCount = data.len
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    'result': {
      deep: true,
      immediate: true,
      async handler () {
        console.log('History, watch')
        if (!this.result.city) return
        const {data} = await axios.get('http://101.201.66.163:3000/api/query', {
          params: this.result
        })
        this.tableData = data.data
      }
    }
  },
  computed: {
    result () {
      const data = this.$store.state.filterData[this.$route.name]
      return {
        startTime: data.startTime,
        endTime: data.endTime,
        city: data.city
      }
    }
  },
  methods: {
    download () {
      const data = [[]]
      data[0] = ['city', 'date', 'TEMP', 'DEWP', 'SLP', 'STP', 'VISIB', 'WDSP', 'MXSPD', 'GUST', 'MAX', 'MIN', 'PRCP', 'SNDP', 'FRSHTT']
      this.tableData.forEach(d => {
        data.push(data[0].map(c => d[c]))
      })
      let csvContent = 'data:text/csv;charset=utf-8,\ufeff'
      data.forEach((d, i) => {
        const dataString = d.join(',')
        csvContent += i < data.length ? dataString + '\n' : dataString
      })
      console.log(data, csvContent)

      const encodeUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodeUri)
      // 这个地方要区分
      link.setAttribute('download', 'data.csv')
      document.body.appendChild(link)
      link.click()
      console.log(data)
      // window.open(encodeUri)
    }
  }
}
</script>

<style lang="scss">
.History {
  &__Header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>

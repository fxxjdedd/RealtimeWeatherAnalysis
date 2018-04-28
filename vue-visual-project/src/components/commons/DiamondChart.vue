<template>
  <div class="DiamondChart" id="diamond-chart" height="60">
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill'

export default {
  mounted () {
    const option = {
      series: [{
        type: 'liquidFill',
        shape: 'diamond',
        outline: {
          show: false
        },
        label: {
          position: ['-20%', '50%'],
          fontSize: 14
        },
        itemStyle: {
          opacity: 0.9
        }
      }]
    }
    echarts.init(document.getElementById('diamond-chart')).setOption(option)
  }
}
</script>

<style lang="scss" scoped>
#diamond-chart {
  height: 60px;
  width: 100%;
}
</style>

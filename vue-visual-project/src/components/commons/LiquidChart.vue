<template>
  <div class="LiquidChart" id="liquid-chart">
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
        data: [0.5, 0.4, 0.3, 0.2],
        shape: 'container',
        outline: {
          show: false
        },
        label: {
          position: ['-20%', '50%'],
          fontSize: 14
        },
        redius: '100px',
        itemStyle: {
          opacity: 0.9
        }
      }]
    }
    echarts.init(document.getElementById('liquid-chart')).setOption(option)
  }
}
</script>

<style lang="scss" scoped>
#liquid-chart {
  height: 60px;
  width: 100%;
}
</style>

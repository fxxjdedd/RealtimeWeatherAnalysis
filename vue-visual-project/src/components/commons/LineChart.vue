<template>
          <ve-line
          :data="data"
          :settings="settings"
          :dataZoom="{type: 'slider'}"
          :events="chartEvents"
          height="300px">
        </ve-line>
</template>

<script>import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/title'
export default {
  props: {
    data: Object,
    settings: Object
  },
  computed: {
    chartEvents () {
      return {
        datazoom: this.dataZoomChange
      }
    }
  },
  methods: {
    dataZoomChange (e) {
      let {start, end} = e
      start = Math.floor(this.data.rows.length * start * 0.01)
      end = Math.floor(this.data.rows.length * end * 0.01)
      this.$emit('change', [start, end])
    }
  }
}
</script>

<style>

</style>

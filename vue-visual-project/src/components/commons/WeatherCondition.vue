<template>
  <div>
    <div><i class="icon" v-bind:class="weatherClass"></i></div>
    <div>{{infoMsg}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
      conditionMap: {
        '000000': '晴朗',
        '000001': '雾天',
        '000010': '雨天或毛毛雨',
        '000100': '下雪或冰粒',
        '001000': '冰雹',
        '010000': '打雷',
        '100000': '龙卷风或漏斗云'
      }
    }
  },
  computed: {
    infoNumber () {
      return this.data[0] ? this.data[0].FRSHTT : 0
    },
    infoMsg () {
      return this.conditionMap[this.infoNumber]
    },
    weatherClass () {
      const o = {}
      o[`icon-${this.infoNumber}`] = true
      return o
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  font-size: 99px;
}
</style>

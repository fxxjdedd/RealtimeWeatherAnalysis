<template>
  <div class="Predict">
    <p>明日气温:</p>
    <p class="Predict-temp">{{predict}}°</p>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  computed: {
    predict () {
      return this.data[0] ? this.data[0].TEMP : 0
    }
  }
}
</script>

<style lang="scss" scoped>
.Predict {
  &-temp{
    font-size: 58px;
    line-height: 58px;
    margin: 0;
    margin-top: 15px;
  }
}
</style>

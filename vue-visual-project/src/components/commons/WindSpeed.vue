<template>
  <div class="WindSpeed" >
    <div v-bind:style="windSpeedStyle">
      <i class="icon icon-windspeed"></i>
    </div>
    <div class="WindSpeed__Info">
      <p>风级:{{windLevel}} 级</p>
      <p>风速:{{windSpeed}} m/s</p>
    </div>
  </div>
</template>

<script>
import {scaleLinear} from 'd3-scale'
export default {
  props: {
    data: Array
  },
  computed: {
    windSpeed () {
      return this.data[0] ? this.data[0].WDSP : 0
    },
    windLevel () {
      if (this.windSpeed >= 0 && this.windSpeed < 0.2) {
        return 0
      } else if (this.windSpeed < 1.5) {
        return 1
      } else if (this.windSpeed < 3.3) {
        return 2
      } else if (this.windSpeed < 5.4) {
        return 3
      } else if (this.windSpeed < 7.9) {
        return 4
      } else if (this.windSpeed < 10.7) {
        return 5
      } else if (this.windSpeed < 13.8) {
        return 6
      } else if (this.windSpeed < 17.1) {
        return 7
      } else if (this.windSpeed < 20.7) {
        return 8
      } else if (this.windSpeed < 24.4) {
        return 9
      } else if (this.windSpeed < 28.4) {
        return 10
      } else if (this.windSpeed < 32.6) {
        return 11
      } else {
        return 12
      }
    },
    windSpeedStyle () {
      const scale = scaleLinear().domain([0, 12])
        .range([6, 0])
      console.log(this.data)
      console.log(`rotating ${scale(this.windLevel)} linear infinite`)
      return { animation: `rotating ${scale(this.windLevel)}s linear infinite` }
    }
  }
}
</script>

<style lang="scss">
.WindSpeed {
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    display: block;
    font-size: 180px;
    color: #1296db;
  }
  &__Info {
    display: flex;
    flex-direction: column;
    p {
      font-size: 14px;
      margin: 5px;
    }
  }
}
</style>

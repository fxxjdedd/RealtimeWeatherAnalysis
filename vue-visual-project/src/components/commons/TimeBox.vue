<template>
  <div class="TimeBox">
    <div :span="8" class="TimeBox__Date">
      <div class="TimeBox__Date-top">{{week}}</div>
      <div class="TimeBox__Date-bottom">
        <div>{{day}}</div>
        <div>{{month}}</div>
      </div>
    </div>
    <div :span="16" class="TimeBox__Time" v-show="showTime">
      <div class="TimeBox__Time-top">
        <div>{{tag}}</div>
      </div>
      <div class="TimeBox__Time-bottom">
        <div>{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      realtime: new Date()
    }
  },
  props: {
    showTime: Boolean
  },
  computed: {
    itemArray: {
      get () {
        return this.realtime.toString().split(' ')
      }
    },
    week () {
      return this.itemArray[0]
    },
    day () {
      return this.itemArray[2]
    },
    month () {
      return this.itemArray[1]
    },
    time () {
      return this.itemArray[4].split(':').slice(0, 2).join(':')
    },
    tag () {
      return this.time > '12' ? 'PM' : 'AM'
    }
  },
  created () {
    this.timer = setInterval(() => {
      // 每隔3s增加一天
      this.realtime = new Date(this.realtime.getTime() + 24 * 3600 * 1000)
      this.$store.commit('updateFilterData', {
        key: this.$route.name,
        value: this.realtime,
        type: 'realtime'
      })
    }, 3000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    console.log('timer interval cleared')
  }
}
</script>

<style lang="scss" scoped>
.TimeBox {
  display: flex;
  flex-direction: row;
  &__Date {
    background: #2eaf95;
    color: white;
    font-weight: bold;
    padding: 0 10px;
    &-top {
      text-align: left;
    }
    &-bottom {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      div:first-of-type {
        font-size: 2.5rem;
        line-height: 2.5rem;
      }
      div:last-of-type {
        margin-left: 5px;
      }
    }
  }
  &__Time {
    background: white;
    color: #2eaf95;
    font-weight: bold;
    padding: 0 10px;
    &-top {
      text-align: right;
    }
    &-bottom {
      text-align: left;
      font-size: 2.5rem;
      line-height: 2.5rem;
    }
  }
}
</style>

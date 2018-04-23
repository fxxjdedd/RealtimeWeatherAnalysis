<template>
  <div class="TimeBox">
    <div :span="8" class="TimeBox__Date">
      <div class="TimeBox__Date-top">{{data.week}}</div>
      <div class="TimeBox__Date-bottom">
        <div>{{data.day}}</div>
        <div>{{data.month}}</div>
      </div>
    </div>
    <div :span="16" class="TimeBox__Time">
      <div class="TimeBox__Time-top">
        <div>{{data.tag}}</div>
      </div>
      <div class="TimeBox__Time-bottom">
        <div>{{data.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {
        week: 'Monday',
        day: '10',
        month: 'Feb',
        tag: 'PM',
        time: '20:30'
      }
    }
  },
  props: {
    // data: {
    //   type: Object,
    //   default: function () {
    //     return {
    //       week: 'Monday',
    //       day: '10',
    //       month: 'Feb'
    //     }
    //   }
    // }
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

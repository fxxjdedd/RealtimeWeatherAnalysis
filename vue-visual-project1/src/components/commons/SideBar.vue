<template>
  <el-col :span="4">
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/todayWeather">
          <i class="icon-jinri"></i>
          <span slot="title">今日天气</span>
      </el-menu-item>
      <el-menu-item index="/temperature">
          <i class="icon-wendu"></i>
          <span slot="title">气象温度</span>
      </el-menu-item>
      <el-menu-item index="/windSpeed">
          <i class="icon-fengsu"></i>
          <span slot="title">气象风速</span>
      </el-menu-item>
      <el-menu-item index="/rainFall">
          <i class="icon-xiayu"></i>
          <span slot="title">平均降水</span>
      </el-menu-item>
      <el-menu-item index="/airPressure">
          <i class="icon-daqiyali"></i>
          <span slot="title">气压气压</span>
      </el-menu-item>
      <el-menu-item index="/airQuality">
          <i class="icon-kongqizhiliang"></i>
          <span slot="title">空气质量</span>
      </el-menu-item>
      <el-menu-item index="/history">
          <i class="icon-3lishi"></i>
          <span slot="title">历时数据</span>
      </el-menu-item>
      <!-- <el-menu-item index="/personal">
          <i class="icon-geren11"></i>
          <span slot="title">个人中心</span>
      </el-menu-item> -->
    </el-menu>
</el-col>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
  a {
   text-decoration:none;
  }
</style>


<template>
  <div id="app">
    <el-container>
      <el-header>
        <nav-bar>
          <time-filter></time-filter>
          <liquid-chart slot="chart"></liquid-chart>
        </nav-bar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <side-bar></side-bar>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {NavBar, SideBar, TimeFilter, LiquidChart} from '@/components/commons'
export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    TimeFilter,
    LiquidChart
  }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0
}
.el-header {
  margin: 0;
  padding: 0;
}
.el-aside {
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>

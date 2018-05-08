<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true">
      <el-menu-item index="/todayWeather">
          <i class="icon-jinri"></i>
          <span slot="title">今日天气</span>
      </el-menu-item>
      <el-menu-item index="/analyze">
          <i class="icon-wendu"></i>
          <span slot="title">气象分析</span>
      </el-menu-item>
      <el-menu-item index="/history">
          <i class="icon-3lishi"></i>
          <span slot="title">历时数据</span>
      </el-menu-item>
    </el-menu>
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
.el-menu {
    /* position: absolute;
    top: 61px;
    bottom: 0px;
    width: 200px; */
    border: none;
}
a {
    text-decoration:none;
}
</style>

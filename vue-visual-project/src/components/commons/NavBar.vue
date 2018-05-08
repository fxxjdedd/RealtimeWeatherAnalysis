<template>
  <div class="NavBar">
    <el-menu class="NavBar__Menu" mode="horizontal">
      <el-menu-item index="1">气象大数据分析与预测平台</el-menu-item>
      <slot></slot>
    </el-menu>
    <div class="NavBar__Chart">
      <slot name="chart"></slot>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.NavBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  &__Menu {
    z-index: 100000;
    width: 100%;
    background: rgba(255,255,255,0.8)
  }
  &__Chart {
    width: 100%;
    height: 100%;
  }
  .el-menu {
    border: none;
  }
}
.NavBar__Chart {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;

}
</style>

<template>
  <div class="TodayWeather">
    <el-row type="flex" class="TodayWeather__Header" justify="space-between">
      <el-col :span="6"><div class="grid-content bg-purple">a</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light">b</div></el-col>
    </el-row>
    <el-row ype="flex" class="TodayWeather__Middle" justify="space-around">
      <el-col :span="6">a</el-col>
      <el-col :span="6">b</el-col>
      <el-col :span="6">c</el-col>
      <el-col :span="6">d</el-col>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>

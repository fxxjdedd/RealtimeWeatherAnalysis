<template>
  <div class="ConditionTable">
    <el-table
      height="any"
      :data="data">
      <el-table-column
        label="天气情况">
        <template slot-scope="scope">
          <i :class="`icon-${scope.row.key}`"></i>
        </template>
      </el-table-column>
      <el-table-column
        label="天气说明"
        prop="msg">
      </el-table-column>
      <el-table-column
        label="天气天数"
        prop="value">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
.ConditionTable {
  height: 100%;
  .el-table {
    height: 100%;
  }
}
</style>

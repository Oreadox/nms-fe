<template>
  <div>
    <p style="text-align: center; font-size: 25px"><b>管理员后台</b></p>
    <el-table :data="permissions" :header-cell-style="{'text-align':'center'}">
      <el-table-column label="您目前拥有的权限">
        <el-table-column prop="class" label="权限类别" width="120"/>
        <el-table-column prop="desc" label="具体内容">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: "AdminIndexView",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
</style>
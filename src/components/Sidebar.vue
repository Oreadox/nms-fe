<template>
  <div>
    <el-container>
      <el-aside style="width: 200px; flex-shrink: 0;" class="side border">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '2', '3']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <document/>
                </el-icon>
                我的信息
              </template>
              <el-menu-item index="1-1">基本信息</el-menu-item>
              <el-menu-item index="1-2">账号安全</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <document/>
                </el-icon>
                新闻管理
              </template>
              <el-menu-item index="2-1">管理我的新闻</el-menu-item>
              <el-menu-item index="2-2">管理所有新闻</el-menu-item>
              <el-menu-item index="2-3">发布新闻</el-menu-item>
              <el-menu-item index="2-4">审核新闻</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <user/>
                </el-icon>
                用户管理
              </template>
                <el-menu-item index="3-1">管理用户</el-menu-item>
                <el-menu-item index="3-2">新增用户</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent"
}
</script>

<style scoped>
.side >>> .el-scrollbar {
  height: calc(100vh - 60px);
  /*display: block;*/
  /*position: relative;*/
  /*overflow-y: scroll;*/
  /*background-color: #324157 !important;*/
  background-color: white;
  border-right: solid 1px #dcdfe6
}
.border >>> .el-menu {
  border-right: none
}
</style>
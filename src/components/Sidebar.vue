<template>
  <div>
    <el-container>
      <el-aside style="width: 200px; flex-shrink: 0;" class="side border">
        <el-scrollbar>
          <el-menu :default-openeds="['admin', 'news', 'user']" router>
            <el-sub-menu index="admin">
              <template #title>
                <el-icon>
                  <document/>
                </el-icon>
                我的信息
              </template>
              <el-menu-item index="/admin/info">用户信息</el-menu-item>
              <el-menu-item index="/admin/modify/info">基础信息修改</el-menu-item>
              <el-menu-item index="/admin/modify/security">安全信息修改</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="news">
              <template #title>
                <el-icon>
                  <document/>
                </el-icon>
                新闻管理
              </template>
              <el-menu-item index="/admin/news/list">管理新闻</el-menu-item>
              <el-menu-item index="/admin/news/create">发布新闻</el-menu-item>
              <el-menu-item index="/admin/news/create_md">发布新闻-高级版</el-menu-item>
              <el-menu-item index="/admin/news/check">审核新闻</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="user">
              <template #title>
                <el-icon>
                  <user/>
                </el-icon>
                用户管理
              </template>
                <el-menu-item index="/admin/user">管理用户</el-menu-item>
                <el-menu-item index="/admin/user/add">新增用户</el-menu-item>
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
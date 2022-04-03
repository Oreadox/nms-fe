<template>
  <div class="center">
    <el-container>
      <SidebarComponent/>
      <el-main class="main">
        <div class="div">

          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SidebarComponent from "@/components/Sidebar";

export default {
  name: "AdminView",
  components: {SidebarComponent},
}
</script>

<style scoped>
.center {
  position: relative;
  width: min(1210px, 100%);
  /*width: max(720px, min(80%, 80%));*/
  margin: 0 auto;
  /*text-align: center;*/
}

.main {
  margin: 10px 0 0 10px;
  height: calc(100vh - 70px);
  background-color: white;
  border-radius: 4px;
}
</style>
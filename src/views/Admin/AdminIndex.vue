<template>
  <div>
    <HeaderComponent/>
    <div class="center">

      <el-container>
        <SidebarComponent/>
        <el-main class="main">

        </el-main>
      </el-container>
    </div>

  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import SidebarComponent from "@/components/Sidebar";
export default {
  name: "AdminIndexView",
  components: {HeaderComponent, SidebarComponent}
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
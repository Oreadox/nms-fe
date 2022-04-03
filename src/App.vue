<template>
  <div id="app">
    <HeaderComponent/>
    <router-view></router-view>
    <el-backtop :right="100" :bottom="100"/>
  </div>
</template>

<script>

import HeaderComponent from "@/components/Header";

export default {
  name: 'App',
  components: {HeaderComponent},
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #F6F6F6;
  min-height: 100vh;
  /*display:flex*/
}

/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>

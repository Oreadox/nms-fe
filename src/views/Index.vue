<template>
  <div>
    <HeaderComponent/>
    <el-container >
      <el-main class="center">
        <NewsPreviewComponents class="left"/>
        <NewsPopularComponent class="right"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import NewsPreviewComponents from '@/components/NewsPreview'
import NewsPopularComponent from '@/components/NewsPopular'

export default {
  name: "IndexView",
  components: {HeaderComponent, NewsPreviewComponents, NewsPopularComponent},

  data() {
    return {

    }
  },
  methods: {}
}
</script>

<style scoped>
.center{
  position: relative;
  width: min(1210px, 100%);
  /*width: max(720px, min(80%, 80%));*/
  margin: 0 auto;
  text-align: center;
  /*padding: 0 50px;*/
}
.left{
  position: relative;
  width: min(786px, 65%);
  /*margin: 0 0 0 auto;*/
  display: inline-block;
  vertical-align: top;
  /*float: left;*/
}
.right{
  position: relative;
  width: min(363px, 30%);
  /*margin: 0 auto 0 0;*/
  display: inline-block;
  vertical-align: top;
}
</style>


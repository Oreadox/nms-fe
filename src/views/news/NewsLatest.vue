<template>
  <div>
    <el-container>
      <el-main class="center">
        <NewsPreviewComponents url="/news" class="left"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NewsPreviewComponents from '@/components/NewsPreview'

export default {
  name: "NewsLatestView",
  components: {NewsPreviewComponents}
}
</script>

<style scoped>
.center {
  position: relative;
  width: min(1210px, 100%);
  /*width: max(720px, min(80%, 80%));*/
  margin: 0 auto;
  text-align: center;
  /*padding: 0 50px;*/
}

.left {
  /*position: relative;*/
  width: min(1159px, 100%);
  margin: 0 auto;
  /*display: inline-block;*/
  vertical-align: top;
}
</style>
<template>
  <div>
    <el-container>
      <el-main class="center">
        <NewsPreviewComponents :url="url" class="left" disable-page v-if="freshPage"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NewsPreviewComponents from '@/components/NewsPreview'

export default {
  name: "NewsSearchView",
  components: {NewsPreviewComponents},
  data() {
    return {
      keyword: this.$route.params.keyword,
      url: "",
      freshPage: true
    }
  },
  created() {
    this.keyword = this.$route.params.keyword
    this.url = `/news/search/${this.keyword}`
  },
  watch: {
    $route() {
      this.keyword = this.$route.params.keyword
      this.url = `/news/search/${this.keyword}`
      this.freshPage = false
      setTimeout(() => {
        this.freshPage = true
      }, 1)
    }
  }
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
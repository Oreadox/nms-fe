<template>
  <div>
    <div v-if="newsList.length===0 || newsList===null">
      <el-empty style="margin: 0 auto"
                :image-size=220 description="无结果"/>
    </div>
    <div class="div" v-else>
      <div v-for="news of newsList" :key="news" style="margin: 0 0 10px 0">
        <el-card class="box-card" shadow="hover">
          <template #header>
            <div class="card-header" @click="$router.push(`/news/${news.id}`)">
              <span><b>{{ news.title }}</b></span>
            </div>
          </template>
          <div style="text-align: left">
            {{ news.content.substring(0, 100).replaceAll(/[:&\|\\\*^%$` #@\+-~]/g, "") }}......
          </div>
        </el-card>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import {ElMessage} from "element-plus";

export default {
  name: "NewsPreviewComponents",
  data() {
    return {
      newsList: [],
      currentPage: 1,
    }
  },
  props: {
    url: {
      require: true
    },
    disablePage: {
      default: false,
      type: Boolean
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let that = this
      axios({
        method: 'get',
        url: !that.disablePage ? `${that.url}/page/1` : that.url,
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          that.newsList = respData['data']
        } else {
          ElMessage({
            message: '获取新闻失败',
            type: 'error',
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.div {
  width: 100%;
  margin: 0 2%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 100%;
}
</style>
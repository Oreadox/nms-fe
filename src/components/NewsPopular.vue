<template>
  <div>
    <el-table :data="popular" style="width: 100%">
      <el-table-column prop="title" label="热度最高">
        <template #default="scope">
          <div @click="$router.push(`/news/${scope.row['id']}`)">{{ scope.row['title'] }}</div>
        </template>
      </el-table-column>
    </el-table>
    <p style="margin: 10px"/>
    <!--  <el-table :data="guess" style="width: 100%">-->
    <!--      <el-table-column prop="title" label="猜你喜欢" />-->
    <!--  </el-table>-->
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "NewsPopularComponents",
  data() {
    return {
      popular: [],
      guess: [],
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
        url: '/news/popular/10',
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          that.popular = respData['data']
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

</style>
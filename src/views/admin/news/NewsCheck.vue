<template>
  <div>
    <el-table :data="newsDataFilter" stripe style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="date" label="发布时间" width="180" sortable/>
      <el-table-column prop="title" label="标题" sortable>
        <template #default="scope">
          <div @click="$router.push(`/news/${scope.row.id}`)" style="cursor: pointer">
            {{scope.row.title}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="150" sortable/>
      <el-table-column prop="" label="状态" width="100">
        <template #default>
          <el-tag type="info">未审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="140">
        <template #header>
          <el-input v-model="search" placeholder="搜索"/>
        </template>
        <template #default="scope">
          <el-button size="small" type="primary" @click="checkNews(scope.row['id'], 1)">通过</el-button>
          <el-button size="small" type="danger" @click="checkNews(scope.row['id'], -1)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {ElMessage} from "element-plus";

export default {
  name: "NewsCheck",
  data() {
    return {
      search: '',
      newsData: []
    }
  },
  computed: {
    newsDataFilter: function () {
      if (this.search.length === 0) {
        return this.newsData
      } else {
        return this.newsData.filter((data) => {
          return data.title.includes(this.search) || data.author.includes(this.search)
        })
      }
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
        url: '/news/unchecked'
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          let data = respData['data']
          data.forEach(function (news) {
            that.newsData.push({
              id: news['id'],
              date: moment(news['release_time']).format("YYYY-MM-DD HH:mm:ss"),
              author: news['author_username'],
              title: news['title'],
              checked: news['checked']
            })
          })
        } else {
          ElMessage({
            message: '获取失败',
            type: 'error',
          })
        }
      })
    },
    checkNews(id, status) {
      let that = this
      axios({
        method: 'put',
        url: '/news',
        data: {
          id: id,
          checked: status
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
          that.newsData = []
          that.initData()
        } else {
          ElMessage({
            message: '提交失败',
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
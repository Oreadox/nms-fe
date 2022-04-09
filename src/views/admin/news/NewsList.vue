<template>
  <div>
    <!--    <el-tabs type="card" v-model="tab" @tab-click="switchTabMethod">-->
    <el-tabs type="card" v-model="tab">
      <el-tab-pane label="我发布的新闻" name="my">
        <div>
          <el-table :data="newsDataFilter" stripe style="width: 100%"
                    :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="发布时间" width="180" sortable/>
            <el-table-column prop="title" label="标题" sortable>
              <template #default="scope">
                <div @click="$router.push(`/news/${scope.row.id}`)" style="cursor: pointer">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="150" sortable/>
            <el-table-column prop="" label="状态" width="95">
              <template #default="scope">
                <el-tag v-if="scope.row['checked']>0" @click="log(newsData[scope.$index])">审核通过</el-tag>
                <el-tag v-else-if="scope.row['checked']<0" type="danger">审核未过</el-tag>
                <el-tag v-else type="info">待审核</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="140">
              <template #header>
                <el-input v-model="search" placeholder="搜索"/>
              </template>
              <template #default="scope">
                <el-button size="small" @click="$router.push(`/admin/news/modify/${scope.row.id}`)">编辑</el-button>
                <el-popconfirm title="确定要删除吗？" icon-color="red" @confirm="deleteNews(scope.row['id'])"
                               confirmButtonText="确定" cancelButtonText="取消">
                  <template #reference>
                    <!--                    <el-button size="small" type="danger" @click="deleteNews(scope.row['id'])">删除</el-button>-->
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="所有新闻" name="all">
        <div>
          <el-table :data="allNewsDataFilter" stripe style="width: 100%"
                    :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column prop="date" label="发布时间" width="180" sortable/>
            <el-table-column prop="title" label="标题" sortable>
              <template #default="scope">
                <div @click="$router.push(`/news/${scope.row.id}`)" style="cursor: pointer">
                  {{ scope.row.title }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="author" label="作者" width="150" sortable/>
            <el-table-column prop="" label="状态" width="95">
              <template #default="scope">
                <el-tag v-if="scope.row['checked']>0">审核通过</el-tag>
                <el-tag v-else-if="scope.row['checked']<0" type="danger">审核未过</el-tag>
                <el-tag v-else type="info">待审核</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="140">
              <template #header>
                <el-input v-model="allSearch" placeholder="搜索"/>
              </template>
              <template #default="scope">
                <el-button size="small" @click="$router.push(`/admin/news/modify/${scope.row.id}`)">编辑</el-button>
                <el-popconfirm title="确定要删除吗？" icon-color="red" @confirm="deleteNews(scope.row['id'])"
                               confirmButtonText="确定" cancelButtonText="取消">
                  <template #reference>
                    <!--                    <el-button size="small" type="danger" @click="deleteNews(scope.row['id'])">删除</el-button>-->
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import moment from "moment";

export default {
  name: "NewsListView",
  data() {
    return {
      tab: "my",
      search: '',
      newsData: [],
      allSearch: '',
      allNewsData: [],

    }
  },
  created() {
    this.initData()
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
    },
    allNewsDataFilter: function () {
      if (this.allSearch.length === 0) {
        return this.allNewsData
      } else {
        return this.allNewsData.filter((data) => {
          return data.title.includes(this.allSearch) || data.author.includes(this.allSearch)
        })
      }
    }
  },
  methods: {
    initData() {
      this.refreshMyNews();
      this.refreshAllNews();
    },
    refreshMyNews() {
      let that = this
      axios({
        method: 'get',
        url: '/news/my'
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
    refreshAllNews() {
      let that = this
      axios({
        method: 'get',
        url: '/news/all'
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          let data = respData['data']
          data.forEach(function (news) {
            that.allNewsData.push({
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
    deleteNews(id) {
      let that = this
      axios({
        method: 'delete',
        url: `/news/${id}`,
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
          that.allNewsData = []
          that.newsData = []
          that.initData()
        } else {
          ElMessage({
            message: '删除失败',
            type: 'error',
          })
        }
      })
    },
    // switchTabMethod(tab) {
    //   console.log(tab.props.name)
    // }
  }
}
</script>

<style scoped>

</style>
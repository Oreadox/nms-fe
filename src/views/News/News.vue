<template>
  <div>
    <HeaderComponent/>
    <el-container>
      <el-main class="center">
        <div class="center">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header" @click="$router.push(`/news/${news.id}`)">
                <span><b>{{ newsData.title }}</b></span>
                <div>
                  <el-descriptions :column="2" :size="small" border class="align" style="margin-right: 10px">
                    <el-descriptions-item>
                      <template #label>
                        <div>
                          <el-icon style="vertical-align: middle">
                            <user/>
                          </el-icon>
                          作者
                        </div>
                      </template>
                      {{ newsData.authorUsername }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                      <template #label>
                        <div>
                          <el-icon style="vertical-align: middle">
                            <iphone/>
                          </el-icon>
                          阅读量
                        </div>
                      </template>
                      {{ newsData.count }}
                    </el-descriptions-item>
                  </el-descriptions>
                  <el-button class="button" type="text" style="">编辑</el-button>
                </div>
              </div>
            </template>
            <div style="text-align: left">{{ newsData.content }}</div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "NewsView",
  components: {HeaderComponent},
  data() {
    return {
      id: this.$route.params.id,
      newsData: {
        id: '',
        title: '',
        content: '',
        count: '',
        authorUsername: '',
        releaseTime: ''
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.id = this.$route.params.id
      let that = this
      axios({
        method: 'get',
        url: `http://localhost:8081/news/${that.id}`,
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          that.newsData = {
            id: respData['data']['id'],
            title: respData['data']['title'],
            content: respData['data']['content'],
            count: respData['data']['count'],
            authorUsername: respData['data']['author_username'],
            releaseTime: respData['data']['release_time']
          }

          respData['data']
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
        }
      })
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
  /*text-align: center;*/
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 100%;
}

.align {
  display: inline-block;
  vertical-align: middle;
}
</style>
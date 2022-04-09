<template>
  <div>
    <el-container>
      <el-main class="center">
        <div class="center">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span><b>{{ newsData.title }}</b></span>
                <div>
                  <el-descriptions :column="3" border class="align" style="margin-right: 10px">
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
<!--                    <el-descriptions-item>-->
<!--                      <template #label>-->
<!--                        <div>-->
<!--                          <el-icon style="vertical-align: middle">-->
<!--                            <iphone/>-->
<!--                          </el-icon>-->
<!--                          阅读量-->
<!--                        </div>-->
<!--                      </template>-->
<!--                      {{ newsData.count }}-->
<!--                    </el-descriptions-item>-->
                    <el-descriptions-item>
                      <template #label>
                        <div>
                          <el-icon style="vertical-align: middle">
                            <clock/>
                          </el-icon>
                          发布时间
                        </div>
                      </template>
                      {{ newsData.releaseTime }}
                    </el-descriptions-item>
                  </el-descriptions>
                  <el-button class="button" type="text"
                             v-if="$store.state.permission.includes('news:newEdit') ||
                                   $store.state.permission.includes('*:*')"
                             @click="$router.push(`/admin/news/modify/${id}`)">
                    编辑
                  </el-button>
                </div>
              </div>
            </template>
            <mavon-editor v-model="newsData.content" :subfield="false" :boxShadow="false"
                defaultOpen="preview" :toolbarsFlag="false" class="md"/>
<!--            <div style="text-align: left">{{ newsData.content }}</div>-->
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import moment from "moment";

export default {
  name: "NewsView",
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
        url: `/news/${that.id}`,
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          document.title = respData['data']['title']
          that.newsData = {
            id: respData['data']['id'],
            title: respData['data']['title'],
            content: respData['data']['content'],
            count: respData['data']['count'],
            authorUsername: respData['data']['author_username'],
            releaseTime: moment(respData['data']['release_time']).format("YYYY/MM/DD HH:mm")
          }
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
          that.$router.push('/index')
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

.md >>> .v-show-content, .v-note-wrapper {
  background-color: white !important;
  border: none;
  padding: 0 !important;
  z-index: 15;
}
</style>
<template>
  <div>
    <el-alert title="该页面仅供简单发布新闻, 高级版可以提供更多格式进行编辑"
              type="warning" style="margin-bottom: 10px" show-icon/>
    <div class="center">
      <el-input size="large" v-model="title" class="input left" placeholder="请输入标题"/>
      <el-button type="primary" class="right button" @click="submit">发布</el-button>
      <el-input v-model="content" :autosize="{ minRows: 20}" type="textarea" class="textarea"/>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "CreateNewsView",
  data() {
    return {
      content: "",
      title: ""
    }
  },
  methods: {
    submit() {
      console.log(this.title)
      console.log(this.content)
      if (this.title.trim() === '') {
        ElMessage({
          message: '标题不能为空',
          type: 'warning',
        })
        return
      } else if (this.content.trim() === '') {
        ElMessage({
          message: '内容不能为空',
          type: 'warning',
        })
        return
      }
      let that = this
      axios({
        method: 'post',
        url: '/news',
        data: {
          title: that.title,
          content: that.content,
          use_markdown: false
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '提交成功，待审核',
            type: 'success',
          })
          that.$router.push('/admin/news/list')
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
.input >>> .el-input__inner {
  font-size: 20px;
  font-weight: bolder;
  height: 45px;
}

.left {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: min(1089px, 90%);
  /*float: left;*/
}

.right {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
}

.button {
  height: 40px;
  width: min(97px, 8%);
  font: 16px bold;
}
.textarea >>> .el-textarea__inner {
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 16px;
}
</style>
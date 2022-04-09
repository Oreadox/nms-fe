<template>
  <div>
    <div>
      <el-container>
        <el-main style="padding: 10px">
          <div class="center">
            <el-input size="large" v-model="title" class="input left" placeholder="请输入标题"/>
            <el-button type="primary" class="right button" @click="submit">发布</el-button>
          </div>
          <div style="height: 10px"></div>
          <mavon-editor class="center height editor" v-model="markdownData"
                        @imgAdd="uploadFile" :toolbars="toolbars" fontSize="17px"/>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "NewsModifyView",
  data() {
    return {
      id: '',
      markdownData: "",
      title: "",
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        readmodel: true, // 沉浸式阅读
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
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
          document.title = `编辑-${respData['data']['title']}`
          that.title = respData['data']['title']
          that.markdownData = respData['data']['content']
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
          that.$router.push('/index')
        }
      })
    },
    base64ToFile(data, fileName) {
      let arr = data.split(',');
      let mime = arr[0].match(/:(.*?);/)[1];
      let bytes = atob(arr[1]); // 解码base64
      let n = bytes.length
      let ia = new Uint8Array(n);
      while (n--) {
        ia[n] = bytes.charCodeAt(n);
      }
      return new File([ia], fileName, {type: mime});
    },
    uploadFile(index, file) {
      let that = this
      let newFileName = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + '.' +
          file.name.substr(file.name.lastIndexOf('.') + 1)
      file = this.base64ToFile(file.miniurl, newFileName)
      axios({
        method: 'get',
        url: `/file/presigned_url/${newFileName}`
      }).then(function (response) {
        let respData = response['data']
        if (Boolean(respData['status']) === true) {
          let uploadUrl = respData['data']['url']
          let form = new FormData()
          form.append('image', file)
          axios.put(uploadUrl, file).then(function () {
            axios({
              method: 'get',
              url: `/file/url/${newFileName}`
            }).then(function (response) {
              respData = response['data']
              if (Boolean(respData['status']) === true) {
                that.$refs.mavon.$img2Url(index, respData['data']['url'])
              } else {
                ElMessage({
                  message: '图片上传失败',
                  type: 'error',
                })
              }
            })
          })
        } else {
          ElMessage({
            message: '图片上传失败',
            type: 'error',
          })
        }
      })
    },
    submit() {
      if (this.title.trim() === '') {
        ElMessage({
          message: '标题不能为空',
          type: 'error',
        })
        return
      } else if (this.markdownData.trim() === '') {
        ElMessage({
          message: '内容不能为空',
          type: 'error',
        })
        return
      }
      let that = this
      axios({
        method: 'put',
        url: '/news',
        data: {
          id: that.id,
          title: that.title,
          content: that.markdownData,
          use_markdown: true
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '提交成功',
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
.center {
  position: relative;
  width: min(1210px, 100%);
  margin: 0 auto;
}

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

.height {
  min-height: 80vh;
}

.editor >>> .auto-textarea-input, .markdown-body {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  z-index: 0;
}
</style>
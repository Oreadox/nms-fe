<template>
  <div class="div">
    <el-container>
      <el-header class="center">
        <div style="float: right; margin: 14px 70px">
          <el-row :gutter="8">
            <el-col :span="16">
              <el-input style="float: left" placeholder="搜索新闻"/>
            </el-col>
            <el-col :span="4"/>
            <el-col :span="4">
              <el-button v-if="$store.state.isLogin" class="button">{{ $store.state.username }}</el-button>
              <el-button type="primary" @click="openLoginComponent=true" v-else class="button">管理员登录</el-button>
            </el-col>
          </el-row>
        </div>
        <el-menu mode="horizontal">
          <el-tooltip placement="bottom" effect="light" content="回到首页">
            <el-menu-item index="1">首页</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="2">最新消息</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="3">信息公告</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="4">学术动态</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="后台" v-if="$store.state.isLogin">
            <el-menu-item index="18">发布审核新闻</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="后台" v-if="$store.state.isLogin">
            <el-menu-item index="19">管理员后台</el-menu-item>
          </el-tooltip>
        </el-menu>
      </el-header>
      <el-divider style="margin: -2px"/>
        <el-dialog v-model="openLoginComponent">
          <LoginComponent @setOpenLoginComponent="setOpenLoginComponent"></LoginComponent>
        </el-dialog>
    </el-container>
  </div>
</template>

<script>
import LoginComponent from "@/components/Login";
export default {
  name: "HeaderComponent",
  components: {LoginComponent},

  data() {
    return {
      openLoginComponent: false,
      loginForm: {
        username: '',
        password: '',
        totpCode: ''
      }
    }
  },
  methods: {
    setOpenLoginComponent(openLoginComponent){
      this.openLoginComponent = openLoginComponent
    }
  }
}
</script>

<style scoped>
.div {
  position: relative;
  width: 100%;
  top: 0;
  z-index: 1000;
  /*align-content: center;*/
  /*margin: 5px 20px 5px 15px;*/
}
.center{
  position: relative;
  width: min(1210px, 100%);
  /*width: max(720px, min(80%, 80%));*/
  margin: 0 auto;
  /*text-align: center;*/
}
.button{
  height: 35px;
  width: 100px;
}
</style>
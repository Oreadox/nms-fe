<template>
  <div class="div">
    <el-container>
      <el-header class="center">
        <div style="float: right; margin: 14px 70px">
          <el-row :gutter="8">
            <el-col :span="16">
              <el-input style="float: left" placeholder="搜索新闻"
                        v-model="search" @keyup.enter="gotoSearch">
                <template #suffix>
                  <el-icon @click="gotoSearch" class="el-input__icon">
                    <search/>
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="4"/>
            <el-col :span="4">
              <el-button class="button" @click="$router.push('/admin/info')" v-if="$store.state.isLogin">
                {{ $store.state.username }}
              </el-button>
              <el-button type="primary" @click="openLoginComponent=true" v-else class="button">管理员登录</el-button>
            </el-col>
          </el-row>
        </div>
        <el-menu mode="horizontal" :default-active="getCurrentPage" router>
          <el-tooltip placement="bottom" effect="light" content="回到首页">
            <el-menu-item index="/index">首页</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="/news/latest">最新消息</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="/news/notice">信息公告</el-menu-item>
          </el-tooltip>
          <el-tooltip placement="bottom" effect="light" content="test">
            <el-menu-item index="/news/academic">学术动态</el-menu-item>
          </el-tooltip>
          <!--          <el-tooltip placement="bottom" effect="light" content="后台" v-if="$store.state.isLogin">-->
          <!--            <el-menu-item index="/admin/news/list">发布审核新闻</el-menu-item>-->
          <!--          </el-tooltip>-->
          <el-tooltip placement="bottom" effect="light" content="后台" v-if="$store.state.isLogin">
            <el-menu-item index="/admin">管理员后台</el-menu-item>
          </el-tooltip>
        </el-menu>
      </el-header>
      <el-divider style="margin: -2px"/>
      <el-dialog v-model="openLoginComponent" width="600px" class="login">
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
      },
      search: ''
    }
  },
  computed: {
    getCurrentPage() {
      let path = this.$route.path
      switch (path) {
        case "/index":
          return "/index"
        case "/news/latest":
          return "/news/latest"
        case "/news/academic":
          return "/news/academic"
        default:
          if (path.startsWith("/admin"))
            return "/admin"
          return ""
      }
    }
  },
  methods: {
    gotoSearch() {
      if (this.search.trim().length > 0) {
        this.$router.push(`/news/search/${this.search.trim()}`)
        this.search = ''
      }
    },
    setOpenLoginComponent(openLoginComponent) {
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
  background-color: white;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  /*align-content: center;*/
  /*margin: 5px 20px 5px 15px;*/
}

.center {
  position: relative;
  width: min(1210px, 100%);
  /*width: max(720px, min(80%, 80%));*/
  margin: 0 auto;
  /*text-align: center;*/
}

.button {
  height: 35px;
  width: 100px;
}

.popover >>> .el-popover, .el-popper {
  padding: 0 !important;
}

/*.login >>> .el-dialog__body {*/
/*  padding: 10px 25px 5px 10px !important;*/
/*}*/
</style>
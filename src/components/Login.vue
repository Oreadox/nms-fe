<template>
  <div>
    <el-form :model="loginForm" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password"/>
      </el-form-item>
      <el-form-item label="动态口令">
        <el-input v-model="loginForm.totpCode" placeholder="未设置可忽略" type="number"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLoginForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import axios from 'axios'
import {ElMessage} from 'element-plus'

export default {
  name: "LoginComponent",

  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        totpCode: ''
      }
    }
  },
  computed: {},
  props: ['openLoginComponent'],
  methods: {
    submitLoginForm() {
      var that = this
      axios({
        method: 'post',
        url: '/token',
        data: {
          username: that.loginForm.username,
          password: that.loginForm.password,
          totp: that.loginForm.totpCode
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '登录成功',
            type: 'success',
          })
          axios({
            method: 'get',
            url: '/token',
          }).then(function (response) {
            var respData = response['data']
            if (Boolean(respData['status']) === true) {
              that.$store.commit("setUsername", respData['data']['username'])
              that.$store.commit("setLogin", true)
              that.$store.commit("setId", respData['data']['id'])
              that.$store.commit("setPermission", respData['data']['permission'])
              that.$emit("setOpenLoginComponent", false)
              that.loginForm.username = ''
              that.loginForm.password = ''
              that.loginForm.totp = ''
            }
          })
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
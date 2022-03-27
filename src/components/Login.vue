<template>
  <el-form>
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
        url: 'http://localhost:8081/token',
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
            url: 'http://localhost:8081/token',
          }).then(function (response) {
            var respData = response['data']
            if (Boolean(respData['status']) === true) {
              that.$store.commit("setUsername", respData['data']['username'])
              that.$store.commit("setLogin", true)
              that.$store.commit("setId", respData['data']['id'])
              that.$emit("setOpenLoginComponent", false)
            }
          })} else {
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
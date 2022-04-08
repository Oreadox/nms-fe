<template>
  <div>
    <el-form label-width="0" class="form">
      <el-descriptions title="新建用户" :column="1" size="large" border>
        <template #extra>
          <el-form-item>
            <el-button type="primary" @click="submit">提交信息</el-button>
          </el-form-item>
        </template>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user-filled/>
              </el-icon>
              用户名
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.username" placeholder="请输入用户名" class="input"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <lock/>
              </el-icon>
              密码
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.password" class="input"
                      placeholder="请输入密码" type="password"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <lock/>
              </el-icon>
              密码确认
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.passwordCheck" class="input"
                      placeholder="请再次输入密码" type="password"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <avatar/>
              </el-icon>
              权限
            </div>
          </template>
          <el-form-item>
            <el-checkbox-group v-model="formItem.permission">
              <el-checkbox label="news:newEdit">发布/编辑新闻</el-checkbox>
              <el-checkbox label="news:check">审核新闻</el-checkbox>
              <el-checkbox label="user:*">用户管理</el-checkbox>
              <el-tooltip placement="bottom" effect="light" content="包含前述所有权限">
                <el-checkbox label="*:*">超级管理员</el-checkbox>
              </el-tooltip>
            </el-checkbox-group>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <user/>
              </el-icon>
              姓名
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.name" placeholder="可选" class="input"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone/>
              </el-icon>
              电话
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.phone" placeholder="可选" class="input"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <message/>
              </el-icon>
              电子邮箱
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.email" placeholder="可选" class="input"></el-input>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="label_25percent">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <location/>
              </el-icon>
              院系
            </div>
          </template>
          <el-form-item>
            <el-input v-model="formItem.department" placeholder="可选" class="input"></el-input>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
  name: "UserAddView",
  data() {
    return {
      formItem: {
        username: '',
        password: "",
        passwordCheck: "",
        name: '',
        email: '',
        phone: '',
        department: '',
        permission: []
      }
    }
  },
  methods: {
    submit(){
      if (this.formItem.username.trim() === '') {
        ElMessage({
          message: '用户名不能为空',
          type: 'error',
        })
        return
      }
      if (this.formItem.password.trim() === '' || this.formItem.passwordCheck.trim() === '') {
        ElMessage({
          message: '密码不能为空',
          type: 'error',
        })
        return
      }
      if (this.formItem.password !== this.formItem.passwordCheck) {
        ElMessage({
          message: '两次密码不一致',
          type: 'error',
        })
        return
      }
      let that = this
      axios({
        method: 'post',
        url: '/admin',
        data: {
          username: that.formItem.username,
          password: that.formItem.password,
          name: that.formItem.name,
          email: that.formItem.email,
          phone: that.formItem.phone,
          department: that.formItem.department,
          permission: that.formItem.permission,
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '提交成功',
            type: 'success',
          })
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
.cell-item {
  display: flex;
  align-items: center;
}
.input >>> .el-input__inner {
  border: 0;
}
.form >>> .el-form-item--default{
  margin-bottom: 0;
}
</style>

<style>
/* 本css经过label-class-name="label_25percent"引用，请勿删除 */
.label_25percent {
  width: 25%;
}
</style>
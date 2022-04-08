<template>
  <div>
    <el-form label-width="0" class="form">
    <el-descriptions title="用户基础信息" :column="1" size="large" border>
      <template #extra>
        <el-form-item>
          <el-button type="primary" @click="submit">提交信息</el-button>
        </el-form-item>
      </template>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <key/>
            </el-icon>
            用户id
          </div>
        </template>
        <el-form-item>
          <el-input v-model="formItem.id" class="input" disabled></el-input>
        </el-form-item>
      </el-descriptions-item>
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
          <el-input v-model="formItem.username" class="input" disabled></el-input>
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
          <el-input v-model="formItem.name" placeholder="留空默认不进行更改" class="input"></el-input>
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
          <el-input v-model="formItem.phone" placeholder="留空默认不进行更改" class="input"></el-input>
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
          <el-input v-model="formItem.email" placeholder="留空默认不进行更改" class="input"></el-input>
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
          <el-input v-model="formItem.department" placeholder="留空默认不进行更改" class="input"></el-input>
        </el-form-item>
      </el-descriptions-item>
    </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "ChangeBasicInfoView",
  data() {
    return {
      formItem: {
        id: '',
        username: '',
        name: '',
        email: '',
        phone: '',
        department: ''
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData(){
      let that = this
      axios({
        method: 'get',
        url: '/admin'
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          let data = respData['data']
          that.formItem = {
            id: data['id'],
            username: data['username'],
            name: data['name'],
            email: data['email'],
            phone: data['phone'],
            department: data['department']
          }
        } else {
          ElMessage({
            message: '信息获取失败',
            type: 'error',
          })
        }
      })
    },
    submit(){
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: that.formItem.id,
          name: that.formItem.name,
          email: that.formItem.email,
          phone: that.formItem.phone,
          department: that.formItem.department
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
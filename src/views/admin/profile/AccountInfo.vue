<template>
  <div>
    <el-descriptions title="用户基础信息" :column="1" size="large" border>
      <template #extra>
        <el-button type="primary">修改基础信息</el-button>
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
        {{ userData.id }}
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
        {{ userData.username }}
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
        {{ userData.name }}
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
        {{ userData.phone }}
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
        {{ userData.email }}
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
        {{ userData.department }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <div style="margin-top: 20px">
    <el-descriptions title="用户安全信息" :column="1" size="large" border>
      <template #extra>
        <el-button type="primary">修改安全信息</el-button>
      </template>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <lock/>
            </el-icon>
            密码
          </div>
        </template>
        *********
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <setting/>
            </el-icon>
            两步验证
          </div>
        </template>
        <div v-if="!userData.enableTotp">未设置</div>
        <div v-else>已设置</div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <timer/>
            </el-icon>
            注册时间
          </div>
        </template>
        {{ userData.createTime }}
      </el-descriptions-item>
    </el-descriptions>
  </div>

  <div style="margin-top: 25px">
    <el-descriptions title="用户权限信息" :column="1" size="large" border>
      <template #extra>
        <el-button type="danger" @click="logout">退出登录状态</el-button>
      </template>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <message-box/>
            </el-icon>
            新闻管理权限
          </div>
        </template>
        <div v-if="userData['permission'].includes('news:newEdit') ||
                   userData['permission'].includes('news:check') ||
                   userData['permission'].includes('*:*')">
          <el-tag class="tag" v-if="userData['permission'].includes('news:newEdit')||
                                    userData['permission'].includes('*:*')">
            发布/编辑新闻
          </el-tag>
          <el-tag class="tag" v-if="userData['permission'].includes('news:check')||
                                    userData['permission'].includes('*:*')">
            审核新闻
          </el-tag>
        </div>
        <div v-else>
          <el-tag type="info">无相关权限</el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <user/>
            </el-icon>
            用户管理权限
          </div>
        </template>
        <div v-if="userData['permission'].includes('user:*') ||
                   userData['permission'].includes('*:*')">
          <el-tag>用户管理</el-tag>
        </div>
        <div v-else>
          <el-tag type="info">无相关权限</el-tag>
        </div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <warning/>
            </el-icon>
            超级管理员权限
          </div>
        </template>
        <div v-if="userData['permission'].includes('*:*')">
          <el-tag>超级管理员</el-tag>
        </div>
        <div v-else>
          <el-tag type="info">无相关权限</el-tag>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {ElMessage} from "element-plus";

export default {
  name: "AccountInfoView",
  data() {
    return {
      userData: {
        permission: []
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let that = this
      axios({
        method: 'get',
        url: '/admin'
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          let data = respData['data']
          that.userData = {
            id: data['id'],
            username: data['username'],
            name: data['name'],
            email: data['email'],
            phone: data['phone'],
            department: data['department'],
            enableTotp: data['enable_totp'],
            createTime: moment(data['create_time']).format("YYYY-MM-DD HH:mm:ss"),
            permission: data['permission']
          }
        } else {
          ElMessage({
            message: '信息获取失败',
            type: 'error',
          })
        }
      })
    },
    logout() {
      let that = this
      that.$store.commit("setLogin", false)
      axios({
        method: 'get',
        url: 'http://localhost:8081/logout',
      }).finally(function () {
        that.$router.push("/index")
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
.tag {
  margin-right: 5px;
}
</style>

<style>
/* 本css经过label-class-name="label_25percent"引用，请勿删除 */
.label_25percent {
  width: 25%;
}
</style>
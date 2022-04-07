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
              <user-filled/>
            </el-icon>
            用户名
          </div>
        </template>
        test
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
        test
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
        13000000000
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
        test@test.com
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
        院系
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
              <key/>
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
        未设置
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
        2022/01/01 12:00
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
        <el-tag>发布/编辑新闻</el-tag>
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
        <el-tag type="info">无相关权限</el-tag>
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
        <el-tag type="info">无相关权限</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AccountInfoView",
  methods: {
    logout(){
      let that = this
      that.$store.commit("setLogin", false)
      axios({
        method: 'get',
        url: 'http://localhost:8081/logout',
      }).finally(function (){
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
</style>

<style>
/* 本css经过label-class-name="label_25percent"引用，请勿删除 */
.label_25percent {
  width: 25%;
}
</style>
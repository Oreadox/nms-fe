<template>
  <div>
    <el-table :data="userDataFilter" stripe style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }">
      <el-table-column prop="createTime" label="创建时间" width="180" sortable/>
      <el-table-column prop="username" label="用户名" width="120" sortable/>
      <el-table-column prop="name" label="姓名" width="120" sortable/>
      <el-table-column prop="department" label="院系" width="120" sortable/>
      <el-table-column label="权限">
        <template #default="scope">
          <div v-if="scope.row['permission'].length>0">
            <el-tag class="tag" v-if="scope.row['permission'].includes('news:newEdit')||
                                    scope.row['permission'].includes('*:*')">
              发布/编辑新闻
            </el-tag>
            <el-tag class="tag" v-if="scope.row['permission'].includes('news:check')||
                                    scope.row['permission'].includes('*:*')">
              审核新闻
            </el-tag>
            <el-tag class="tag" v-if="scope.row['permission'].includes('user:*')||
                                    scope.row['permission'].includes('*:*')">
              用户管理
            </el-tag>
            <el-tag class="tag" v-if="scope.row['permission'].includes('*:*')">
              超级管理员
            </el-tag>
          </div>
          <div v-else>
            <el-tag type="info">无管理权限</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #header>
          <el-input v-model="search" placeholder="搜索"/>
        </template>
        <template #default="scope">
          <el-popconfirm title="确定要重置密码吗？" icon-color="blue"
                         @confirm="resetPassword(scope.row['id'],scope.row['username'] )"
                         confirmButtonText="确定" cancelButtonText="取消">
            <template #reference>
              <el-button size="small" type="primary">重置密码</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确定要删除吗？" icon-color="red" @confirm="deleteUser(scope.row['id'])"
                         confirmButtonText="确定" cancelButtonText="取消">
            <template #reference>
              <el-button size="small" type="danger">删除用户</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "UserListView",
  data() {
    return {
      userData: [],
      search: ''
    }
  },
  computed: {
    userDataFilter: function () {
      if (this.search.length === 0) {
        return this.userData
      } else {
        return this.userData.filter((data) => {
          return data.username.includes(this.search) || data.name.includes(this.search) ||
              data.department.includes(this.search)
        })
      }
    },
  },
  created() {
    this.initData()
  },
  methods: {
    initData(){
      let that = this
      axios({
        method: 'get',
        url: '/admin/all'
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          let data = respData['data']
          data.forEach(function (admin) {
            that.userData.push({
              id: admin['id'],
              username: admin['username'],
              name: admin['name'],
              department: admin['department'],
              createTime: moment(admin['create_time']).format("YYYY-MM-DD HH:mm:ss"),
              permission: admin['permission']
            })
          })
        } else {
          ElMessage({
            message: '获取失败',
            type: 'error',
          })
        }
      })
    },
    resetPassword(id, username){
      let password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: id,
          password: password
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessageBox.alert(`用户${username}的密码已被重置为${password}，请及时通知该用户`, '修改成功', {
            confirmButtonText: '好的',
          })
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
        }
      })
    },
    deleteUser(id){
      axios({
        method: 'delete',
        url: '/admin',
        data: {
          id: id
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '删除成功',
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
.tag {
  margin-right: 2px;
  margin-bottom: 2px;
}
</style>
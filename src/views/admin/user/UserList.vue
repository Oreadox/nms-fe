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
          <div v-if="(typeof scope.row['permission'])==='object'&&scope.row['permission'].length>0">
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
          <div v-if="adminPermissions.includes('*:*')">
            <el-button size="small" type="primary"
                       @click="openPermissionDialog(scope.row['id'],scope.row['username'],scope.row['permission'])">
              赋予权限
            </el-button>
            <el-popconfirm title="确定要移除该用户权限吗？" icon-color="red"
                           @confirm="removeAllPermission(scope.row['id'])"
                           confirmButtonText="确定" cancelButtonText="取消">
              <template #reference>
                <el-button size="small" type="danger">移除权限</el-button>
              </template>
            </el-popconfirm>
            <div style="margin: 5px"></div>
          </div>
          <el-popconfirm title="确定要重置密码吗？" icon-color="blue"
                         @confirm="resetPassword(scope.row['id'],scope.row['username'])"
                         confirmButtonText="确定" cancelButtonText="取消">
            <template #reference>
              <el-button size="small" type="primary">重置密码</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="该用户发布的新闻将被一并删除，确定要删除该用户吗？" icon-color="red" @confirm="deleteUser(scope.row['id'])"
                         confirmButtonText="确定" cancelButtonText="取消">
            <template #reference>
              <el-button size="small" type="danger">删除用户</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title='title' v-model="openDialog" :width="640">
      <el-form label-width="60px">
        <el-form-item label="权限">
          <el-checkbox-group v-model="currentUserPermission">
            <el-checkbox label="news:newEdit">发布/编辑新闻</el-checkbox>
            <el-checkbox label="news:check">审核新闻</el-checkbox>
            <el-checkbox label="user:*">用户管理</el-checkbox>
            <el-tooltip placement="bottom" effect="light" content="包含前述所有权限">
              <el-checkbox label="*:*">超级管理员</el-checkbox>
            </el-tooltip>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitPermission(currentUserId, currentUsername, currentUserPermission)">
            提交
          </el-button>
          <el-button @click="openDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      adminPermissions: [],
      userData: [],
      search: '',
      currentUserId: '',
      currentUsername: '',
      currentUserPermission: [],
      openDialog: false,
    }
  },
  computed: {
    title: function () {
      return `请选择用户${this.currentUsername}的权限`
    },
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
    this.adminPermissions = this.$store.state.permission
    this.initData()
  },
  methods: {
    initData() {
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
            // console.log(admin['permission'])
          })

        } else {
          ElMessage({
            message: '获取失败',
            type: 'error',
          })
        }
      })
    },
    openPermissionDialog(id, username, permission) {
      this.currentUserId = id
      this.currentUsername = username
      this.currentUserPermission = permission != null ? permission.slice() : []
      this.openDialog = true
    },
    submitPermission(id, username, permission){
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: id,
          permission: permission
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '更改成功',
            type: 'success',
          })
          that.openDialog = false
          that.userData = []
          that.initData()
          ElMessageBox.alert(`用户${username}的权限设置成功，该用户可能需要重新登录才能获取权限，请及时通知`, '修改成功', {
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
    resetPassword(id, username) {
      let password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: id,
          password: password,
          enable_totp: false
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessageBox.alert(
              `用户${username}的密码已被重置为${password}，若启用了两步验证，其也被一并关闭，请及时通知该用户`, '修改成功', {
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
    deleteUser(id) {
      axios({
        method: 'delete',
        url: `/admin/${id}`
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
    },
    removeAllPermission(id) {
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: id,
          permission: []
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '移除成功',
            type: 'success',
          })
          that.userData = []
          that.initData()
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
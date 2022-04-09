<template>
  <div>
    <el-form label-width="0" class="form">
      <el-descriptions title="密码修改" :column="1" size="large" border>
        <template #extra>
          <el-form-item>
            <el-button type="primary" @click="changePassword">提交密码修改</el-button>
          </el-form-item>
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
          <el-form-item>
            <el-input v-model="passwordItem.password" class="input"
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
            <el-input v-model="passwordItem.passwordCheck" class="input"
                      placeholder="请再次输入密码" type="password"></el-input>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </div>
  <div style="margin-top: 25px">
    <el-descriptions title="两步验证" :column="1" size="large" border>
      <template #extra>
        <el-button type="primary" @click="enableTotp" v-if="!totpItem.enabled">打开两步验证</el-button>
        <el-button type="danger" @click="disableTotp" v-else>关闭两步验证</el-button>
      </template>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <document/>
            </el-icon>
            功能介绍
          </div>
        </template>
        <div>
          系统支持基于时间戳算法的一次性密码（TOTP），其能大大加强账号的安全性。
          开启该功能后，生成的共享密钥会在下方显示，并且提供二维码方便手机app扫描
          （<b>仅显示一次</b>，请不要在保存密钥前刷新页面），并且登录时需要提供一次性密码，否则不能成功登录。
          您开启后在登录状态下能够随时关闭该功能。
        </div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <setting/>
            </el-icon>
            当前状态
          </div>
        </template>
        <div v-if="!totpItem.enabled">未设置</div>
        <div v-else>已设置</div>
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent" v-if="openKeyItem">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <key/>
            </el-icon>
            密钥
          </div>
        </template>
        {{ totpItem.key }}
      </el-descriptions-item>
      <el-descriptions-item label-class-name="label_25percent" v-if="openKeyItem">
        <template #label>
          <div class="cell-item">
            <el-icon>
              <postcard/>
            </el-icon>
            密钥二维码
          </div>
        </template>
        <div class="qrcode" id="qrcode" ref="qrcode"/>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "ChangeSecurityInfoView",
  data() {
    return {
      id: '',
      passwordItem: {
        password: "",
        passwordCheck: "",
      },
      totpItem: {
        enabled: false,
        key: "",
      },
      openKeyItem: false
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
          that.id = data['id']
          that.totpItem.enabled = data['enable_totp']
        } else {
          ElMessage({
            message: '信息获取失败',
            type: 'error',
          })
        }
      })
    },
    enableTotp() {
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: that.id,
          enable_totp: true
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '启用成功',
            type: 'success',
          })
          that.totpItem.enabled = true
          that.totpItem.key = respData['data']['totp']
          that.generateQrcode()
          that.openKeyItem = true
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
        }
      })
    },
    disableTotp() {
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: that.id,
          enable_totp: false
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '关闭成功',
            type: 'success',
          })
          that.totpItem.enabled = false
          that.totpItem.key = ''
          that.openKeyItem = false
        } else {
          ElMessage({
            message: respData['message'],
            type: 'error',
          })
        }
      })
    },
    generateQrcode() {
      this.$nextTick(() => {
        let that = this
        this.totpItem.qrcode = new QRCode(this.$refs.qrcode, {
          text: `otpauth://totp/nms?secret=${that.totpItem.key}`,
          width: 200,
          height: 200,
          render: 'canvas'
        })
      })
    },
    changePassword() {
      if (this.passwordItem.password.trim() === '' || this.passwordItem.passwordCheck.trim() === '') {
        ElMessage({
          message: '密码不能为空',
          type: 'error',
        })
        return
      }
      if (this.passwordItem.password !== this.passwordItem.passwordCheck) {
        ElMessage({
          message: '两次密码不一致',
          type: 'error',
        })
        return
      }
      let that = this
      axios({
        method: 'put',
        url: '/admin',
        data: {
          id: that.id,
          password: that.passwordItem.password
        }
      }).then(function (response) {
        var respData = response['data']
        if (Boolean(respData['status']) === true) {
          ElMessage({
            message: '修改成功',
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

.form >>> .el-form-item--default {
  margin-bottom: 0;
}

.qrcode {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: #fff;
}
</style>

<style>
/* 本css经过label-class-name="label_25percent"引用，请勿删除 */
.label_25percent {
  width: 25%;
}
</style>
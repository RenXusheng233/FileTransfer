<template>
  <div class="connect-service-wrapper">
    <el-form :model="serviceParams">
      <el-form-item label="主机" prop="host">
        <el-input size="mini" v-model="serviceParams.host"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input size="mini" v-model="serviceParams.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input size="mini" v-model="serviceParams.password"></el-input>
      </el-form-item>
      <el-form-item label="端口" prop="port">
        <el-input size="mini" v-model="serviceParams.port"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="connectToService">连接</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'connectService',
  data() {
    return {
      serviceParams: {
        host: '', // 主机
        username: '', // 用户名
        password: '', // 密码
        port: '', // 端口
      },
    }
  },
  methods: {
    connectToService() {
      // 将所填的参数传递到主进程中处理
      this.$electron.ipcRenderer.send('remote-service-params', this.serviceParams)
    },
  },
}
</script>

<style lang="less" scoped>
.connect-service-wrapper {
  margin-left: 10px;
  .el-form {
    display: flex;

    .el-input {
      width: 60%;
    }
  }
}
</style>

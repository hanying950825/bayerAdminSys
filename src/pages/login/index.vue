<template>
  <el-main class="main">
    <div class="container">
      <img src="../../assets/img/icon.jpg" alt="" class="avatar">
      <h1>拜尔科技商品管理系统</h1>
      <el-input placeholder="请输入手机号" v-model="user" class="input-login">
        <i slot="prefix" class="el-input__icon el-icon-phone-outline"></i>
      </el-input>
      <el-input placeholder="请输入密码" v-model="password"  class="input-login">
        <i slot="prefix" class="el-input__icon el-icon-view"></i>
      </el-input>
      <el-button type="success" @click="onLogin" class="login">登录</el-button>
    </div>
  </el-main>
</template>

<script>
import { mapMutations } from 'vuex'
// import { storage } from './../../utils/storage'

export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    onLogin () {
      // if (!this.user || !/^1[0-9][0-9]{9}$/.test(this.user)) {
      //   this.$message({
      //     message: '请输入正确的11位手机号',
      //     type: 'error'
      //   })
      //   return
      // }
      // if (!this.password.trim()) {
      //   this.$message({
      //     message: '请输入密码',
      //     type: 'error'
      //   })
      //   return
      // }
      console.log('登录一下')
      this.$router.push('/')
    }
  }
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login_bg.jpg') no-repeat center center;
}
.container {
  width: 30%;
  margin:5% auto;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 75px;
}
.container h1 {
  color: #fff;
}
.input-login {
  width: 100%;
  display: block;
  margin-bottom: 30px;
}
.login {
  width: 100%;
  font-size: 20px;
}
</style>

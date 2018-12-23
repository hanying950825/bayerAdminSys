<template>
  <el-container style="height: 100%;">
    <!-- 侧边栏 -->
    <el-aside class="app-aside">
      <h1>拜尔科技管理后台</h1>
      <el-menu :default-active="pagedefault" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-goods"></i>
            <span>商品</span>
          </template>
          <el-menu-item index="/shops">商品管理</el-menu-item>
          <el-menu-item index="1-2">分类管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-mobile-phone"></i>
            <span slot="title">广告</span>
          </template>
          <el-menu-item index="2-1">广告管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-mobile-phone"></i>
            <span slot="title">推荐</span>
          </template>
          <el-menu-item index="3-1">推荐管理</el-menu-item>
          <el-menu-item index="3-2">热销管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span slot="title">订单</span>
          </template>
          <el-menu-item index="4-1">订单管理</el-menu-item>
          <el-menu-item index="4-2">退款退货</el-menu-item>
          <el-menu-item index="4-3">发货管理</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-phone-outline"></i>
            <span slot="title">用户</span>
          </template>
          <el-menu-item index="5-1">用户管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部导航 -->
      <el-header class="app-header">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="isShowModel=true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="onLogOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dialog title="修改密码" :visible.sync="isShowModel" width="30%" center>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
            <el-form-item label="原密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-dialog>
      </el-header>
      <!-- 主体内容 -->
      <el-main class="app-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(value)) {
        callback(new Error('请输入8到16位密码,其中包含字母和数字结合'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userName: 'admin',
      isShowModel: false,
      pagedefault: '/',
      ruleForm: {
        pass: '',
        newPass: '',
        checkPass: ''
      },
      urls: [
        '/src/pages/shops'
      ],
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogOut () {
      console.log(31321312)
      this.$router.push('/login')
    },

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.app-aside {
  background: #545c64;
}
.app-aside h1 {
  color: #fff;
  text-align: center;
}
.app-header {
  text-align: right;
  font-size: 12px;
  line-height: 60px;
  background: #fff;
}
.app-main {
  height: 100%;
  padding: 10px;
}
.el-menu {
  border: 0;
}
</style>

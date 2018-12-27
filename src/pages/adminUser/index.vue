<template>
  <div class="shops-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="后台账号列表"
      :tbody="tbody"
      :thead="thead"
      :total="totalPage"
      :current="oParams.pageNo"
      :isShowOperation="true"
      :btns="abtns"
      :onAdd="true"
      @on-page="onChangePage"
      @on-add="onAddAdmin"
      @on-delete="onDeleteAdmin"
      @on-look="onLookAdmin">
    </w-table-list>
      <!-- 新增 -->
    <el-dialog title="新增账号" :visible.sync="dialogTableVisible" width="50%">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="姓名" prop="adminName">
          <el-input type="text" v-model="ruleForm.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="adminPhone">
          <el-input type="text" v-model="ruleForm.adminPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPass">
          <el-input type="text" v-model="ruleForm.adminPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitForm('ruleForm')">提交</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="isShowModel" width="50%" center>
      <el-form :model="passRuleForm" status-icon :rules="passRules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
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
        <el-button type="primary" @click="onSubmitPass('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }

    const valideUserPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!/^[0-9a-zA-Z]+$/.test(value)) {
        callback(new Error('请输入正确密码'))
      } else {
        callback()
      }
    }

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
      // 搜索框显示/选项
      siftParams: [
        {
          name: 'name',
          value: '',
          filterType: 'number',
          inputLength: 30,
          holder: '手机号'
        }
      ],
      // 表头
      thead: [
        {
          title: '序号',
          key: 'index',
          width: 60
        },
        {
          title: '姓名',
          key: 'adminName'
        },
        {
          title: '手机号',
          key: 'phone'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          adminName: '朱',
          phone: '18888888888'
        },
        {
          index: 2,
          adminName: '朱',
          phone: '18888888888'
        }
      ],
      // 按钮
      abtns: [
        {
          title: '修改密码'
        },
        {
          title: '删除'
        }
      ],
      // 总条数
      totalPage: 10,
      // 是否显示model
      dialogTableVisible: false,
      isShowModel: false,
      // 页面相关传输后台数据
      oParams: {
        pageSize: 10,
        pageNo: 1
      },
      // 新建内容
      ruleForm: {
        adminName: '',
        adminPhone: '',
        adminPass: ''
      },
      passRuleForm: {
        pass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        adminName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        adminPhone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        adminPass: [
          { required: true, validator: valideUserPass, trigger: 'blur' }
        ]
      },
      passRules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 富文本编辑器内容保存
    updateData (value) {
      this.ruleForm.details = value
    },

    // 搜索按钮点击后，发送请求
    onSearchSubmit (opt) {
      console.log(opt)
    },

    // 点击不同page切换内容
    onChangePage (opt) {
      console.log(32111)
    },

    // 新增商品
    onAddAdmin () {
      console.log(31231)
      this.dialogTableVisible = true
    },

    // 删除商品
    onDeleteAdmin (row) {
      console.log(row)
      this.$confirm('是否要删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 修改商品
    onLookAdmin (row) {
      console.log(row)
      this.isShowModel = true
      // 利用返回表格中的id发送数据到后台查询当前的数据
    },

    // 提交
    onSubmitForm (rule) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(31232)
        }
      })
    },
    // 修改密码提交
    onSubmitPass (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  watch: {
    dialogTableVisible () {
      !this.dialogTableVisible && this.$refs['ruleForm'].resetFields()
    },
    isShowModel () {
      !this.isShowModel && this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style>
  .shops-main {
    background: #fff;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>

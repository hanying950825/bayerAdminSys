<template>
  <div class="shops-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="商品列表"
      :tbody="tbody"
      :thead="thead"
      :total="totalPage"
      :current="oParams.pageNo"
      :isShowOperation="true"
      :btns="abtns"
      :onAdd="true"
      @on-page="onChangePage"
      @on-add="onAddShops"
      @on-delete="onDeleteShops"
      @on-click="onEditShops">
    </w-table-list>
      <!-- 新增/修改 -->
    <el-dialog title="新增商品" :visible.sync="dialogTableVisible">
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
        <el-form-item label="商品名称" prop="shopName">
          <el-input type="text" v-model="ruleForm.shopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input type="text" v-model="ruleForm.marketPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input type="text" v-model="ruleForm.retailPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input type="text" v-model="ruleForm.spec" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="一级分类" prop="spec">
          <el-select v-model="ruleForm.topCategory" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in topList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" prop="spec">
          <el-select v-model="ruleForm.secondCategoryy" placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in secList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input type="text" v-model="ruleForm.stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="details">
          <vue-html5-editor :content="ruleForm.details" @change="updateData" :height="300"></vue-html5-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueHtml5Editor from 'vue-html5-editor'

Vue.use(VueHtml5Editor, {
  name: 'vue-html5-editor',
  language: 'zh-cn',
  hiddenModules: [
    'info', 'unlink', 'tabulation', 'image', 'full-screen', 'link', 'list'
  ],
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    font: 'fa fa-font',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'el-icon-picture',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    info: 'fa fa-info'
  },
  // 配置图片模块
  image: {
    // 文件最大体积，单位字节
    sizeLimit: 512 * 1024 * 10,
    // 上传参数,默认把图片转为base64而不上传
    // upload config,default null and convert image to base64
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    // 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
    // width和height是文件的最大宽高
    compress: {
      width: 600,
      height: 600,
      quality: 80
    }
    // 响应数据处理,最终返回图片链接
    //     uploadHandler(responseText){
    // //      default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
    //       var json = JSON.parse(responseText)
    //       if(json.status == 200){
    //           return json.data
    //       }else{
    //           alert(json.error)
    //       }
    // }
  }
})

export default {

  data () {
    // 价格验证
    const validatePrice = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入价格'))
      } else if (!/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(value)) {
        callback(new Error('请输入正确的价格，最多两位小数'))
      } else {
        callback()
      }
    }

    const validatestock = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入库存'))
      } else if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
        callback(new Error('请输入正整数'))
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
          inputLength: 30,
          holder: '商品名称'
        }, {
          name: 'phone',
          type: 'datetimerange',
          value: '',
          inputLength: 30,
          holder: '时间'
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
          title: '名称',
          key: 'name'
        },
        {
          title: '规格',
          key: 'size'
        },
        {
          title: '市场价',
          key: 'marketPrice'
        },
        {
          title: '零售价',
          key: 'retailPrice'
        },
        {
          title: '规格',
          key: 'spec'
        },
        {
          title: '一级分类',
          key: 'topCategory'
        },
        {
          title: '二级分类',
          key: 'secondCategory'
        },
        {
          title: '库存',
          key: 'stock'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          name: 3211,
          size: 1321,
          marketPrice: 100,
          retailPrice: 100,
          spec: '台',
          topCategory: 12213,
          secondCategory: 312,
          stock: 111
        },
        {
          index: 1,
          name: 3211,
          size: 1321,
          marketPrice: 100,
          retailPrice: 100,
          spec: '台',
          topCategory: 12213,
          secondCategory: 312,
          stock: 111
        }
      ],
      // 按钮
      abtns: [
        {
          title: '编辑'
        },
        {
          title: '删除'
        }
      ],
      // 下拉框选项/一级
      topList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 二级选项
      secList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 总条数
      totalPage: 10,
      // 是否显示model
      dialogTableVisible: false,
      // 页面相关传输后台数据
      oParams: {
        pageSize: 10,
        pageNo: 1
      },
      // 新建内容
      ruleForm: {
        shopName: '',
        marketPrice: '',
        retailPrice: '',
        topCategory: '',
        secondCategory: '',
        spec: '',
        stock: '',
        details: ''
      },
      rules: {
        shopName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        marketPrice: [
          { required: true, validator: validatePrice, trigger: 'blur' }
        ],
        retailPrice: [
          { required: true, validator: validatePrice, trigger: 'blur' }
        ],
        topCategory: [
          { required: true, message: '请选择一级标题', trigger: 'blur' }
        ],
        secondCategory: [
          { required: true, message: '请选择二级标题', trigger: 'blur' }
        ],
        spec: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ],
        stock: [
          { required: true, validator: validatestock, trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请输入商品详情', trigger: 'blur' }
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

    },

    // 新增商品
    onAddShops () {
      this.dialogTableVisible = true
    },

    // 删除商品
    onDeleteShops (row) {
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
    onEditShops (row) {
      console.log(row)
      this.dialogTableVisible = true
      // 利用返回表格中的id发送数据到后台查询当前的数据
    },

    // 提交
    submitForm (rule) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(31232)
        }
      })
    }
  },
  watch: {
    dialogTableVisible () {
      !this.dialogTableVisible && this.$refs['ruleForm'].resetFields()
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
  .el-dialog {
    margin: 20px auto !important;
  }
</style>

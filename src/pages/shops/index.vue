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
      @on-click="onEditShops"
      @on-look="onBannerPic">
    </w-table-list>

    <!-- 新增/修改 -->
    <el-dialog title="新增商品" :visible.sync="dialogTableVisible" class="add-shops">
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
        <el-form-item label="设为推荐" prop="recommend">
          <el-radio v-model="ruleForm.recommend" label="1">是</el-radio>
          <el-radio v-model="ruleForm.recommend" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="设为热销" prop="hotSale">
          <el-radio v-model="ruleForm.hotSale" label="1">是</el-radio>
          <el-radio v-model="ruleForm.hotSale" label="2">否</el-radio>
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
          <vue-html5-editor :content="ruleForm.details" @change="updateData" :height="200"></vue-html5-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitForm('ruleForm')">提交</el-button>
        <el-button @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 轮播图 -->
    <el-dialog title="轮播图" :visible.sync="dialogListVisible" width="50%">
      <p class="banner-tip" v-if="bannerTbody.length > 5">上传的图片数量不能大于五张!</p>
      <w-table-list
        title="轮播图列表"
        :tbody="bannerTbody"
        :thead="bannerThead"
        :total="bannerTotalPage"
        :current="params.pageNo"
        :isShowOperation="true"
        :btns="bannerAbtns"
        :onAdd="true"
        @on-add="onAddBanner"
        @on-delete="onDeleteBanner">
      </w-table-list>
      <input type="file" class="file-upload" accept="image/gif,image/jpeg,image/jpg,image/png" ref="fileEl" @change="onChangeFile" />
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
          name: 'shops',
          value: '',
          inputLength: 30,
          holder: '商品名称'
        }, {
          name: 'time',
          type: 'datetimerange',
          value: '',
          holder: '时间'
        }
      ],
      // 轮播表头
      bannerThead: [
        {
          title: '序号',
          key: 'index',
          width: 60
        },
        {
          title: '图片地址',
          key: 'url'
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
        },
        {
          title: '是否推荐',
          key: 'isRecommend'
        },
        {
          title: '是否热销',
          key: 'isHotSale'
        }
      ],
      // 轮播主体内容
      bannerTbody: [
        {
          index: 1,
          url: 'http://xxxxxxxxxxx'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          name: 3211,
          size: '台',
          marketPrice: 100,
          retailPrice: 100,
          topCategory: 12213,
          secondCategory: 312,
          stock: 111,
          isRecommend: '是',
          isHotSale: '是'
        },
        {
          index: 1,
          name: 3211,
          size: '台',
          marketPrice: 100,
          retailPrice: 100,
          topCategory: 12213,
          secondCategory: 312,
          stock: 111,
          isRecommend: '是',
          isHotSale: '是'
        }
      ],
      // 轮播按钮
      bannerAbtns: [
        {
          title: '删除'
        }
      ],
      // 按钮
      abtns: [
        {
          title: '编辑'
        },
        {
          title: '轮播图'
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
      // 轮播最大条数
      bannerTotalPage: 5,
      // 总条数
      totalPage: 10,
      // 是否显示model
      dialogTableVisible: false,
      dialogListVisible: false,
      // 页面相关传输后台数据
      oParams: {
        pageSize: 10,
        pageNo: 1
      },
      // 轮播弹窗数据
      params: {
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
        recommend: null,
        hotSale: null,
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
        recommend: [
          { required: true, message: '请选择是否推荐', trigger: 'blur' }
        ],
        hotSale: [
          { required: true, message: '请选择是否热销', trigger: 'blur' }
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

    onAddBanner () {
      if (this.bannerTbody.length < 5) {
        this.$refs.fileEl.click()
      } else {
        this.$message.error('已经达到五张啦,不能再上传啦!')
      }
    },

    onBannerPic (row) {
      // this.params.id
      this.dialogListVisible = true
    },

    onChangeFile (ev) {
      const oFile = ev.target.files[0]
      if (!oFile) {
        this.$message.error('请选择需要上传的图片')
        return false
      }
      // this._uploadFileToOSS(oFile)
    },

    // 提交
    onSubmitForm (rule) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(31232)
        }
      })
    },

    // 删除轮播
    onDeleteBanner (row) {
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
  .add-shops .el-dialog {
    margin: 20px auto !important;
  }
  .add-shops .el-dialog__body {
    padding: 20px;
  }
  .banner-tip {
    color: red;
    padding: 10px;
  }
  .file-upload {
    margin-left: -9999px;
    opacity: 0;
  }
</style>

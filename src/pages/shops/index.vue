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
      @on-look="onLookShops">
    </w-table-list>
      <!-- 新增/修改 -->
    <el-dialog title="新增商品" :visible.sync="dialogTableVisible" class="add-shops">
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
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
        <el-form-item label="库存" prop="stock">
          <el-input type="text" v-model="ruleForm.stock" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="details">
          <vue-html5-editor :content="ruleForm.details" @change="updateData" :height="300"></vue-html5-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          title: '价格',
          key: 'price'
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
          price: 100,
          topCategory: 12213,
          secondCategory: 312,
          stock: 111
        },
        {
          index: 1,
          name: 3211,
          size: 1321,
          price: 100,
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
          title: '查看'
        },
        {
          title: '删除'
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
        spec: '',
        stock: '',
        details: ''
      }
    }
  },
  methods: {
    updateData () {},
    onSearchSubmit (opt) {
      console.log(opt)
      console.log(231)
    },
    onChangePage (opt) {
      console.log(32111)
    },
    onAddShops () {
      console.log(31231)
      this.dialogTableVisible = true
    },
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
    onEditShops (row) {
      console.log(row)
    },
    onLookShops (row) {}
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
  .add-shops {
    margin-top: 5vh;
  }
</style>

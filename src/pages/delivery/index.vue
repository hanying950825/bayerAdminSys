<template>
  <div class="shops-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="待发货列表"
      :tbody="tbody"
      :thead="thead"
      :total="totalPage"
      :current="oParams.pageNo"
      :isShowOperation="true"
      :btns="abtns"
      :onAdd="false"
      @on-page="onChangePage"
      @on-look="onLook">
    </w-table-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索框显示/选项
      siftParams: [
        {
          name: 'phone',
          value: '',
          filterType: 'number',
          inputLength: 30,
          holder: '手机号'
        },
        {
          name: 'orderNum',
          value: '',
          inputLength: 30,
          holder: '订单编号'
        }
      ],
      // 表头
      thead: [
        {
          title: '序号',
          key: 'index',
          width: 50
        },
        {
          title: '订单编号',
          key: 'orderNum'
        },
        {
          title: '商品',
          key: 'shops'
        },
        {
          title: '商品件数',
          key: 'shopsNum',
          width: 80
        },
        {
          title: '规格',
          key: 'spec'
        },
        {
          title: '收件人',
          key: 'addressee',
          width: 80
        },
        {
          title: '手机号',
          key: 'phone',
          width: 120
        },
        {
          title: '收货地址',
          key: 'receivingAddress'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          orderNum: '123213123123',
          shops: '我是商品标题',
          shopsNum: 1,
          spec: '432321',
          addressee: '张三',
          phone: '13888888888',
          receivingAddress: 'xxxxxxxxxxxxxx'
        },
        {
          index: 2,
          orderNum: '123213123123',
          shops: '我是商品标题',
          shopsNum: 1,
          spec: '432321',
          addressee: '张三',
          phone: '13888888888',
          receivingAddress: 'xxxxxxxxxxxxxx'
        }
      ],
      // 按钮
      abtns: [
        {
          title: '发货'
        }
      ],
      // 总条数
      totalPage: 10,
      // 是否显示model
      dialogFormVisible: false,
      // 页面相关传输后台数据
      oParams: {
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  methods: {
    // 搜索按钮点击后，发送请求
    onSearchSubmit (opt) {
      console.log(opt)
    },

    // 点击不同page切换内容
    onChangePage (opt) {
      console.log(32111)
    },

    onLook (row) {
      console.log(row)
      this.$prompt('请输入物流单号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z0-9]+$/,
        inputErrorMessage: '物流单号格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的物流单号是: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
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
  dl {
    font-size: 14px;
    overflow: hidden;
    padding: 5px 20px;
  }
  dt {
    display: inline-block;
    width: 30%;
    font-weight: 600;
    text-align: right;
    margin-right: 20px;
  }
  dd {
    display: inline-block;
  }
</style>

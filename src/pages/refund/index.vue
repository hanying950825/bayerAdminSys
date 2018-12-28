<template>
  <div class="shops-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="退货退款列表"
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
          title: '价格',
          key: 'price',
          width: 80
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
        },
        {
          title: '退款原因',
          key: 'refundReason',
          width: 80
        },
        {
          title: '状态',
          key: 'status',
          width: 70
        },
        {
          title: '物流单号',
          key: 'logisticsNumber'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          orderNum: '123213123123',
          shops: '我是商品标题',
          shopsNum: 1,
          price: '432321',
          addressee: '张三',
          phone: '13888888888',
          receivingAddress: 'xxxxxxxxxxxxxx',
          refundReason: '质量原因',
          status: '待退款',
          logisticsNumber: '1231231'
        },
        {
          index: 2,
          orderNum: '123213123123',
          shops: '我是商品标题',
          shopsNum: 1,
          price: '432321',
          addressee: '张三',
          phone: '13888888888',
          receivingAddress: 'xxxxxxxxxxxxxx',
          refundReason: '拍错了',
          status: '待发货',
          logisticsNumber: '-'
        }
      ],
      // 按钮
      abtns: [
        {
          title: '处理'
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
      if (row.status === '待处理') {
        this.$confirm('是否同意该退货退款请求?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已同意!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '不同意'
          })
        })
      } else if (row.status === '待发货') {
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
      } else if (row.status === '待退款') {
        this.$confirm('是否同意退款到对方微信账户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已同意!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '不同意'
          })
        })
      }
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

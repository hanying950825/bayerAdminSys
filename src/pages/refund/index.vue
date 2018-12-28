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
    <!-- 处理退货退款 -->
    <el-dialog title="处理" :visible.sync="dialogFormVisible">

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
          width: 70
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
      orderDetail: {},
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
      this.dialogFormVisible = true
      this.orderDetail = row
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

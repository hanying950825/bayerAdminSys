<template>
  <div class="user-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="推荐列表"
      :tbody="tbody"
      :thead="thead"
      :total="totalPage"
      :current="oParams.pageNo"
      :isShowOperation="true"
      :btns="abtns"
      :onAdd="false"
      @on-page="onChangePage"
      @on-delete="onDelete">
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
          title: '库存',
          key: 'spec'
        },
        {
          title: '开始时间',
          key: 'startTime'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          name: '我是商品',
          size: '台',
          price: '22222',
          spec: 321,
          startTime: '2018-2-1 18:00'
        },
        {
          index: 2,
          name: '我是商品',
          size: '台',
          price: '22222',
          spec: 321,
          startTime: '2018-2-1 18:00'
        }
      ],
      // 总条数
      totalPage: 10,
      abtns: [
        {
          title: '删除'
        }
      ],
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
      console.log(231)
    },

    // 点击不同page切换内容
    onChangePage (opt) {
      console.log(32111)
    },
    // 删除推荐
    onDelete (row) {
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
  }
}
</script>

<style>
  .user-main {
    background: #fff;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>

<template>
  <div class="shops-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list title="商品列表"
      :thead="thead"
      :tbody="tbody"
      :btns="abtns"
      :total="totalPage"
      :current="oParams.pageNo"
      @on-page="onChangePage">
    </w-table-list>
      <!-- 新增按钮 -->
      <div>
        <el-button size="small" type="primary" @click="onAdd" class="add-page">新增</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      siftParams: [
        {
          name: 'phone',
          value: '',
          inputLength: 30,
          filterType: 'number',
          holder: '完整手机号'
        }, {
          name: 'phone',
          type: 'datetimerange',
          value: '',
          inputLength: 30,
          holder: '时间'
        }
      ],
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
      tbody: [],
      abtns: [],
      totalPage: 10,
      oParams: {}
    }
  },
  methods: {
    onSearchSubmit () {
      console.log(231)
    },
    onChangePage () {
      console.log(32111)
    },
    onAdd () {
      console.log(3212213)
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
  .add-page {
    position: fixed;
    top: 160px;
    right: 50px;
  }
</style>

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
      @on-delete="onDeleteShops"
      @on-click="onEditShops"
      @on-look="onLookShops">
    </w-table-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      totalPage: 10,
      oParams: {
        pageSize: 10,
        pageNo: 1
      }
    }
  },
  methods: {
    onSearchSubmit () {
      console.log(231)
    },
    onChangePage () {
      console.log(32111)
    },
    onAddList () {
      console.log(3212213)
    },
    onDeleteShops (row) {
      console.log(row)
    },
    onEditShops (row) {},
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
  /* .add-page {
    position: fixed;
    top: 160px;
    right: 50px;
  } */
</style>

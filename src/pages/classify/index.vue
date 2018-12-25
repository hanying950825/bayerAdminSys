<template>
  <div class="shops-main">
    <!-- 列表主体 -->
    <w-table-list title="商品分类"
      :thead="thead"
      :tbody="tbody"
      :btns="abtns"
      :total="totalPage"
      :current="oParams.pageNo"
      :onAdd="true"
      @on-page="onChangePage"
      @on-add="onAddList">
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
          title: '一级分类',
          key: 'topCategory'
        }
      ],
      tbody: [
        {
          index: 1,
          topCategory: '音响',
          action: '添加'
        },
        {
          index: 2,
          topCategory: '灯光',
          action: '添加'
        }
      ],
      abtns: [
        {
          title: '删除'
        }
      ],
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
    onAddList () {
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
  /* .add-page {
    position: fixed;
    top: 160px;
    right: 50px;
  } */
</style>

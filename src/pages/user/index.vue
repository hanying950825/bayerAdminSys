<template>
  <div class="user-main">
    <!-- 搜索 -->
    <w-sift-form
      :options="siftParams"
      @on-submit="onSearchSubmit">
    </w-sift-form>
    <!-- 列表主体 -->
    <w-table-list
      title="用户列表"
      :tbody="tbody"
      :thead="thead"
      :total="totalPage"
      :current="oParams.pageNo"
      :isShowOperation="false"
      :onAdd="false"
      @on-page="onChangePage">
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
          name: 'name',
          value: '',
          inputLength: 30,
          holder: '手机号'
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
          title: '用户名',
          key: 'userName'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      // 主体内容
      tbody: [
        {
          index: 1,
          userName: '朱',
          phone: '18888888888',
          address: 'xxxxxxxxxxxxxxx'
        },
        {
          index: 2,
          userName: '朱',
          phone: '18888888888',
          address: 'xxxxxxxxxxxxxxx'
        }
      ],
      // 总条数
      totalPage: 10,
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

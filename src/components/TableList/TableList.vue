<template>
  <el-card class="m-table-list" :dis-hover="true">
    <div slot="header" class="clearfix">
      <p slot="title" class="title">{{title}}</p>
      <el-button size="small" type="primary" @click="onAdd" class="add-page" style="float: right" v-if="onAdd" v-bind:click="onAddList">新增</el-button>
    </div>
    <el-table border :data="datas">
      <el-table-column v-for="(item, index) in columns" :prop="item.key" :label="item.title" :key="index">
      </el-table-column>
      <el-table-column prop="operation" label="操作" v-if="isShowOperation">
        <template slot-scope="scope">
        <el-button
          v-for="(item, index) in btns"
          :key="index"
          @click.native.prevent="item.click"
          type="text"
          size="small">
          {{item.title}}
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination v-if="total" :total="total" :current="current" @on-change="onChange" show-elevator show-total class="pagination"></el-pagination>
  </el-card>
</template>

<script>
export default {
  props: {
    title: String,
    thead: Array,
    btns: Array,
    tbody: Array,
    total: Number,
    current: Number,
    onAdd: Boolean,
    isShowOperation: Boolean
  },
  data () {
    return {
      columns: [],
      datas: [],
      aBtns: []
    }
  },
  created () {
    this.datas = this.tbody
    this._handleOperate()
  },
  methods: {
    _handleOperate () {
      this.columns = this.thead
    },
    onChange (page) {
      this.$emit('on-page', page)
    },

    onAddList () {
      this.$emit('on-add')
    }
  },
  watch: {
    tbody (newVal, oldVal) {
      this.datas = this.tbody
    },
    btns (newVal, oldVal) {
      this._handleOperate()
    }
  }
}
</script>

<style>
.title {
  display: inline-block;
}
.pagination {
  margin-top: 10px;
}
</style>

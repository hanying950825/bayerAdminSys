<template>
  <el-card class="m-table-list" :dis-hover="true">
    <div slot="header" class="clearfix">
      <p slot="title" class="title">{{title}}</p>
      <el-button size="small" type="primary" @click="onAdd" class="add-page" style="float: right" v-if="onAdd" v-bind:click="onAddList">新增</el-button>
    </div>
    <el-table border :data="datas">
      <el-table-column v-for="(item, index) in columns" :prop="item.key" :label="item.title" :key="index">
      </el-table-column>
    </el-table>
    <el-pagination v-if="total" :total="total" :current="current" @on-change="onChange" show-elevator show-total></el-pagination>
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
    onAdd: Boolean
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
      this.aBtns = this.$store.getters.privilege === 0 ? (this.btns || []).filter(item => item.exist) : this.btns
      if (this.aBtns && this.aBtns.length) {
        const btnWidth = this.aBtns.map(item => item.title).join('').length * 30
        const oBtn = {
          title: '操作',
          key: 'action',
          width: btnWidth,
          align: 'center',
          render: (h, {row, column, $index}) => {
            return h('div', this._createBtns(h, row))
          }
        }
        this.columns = [...this.thead, oBtn]
      } else {
        this.columns = this.thead
      }
    },
    _createBtns (h, params) {
      return this.btns.map((item, index) => {
        return (
          h('el-button', {
            props: {
              type: item.title === '删除' ? 'error' : 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                if (item.title === '删除') {
                  return
                }
                item.click && item.click(item.target, params)
              }
            }
          }, item.title)
        )
      })
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
</style>

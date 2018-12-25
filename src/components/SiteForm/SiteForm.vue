<template>
  <el-form ref="siftForm" inline class="m-sift-form">
    <slot></slot>
    <el-form-item v-for="(item, index) in options" :key="index">
      <!-- 时间选择 -->
      <el-date-picker
        v-if="item.type === 'datetimerange'"
        type="datetimerange"
        :start-placeholder="`请选择开始${item.holder}`"
        :end-placeholder="`请选择结束${item.holder}`"
        v-model="item.value"
        @on-change="onChangeDatetimer($event, item)"
        :clearable="false"
        style="width: 380px"
      />
      <!-- 输入框，不用传type -->
      <el-input v-else
        class="telephone"
        type="text"
        v-model="item.value"
        :maxlength="item.inputLength"
        :placeholder="`请输入${item.holder}`"
        @on-keyup="onTextChange(item)"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onReset">清空</el-button>
      <el-button type="primary" html-type="submit" :disabled="abledSearch" @click.native.prevent="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FormatDate from './../../utils/format.js'
// import { apiCitySite } from 'js/api'

export default {
  data () {
    return {
      abledSearch: false
    }
  },
  props: {
    options: [Array]
  },
  created () {
    if (this.$route.query.pageNo) return
    // 判断条件搜索存在，则立即调用搜索列表
    const isVal = this.options.filter(item => item.value)
    const isValLength = []
    for (var k in isVal) {
      if (isVal[k].value.length > 0) {
        if (isVal[k].value instanceof Array) {
          if (isVal[k].value[0]) {
            isValLength.push(isVal[k])
          }
        } else {
          isValLength.push(isVal[k])
        }
      }
    }
    if (isVal.length && isValLength.length) {
      this.onSubmit()
    }
  },
  methods: {
    onTextChange (item) {
      if (item.filterType === 'number') {
        const target = this.options.filter(list => list.name === item.name)[0]
        target.value = item.value.replace(/\D/g, '').toString()
      }
    },
    onSubmit () {
      const _this = this
      let flag = 1 // 错误标志
      const oResult = {} // 搜索的正确结果
      this.options.forEach(item => {
        console.log(item)
        // 日期时间范围选择
        if (item.type === 'datetimerange') {
          if (item.value[0]) {
            if (item.value[0] !== 'undefined') {
              item.value[0] = new Date(item.value[0])
              item.value[1] = new Date(item.value[1])
            } else {
              item.value = ''
            }
            if (item.query) {
              oResult[item.query[0]] = FormatDate(item.value[0], 'yyyy-MM-dd hh:mm:ss')
              oResult[item.query[1]] = FormatDate(item.value[1], 'yyyy-MM-dd hh:mm:ss')
            } else {
              oResult.startTime = FormatDate(item.value[0], 'yyyy-MM-dd hh:mm:ss')
              oResult.endTime = FormatDate(item.value[1], 'yyyy-MM-dd hh:mm:ss')
            }
          }
        } else {
          const val = item.value.trim()

          if (val) {
            if (item.verify && !item.verify.test(val)) {
              this.$Message.warning(`${item.holder}格式输入有误`)
              flag = 0
            } else {
              oResult[item.name] = val
            }
          }
        }
      })

      // 如果flag !==0 验证通过，提交搜索
      if (flag) {
        this.$emit('on-submit', oResult)
      }
      this.abledSearch = true
      const searchTime = setTimeout(() => {
        _this.abledSearch = false
        clearTimeout(searchTime)
      }, 1000)
    },
    onReset () {
      this.options.forEach(item => {
        if (item.value instanceof Array) {
          item.value = []
        } else {
          item.value = ''
          item.startTime = item.startTime && ''
          item.endTime = item.endTime && ''
        }
      })
    },
    // 选择日期时间区域
    onChangeDatetimer (value, item) {
      if (!value[0]) {
        if (item.query) {
          item.query[0] = ''
          item.query[1] = ''
        } else {
          item.startTime = ''
          item.endTime = ''
        }
      } else {
        if (/00:00:00/.test(value[1])) {
          value[1] = value[1].replace('00:00:00', '23:59:59')
        }
        item.value = value
      }
    }
  }
}
</script>

<style>
 .telephone {
   width: 200px;
 }

</style>

import Vue from 'vue'
import SiftFrom from './SiteForm/index'
import TableList from './TableList/index'

const components = {
  'sift-form': SiftFrom,
  'table-list': TableList
}

Vue.use({
  install: Vue => {
    Object.keys(components).forEach(key => {
      Vue.component(`w-${key}`, components[key])
    })
  }
})

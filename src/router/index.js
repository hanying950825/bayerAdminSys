import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'
// import store from '../store'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'hash',
  // 加载路由后滚动位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 路由出口
export default router

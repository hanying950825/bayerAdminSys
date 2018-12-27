import { resolve } from 'path'

// 常规一级路由
export const normalFirstRoutes = [
  {
    path: '/',
    meta: { name: '欢迎页' },
    component: resolve => require(['../pages/home'], resolve)
  },
  {
    path: '/shops',
    meta: { name: '商品管理' },
    component: resolve => require(['../pages/shops'], resolve)
  },
  {
    path: '/classify',
    meta: { name: '分类管理' },
    component: resolve => require(['../pages/classify'], resolve)
  },
  {
    path: '/user',
    meta: { name: '用户管理' },
    component: resolve => require(['../pages/user'], resolve)
  },
  {
    path: '/adminUser',
    meta: { name: '后台用户管理管理' },
    component: resolve => require(['../pages/adminUser'], resolve)
  }
]

// 常规二级路由
export const normalChildRoutes = [

]

// 主路由
export const routes = [
  {
    path: '/login',
    meta: { name: '登录' },
    component: resolve => require(['../pages/login'], resolve)
  },
  {
    path: '/',
    meta: { isAuth: true },
    component: resolve => require(['@/App'], resolve),
    children: [
      ...normalFirstRoutes,
      ...normalChildRoutes
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

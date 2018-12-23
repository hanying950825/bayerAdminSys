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
    redirect: '/login'
  }
]

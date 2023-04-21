import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/Qa.vue')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  {
    // 动态路由，添加props传参
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/Article.vue'),
    props: true
  },
  {
    path: '/followdetail',
    name: 'followdetail',
    component: () => import('@/views/FollowDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

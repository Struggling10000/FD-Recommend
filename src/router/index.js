import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Collect from '@/components/Collect'
import Login from '@/components/Login'
import cookieUtil from '@/utils/cookie'
import config from '@/config/config'
Vue.use(Router)
// 路由设置
var router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      name: 'collect',
      path: '/collect',
      component: Collect
    },
    {
      name: 'login_reg',
      path: '/login',
      component: Login
    }
  ]
})
// 对每个路由进行拦截 没有cookie则跳转到登录界面
// 参数含义 from:从哪来 to:到哪去 next:下一步做什么
router.beforeEach((to, from, next) => {
  let ric = cookieUtil.auth(config.serverkey, to)
  if (!ric) {
    console.log('auth false go login')
    next('/login')
  } else {
    console.log('auth true')
    next()
  }
})

export default router

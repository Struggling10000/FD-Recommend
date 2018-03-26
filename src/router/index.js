import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Collect from '@/components/Collect'
import Login from '@/components/Login'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/collect',
    name: 'collect',
    component: Collect
  },
  {
    path: '/login',
    name: 'login_reg',
    component: Login
  }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
import detail from '@/pages/detail'
import login from '@/pages/login'
import register from '@/pages/register'
import search from '@/pages/search'
import goodList from '@/pages/goodlist'
import shopCart from '@/pages/shopping'


Vue.use(Router)

let Index = ()=>import('@/pages/index');
export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        type_flag:true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/list',
      name: 'list',
      component: goodList
    },{
      path: '/shoplist',
      name: 'shoplist',
      component: shopCart
    },
  ]
})

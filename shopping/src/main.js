import Vue from 'vue'
import App from './App'  //导入App.vue文件
import router from './router'  //导入router文件夹下index.js,这里写配置信息
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import scroll from './plugin/scroll'
import loading from './plugin/loading'
import $axios from '@/plugin/axios'
import Vuex from 'vuex'
import store from '@/store/store'

// vue中发送请求插件
import axios from 'axios';

// 导入重置样式
import './assets/css/comment.css'

import lazyload from '@/plugin/lazyload'
Vue.directive('lazy',lazyload)

Vue.config.productionTip = false  //配置开发环境
Vue.use(ElementUi);
Vue.use(scroll)
Vue.use(loading);
Vue.use(Vuex)
// 添加一个自定义方法
Vue.prototype.$axios = $axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:new Vuex.Store(store),
  components: { App },
  template: '<App/>',
})

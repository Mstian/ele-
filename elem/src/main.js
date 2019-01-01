// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import login from '@/login'
import axios  from 'axios'
import store from '@/vuex'
import study from '@/study'
import filters from '@/filter'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

for(var key in filters){           //将filters对象遍历，然后添加全局过滤器，key值作为过滤器名，value 作为过滤器
  Vue.filter(key,filters[key]);
}

router.beforeEach((to,from,next)=>{
  if(!localStorage.adminId || !localStorage.adminName){
      store.commit("OUT_LOGIN");
  }
  next();
})

axios.interceptors.request.use((config)=>{
  // config.url = "http://127.0.0.1" + config.url;
  config.url = "/ele"+config.url;
  return config;
})
axios.interceptors.response.use(({data})=>{
  return data;
})

Vue.prototype.$ajax = axios;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App,login,study },
  // template: '<login/>'
  template:`<components :is="$store.state.admin.adminId ?'App':'login'"/>`
  // template:'<study/>'
})

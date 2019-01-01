import Vue from 'vue'
import Router from 'vue-router'
import page from '@/router/page'
import login from './login'
import shop from './shop'
import detail from './detail'

Vue.use(Router)
export default new Router({
  mode:"history",
  routes: page.concat(login,shop,detail),
})

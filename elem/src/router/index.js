import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import admin from './admin'
import shop from './shop'
import goods from './goods'
import adv from './adv'
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: admin.concat(shop,goods,adv),
})

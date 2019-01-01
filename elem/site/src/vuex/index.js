import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import my from './my'
import detail from './detail'
export default new vuex.Store({
    modules:{
        my,
        detail,
    }
})
<template>
 <div>
     <div class="menu" v-if="$route.meta.isHave">
        <router-link class="menu-child" to="/home">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </router-link>
        <router-link class="menu-child" to="/search">
            <i class="iconfont icon-faxian"></i>
            <span>发现</span>    
        </router-link>
        <router-link class="menu-child" to="/order">
            <i class="iconfont icon-icon-yxj-empty-discover"></i>
            <span>订单</span>
        </router-link>
        <router-link class="menu-child" to="/my">
            <i class="iconfont icon-mine"></i>
            <span>我的</span> 
        </router-link>
     </div>
    <router-view></router-view>
 </div>
</template>

<script>
import icon from "@/assets/icon/iconfont.css"
import iconfont from "@/assets/iconfont/iconfont.css"
import font from '@/assets/font/iconfont.css'
export default {

    data () {
        return {
            
        }
    }
}

</script>
<style scoped>
.menu{
    display: flex;
    justify-content: space-between;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
}
.menu-child{
    width:25vw; 
    padding-top: 3vw;
    padding-bottom: 3vw;
}
.menu-child:hover{
    color: skyblue;
}
.menu-child{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 12px;
}
.menu-child .iconfont{
    font-size: 18px;
}
*{
    padding: 0;
    margin: 0;
}
</style>

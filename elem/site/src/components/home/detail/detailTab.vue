<template>
 <div>
     
    <div class="tab">
        <router-link :to="'/detail/'+url">点餐</router-link>
        <router-link to="/comment">评价</router-link>
        <router-link to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
 </div>
</template>

<script>
export default {
  props:["url"],
  data () {
    return {
    }
  }
}

</script>
<style scoped>
    .tab{
        display: flex;
        justify-content: space-around;
        box-shadow: 0 1px 1px #eee;
    }
    .tab a{
        text-decoration: none;
        color: #000;
        /* padding: 5vw 0; */
        line-height: 15vw;
        height: 15vw;
        box-sizing: border-box;
    }
    .tab a:hover{
        border-bottom: 2px solid skyblue;
    }

</style>

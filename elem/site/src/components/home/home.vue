<template>
 <div>
     <div id="header">

    </div>
     <div id="search">
        <input type="text" placeholder="搜索饿了么商家商品名称">
    </div>
    
      <slideShow></slideShow>
      <hotAdv></hotAdv>   
      <slideAdv></slideAdv>
      <shopSort></shopSort>
 </div>
</template>

<script>
import axios from "axios";
import slideShow from './slideShow'
import hotAdv from './hotAdv'
import slideAdv from "./slideAdv"
import shopSort from './shopSort'
export default {
  components:{
      slideShow,
      hotAdv,
      slideAdv,
      shopSort
  },
  data () {
    return {
 
    }
  },
  methods:{
   
    
  },
  mounted(){

  }
}

</script>
<style scoped>

*{
    padding: 0;
    margin: 0;
    font-family: "微软雅黑"
}
#header{
    width: 100%;
    height: 10vw;
    background-color: skyblue;
}
#search{
    width: 100%;
    height: 20vw;
    line-height: 20vw;
    background-color: skyblue;
    display: flex;
    justify-content: space-around;
}
#search input{
    outline: medium;
    width: 80%;
    height: 10vw;
    text-align: center;
    border-style: none;
    font-size: 14px;
}

</style>

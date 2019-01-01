<template>
 <div>
      <mt-header title="店铺详情" fixed>
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.back(-1)"></mt-button>
          </router-link>
      </mt-header>

     <div id="bg">
        <div class="logo">
           <img :src="'http://127.0.0.1/upload/'+$store.state.detail.shopInfo.shopPic" alt="">  
        </div>
        <div class="name">{{$store.state.detail.shopInfo.shopName}}</div>
        <p><span>评价4.8</span> <span>月售60单</span><span>蜂鸟专送</span> </p>
        <p class="shows">公告：海鲜见面，以面为基础，搭配各类海鲜，希望...</p>
     </div>
     <div id="choiceTab">
          <detailTab :url="nowId"></detailTab>
     </div>
 </div>
</template>

<script>
import detailTab from "./detail/detailTab"
import axios from "axios"
export default {
    components:{
      detailTab,
    },
    data () {
      return {
        nowId:this.$route.params.id
        // shopInfo:{},
        // shopId:"",
      }
    },
    methods:{
      // getShopInfo(){
      //   var id = this.$route.params.id;
      //   axios.get("http://127.0.0.1:88/getShopInfo",{
      //     params:{
      //       id,
      //     }
      //   }).then(({data})=>{
      //     this.shopInfo = data.shopInfo;
      //   })
      // },
      getShopInfo(){
        var id = this.$route.params.id;
        // console.log(id);
        this.$store.dispatch("getShopInfo",{id});
      }
    },
    mounted(){
      this.getShopInfo();
      // this.shopId = this.$route.params.id;
    }
}

</script>
<style scoped>
#bg{
  margin-top: 15vw;
  text-align: center;
  background-image: url("//fuss10.elemecdn.com/3/e8/56841b395d27741da51f95d0fa57epng.png?imageMogr/format/webp/thumbnail/750x/");
  background-repeat: no-repeat;
  background-size: 100% 30vw;
}

.logo{
  width: 20vw;
  height: 20vw;
  display: inline-block;
  text-align: center;
  margin-top: 16vw;
}
.logo img{
  width: 100%;
}
#bg .name{
  font-size: 18px;
}
#bg p{
  font-size: 12px;
}
#bg p span{
  margin: 0 2vw;
}
.shows{
  color: #aaa;
}
</style>

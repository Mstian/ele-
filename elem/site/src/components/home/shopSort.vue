<template>
 <div>
     <div id="tab">
         <nav @click="getShopList(1)">综合排序</nav>
         <nav @click="getShopList(2)">距离最近</nav>
         <nav @click="getShopList(3)">品质联盟</nav>
         <nav @click="getShopList(4)">筛选</nav>
     </div>
     <div id="shopList">
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="shop" v-for="item in shopList" @click="toDetail(item._id)">
                <div class="top">
                    <div class="logo">
                        <img :src="'http://127.0.0.1/upload/'+item.shopPic" alt="">
                    </div>
                    <div class="main">
                        <div class="name">{{item.shopName}}</div>
                        <div class="amount"><span>月售3781单</span></div>
                        <div class="send"><span>$20起送</span>| <span>夜间配送+2</span></div>
                    </div>
                </div>
                <div class="bot">
                    <div class="left">

                    </div>
                    <div class="right">
                        <div class="foodtype">
                            <span>美食</span>
                            <span>口碑人气好店</span>
                        </div>
                        <div class="shou">
                            ￥20元起
                        </div>
                        <div class="jian">
                            满五十减五十
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="more"><mt-spinner color="#26a2ff" class="loadingmore" v-if="loading" type="fading-circle"></mt-spinner></div>
       
     </div>
 </div>
</template>

<script>
import axios from "axios"
export default {
  data () {
    return {
        shopList:[],
        pageIndex:1,
        loading:false,
    }
  },
  methods:{
      getShopList(type = 1){
          axios.get("http://127.0.0.1:88/getShopList",{
              params:{
                  pageIndex:this.pageIndex,
                  type,
              }
          }).then(({data})=>{
              this.shopList = data.nowList;
          })
      },
      loadMore(){
            this.pageIndex++;
            this.loading = true;
            axios.get("http://127.0.0.1:88/getShopList",{
                params:{
                    pageIndex:this.pageIndex,
                }
            }).then(({data})=>{
                this.shopList = this.shopList.concat(data.nowList);
                this.loading=false;
            })
        },
        toDetail(id){
            this.$router.push(`/detail/${id}`);
        }
    },
   
    mounted(){
        this.getShopList();
    }
}

</script>
<style scoped>
*{
    padding: 0;
    margin: 0;
    list-style: none;
}
#tab{
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-top: 5vw;
    margin-bottom: 5vw;
}
#tab nav{
    font-size: 14px;
    width: 25vw;
    padding: 0 3vw;
    color: #666;
}
#tab nav:hover{
    color:#111;
}

#shopList{
    padding-bottom: 20vw;
}
#shopList .shop .top{
    display: flex;
  
}
#shopList .shop .top .logo{
    width: 20%;
}
#shopList .shop .top .logo img{
    width: 100%;
    border: 1px solid #eee;
}
#shopList .shop .top .main{
    width: 80%;
    background-color: fff;
    margin-left: 10px;
}
.shop{
    border-bottom: 1px solid #eee;
    margin-bottom: 2vw;
}
.shop .main div{
    line-height: 25px;
}
.shop .main .name{
    font-size: 15px;
    font-weight: bold;
    font-family: "微软雅黑";
    color: #222;
} 
.shop .main .amount{
    font-size: 12px;
    color: #666;
}
.shop .main .send{
    font-size: 12px;
    color: #666;
}
.bot{
    display: flex;
    justify-content: space-between;
}
.bot .left{
    width: 20%;
    height: 60px;
}
.bot .right{
    width: 80%;
    height: 60px;
    margin-left: 10px;
}
.bot .right span{
    margin-right: 10vw;
}
.bot .right span:nth-child(2){
    color: orange;
}
.bot .right {
    color: #444;
    font-size: 12px;
}
.more{
    text-align: center;
}
.more .loadingmore{
    display: inline-block;
}
</style>

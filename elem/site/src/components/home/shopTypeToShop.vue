<template>
 <div>
      <mt-header title="店铺详情" fixed>
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.back(-1)"></mt-button>
          </router-link>
      </mt-header>

        
        <div id="shopList">
        <h3>
            <span>推荐商家</span>    
            <div class="linel"></div>
            <div class="liner"></div>
        </h3>
        <div class="sort">
            <div @click="getShopListById(1)" class="comprehensive">综合排序</div>
            <div @click="getShopListById(2)" class="distance">距离最近</div>
            <div @click="getShopListById(3)" class="quality">品质联盟</div>
            <div @click="getShopListById(4)" class="choice">筛选</div>
        </div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="shop" v-for="item in shopList" @click="toDetail(item._id)"  >
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
        getShopListById(type = 1){
            var id = this.$route.params.id
            axios.get("http://127.0.0.1:88/getShopListById",{
                params:{
                    pageIndex:this.pageIndex,
                    id,
                    type,
                }
            }).then(({data})=>{
                this.shopList = data.nowList;
            })
        },
        loadMore(){
            this.pageIndex++;
            if(this.pageIndex>3){
                this.pageIndex = 1;
            }
            this.loading = true;
            axios.get("http://127.0.0.1:88/getShopListById",{
                params:{
                    id:this.$route.params.id,
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
      this.getShopListById();
    }
}

</script>
<style scoped>
*{
    list-style-type: none;
}
ul,li{
    padding: 0;
    margin: 0;
}
#shopList{
    margin-top: 10vw;
}
#shopList h3{
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    position: relative;
    height: 25px;
}
#shopList h3 .linel,#shopList h3 .liner{
    width: 15%;
    height: 1px;
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10%;
}
#shopList h3 .linel{
    left: 30%;
}
#shopList h3 .liner{
    left: 75%;
}
#shopList .sort{
    left: 0;
    top:9vw;
    height: 10vw;
    line-height: 10vw;
    width: 100%;
    position: fixed;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    margin: 10px 0;
}
#shopList .shop{
    border-top: 1px solid #eee;
}
#shopList .shop .top{
    display: flex;
    background-color: #fff;
}
#shopList .shop .top .logo{
    width: 20%;
}
#shopList .shop .top .logo img{
    width: 100%;
    border: 1px solid #eee;
    margin: 3vw 0;
}
#shopList .shop .top .main{
    width: 80%;
    font-size: 12px;
    margin-left: 10px;
}
.shop .main div{
    line-height: 25px;
}
.shop .main .name{
    font-size: 14px;
    font-weight: bold;
    color: #222;
} 
.more{
    text-align: center;
}
.more .loadingmore{
    display: inline-block;
}
</style>

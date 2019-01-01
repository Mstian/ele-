<template>
 <div>
    <div class="Z_con2_2">
        <div class="F_wd_top_con2">
            <div class="F_wd_top_con2_l" id="wrapper">
                <div>
                    <ul class="sy">
                        <li v-for="(item,index) in goodsTypeList"  @click="changeActive(index,item._id)" :class="nowIndex == index ? 'current' :''">{{item.goodsTypeName}}</li>
                    </ul>
                </div>
            </div>
            <div class="F_wd_top_con2_r" id="wrapper1">
                <div class="content">
                    <ul class="by" style="display: block">
                         <li v-for="item in goodsList" class="shop">
                              <div class="top">
                                  <div class="logo">
                                      <img :src="'http://127.0.0.1/upload/'+item.goodsPic"  alt="">
                                  </div>
                                  <div class="main">
                                      <div class="name">{{item.goodsName}}</div>
                                      <div class="amount"><span>销量：月售3781单</span></div>
                                      <div class="price">
                                        <span> 价格: <span style="color:#e33333;">￥</span>{{item.goodsPrice}}</span>
                                        <i @click="addToCar(item._id,item.goodsPrice)" class="iconfont icon-jia" style="color:#e33333;font-weight:bold"></i>
                                      </div>
                                  </div>
                              </div>
                          </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div id="bottomOrder">
        <p>
          <span class="choice">已选商品：{{buyNum}}</span>
          <span class="priceCount" style="color:#e33333">￥{{countPrice}}</span> 
          <span class="toPay" style="color:#e33333" @click="$router.push('/order')">去结账</span>
        </p>
    </div> 
 </div>
</template>

<script>
import {top} from "../../../../static/top.js"
import axios from "axios";
export default {
  data () {
    return {
      goodsTypeList:[],
      goodsList:[],
      nowIndex:0,
      goodsTypeId:"",
      carList:[],
    }
  },
  methods:{
      getCarList(){
        axios.get("http://127.0.0.1:88/getCarList").then(({data})=>{
          this.carList = data.carList;
        })    
      },
      addToCar(id,price){
        axios.get("http://127.0.0.1:88/addToCar",{
          params:{
            goodsId:id,
            userId:localStorage.userId,
          }
        }).then(({data})=>{
          this.getCarList();
        })
      },
      changeActive(index,goodsTypeId){
        this.goodsTypeId = goodsTypeId;
        this.nowIndex = index;
        this.getGoodsList();
      },
      getGoodsList(){
        var goodsTypeId = this.goodsTypeId;
        axios.get("http://127.0.0.1:88/getGoodsList",{
          params:{
            goodsTypeId,
          }
        }).then(({data})=>{
          this.goodsList = data.goodsList;
          // console.log(this.goodsList);
        })
      },
      getGoodsTypeList(){ //根据shopId找到对应下面的商品类型
          var shopId = this.$route.params.id;
          axios.get("http://127.0.0.1:88/getGoodsTypeList",{
            params:{
              shopId,
            }
          }).then(({data})=>{
            // console.log(data);
            this.goodsTypeList = data.goodsTypeList;
          })
      },
      top1(){
        top();
      }
  },
  mounted(){
      this.top1();
      this.getGoodsTypeList();
      this.getCarList()
  },
  computed:{
     buyNum(){
      var buyNum = 0;
      var carList =this.carList;
      carList.forEach((v)=>{
        buyNum+=v.buyNum;
      })
      return buyNum;
    },
    countPrice(){
      var countNum = 0;
      var carList = this.carList;
      carList.forEach((v)=>{
        console.log(v);
        countNum+=v.buyNum/1*v.goodsInfo.goodsPrice;
      })
      return countNum;
    }
  }
}

</script>
<style scoped>

/* 底部购物车 */
#bottomOrder{
  line-height: 15vw;
  height: 15vw;
  width:100%;
  background-color: #26a2ff;
  position: fixed;
  left: 0;
  bottom: 0;
}
.content{
  padding-bottom: 20vw;
}
.toPay{
  margin: 0 6vw;
}
.choice{
  margin: 0 10vw;
}
/* 底部购物车 */


.F_wd_top_con2{width:100%; min-height:4em; background:#fff; border-top:0.1em solid #ccc;}

.F_wd_top_con2_l{width:30%; float:left;}
.F_wd_top_con2_l ul li{ line-height:3.2em; text-align: center; border-bottom:0.1em solid #f2f2f2;}
.F_wd_top_con2_r{width:70%;  float:right;}
.F_wd_top_con2_r ul li{
   text-indent:1em;
   }

.F_wd_top_con2_r_borb1{ border-bottom:0.1em solid #ccc;}
.F_wd_top_con2_r_borb2{ border-bottom:0.1em solid #2b57ae; color:#2b57ae;}


.F_wd_top_con2_l_1{ width:40%; float:left;}
.F_wd_top_con2_l_1 ul li{ line-height:3.2em; text-indent:1em; }
.F_wd_top_con2_r_1{ width:55%;  float:right;}
.F_wd_top_con2_r_1 ul li{ line-height:3.2em; text-indent:1em;}

.F_wd_top_con2_l_2{width:40%; background:#f2f2f2; float:left;}
.F_wd_top_con2_l_2 ul li{ line-height:3.2em; text-indent:1em; border-bottom:0.1em solid #f2f2f2;}
.F_wd_top_con2_r_2{width:55%;  float:right;}
.F_wd_top_con2_r_2 ul li{ line-height:3.2em; text-indent:1em;}


.current{background: #f1f1f0; color: #1c58d1;}
.by{display: none;}


*,body,div,p,table,td,input,option,textarea,select{margin:0; padding:0; color:#666666;text-align: center; font-family:'寰蒋闆呴粦';}
body {overflow:hidden;}
span,b {display:inline-block; font-weight:normal;}
h1,h2,h3,h4,h5 {font-weight:normal;}
ul {list-style-type:none; margin:0; padding:0;}
table {border-collapse:collapse;}
table tr th {font-weight:normal;}
small{font-size:inherit;  color:#F00;  }
.bg_none {background:none;}
.displayN {display:none;} 
.clear {clear:both;}

.float_l {float:left;}
.float_r {float:right;}

.txtL {text-align:left;}
.txtC {text-align:center;}
.txtR {text-align:right;}

.height025 {height:.25em; clear:both;}
.height05 {height:.5em; clear:both;}
.height1 {height:1em; clear:both;}
.height15 {height:1.5em; clear:both;}
.height13 {height:1.3em; clear:both;}
.height2 {height:2em; clear:both;}
.height3 {height:3em; clear:both;}
.height4 {height:4em; clear:both;}
 
.height10{height:7em; clear:both;}
.font_07 {font-size:0.7em;}
.font_08 {font-size:0.8em;}
.font_1_1 {font-size:1.1em;}
.bold {font-weight:bold;}
 
.bg_body {background:#efeff4;}
.body_over_auto {overflow:auto;}
/**鏂囧瓧棰滆壊**/

.txt_blue {color:#007aff;}
.txt_red {color:#fe0a0b;}
.txt_org {color:#ff7900;} 

/*琛ㄥ崟鏍峰紡*/
input:focus{outline: none;}
 
.width_100 {width:100%; padding-right:0;} 
.width_5em {width:5em;}
.width_6em {width:6em;}
.width_7em {width:7em;}
.width_10em {width:10em;}
.width_11em {width:11em;}
.width_12em {width:12em;}
.width_15em {width:15em;}

/*鎸夐挳*/
.btn_blue {text-align:center; color:#fff; border-radius:0.4em; line-height:2em; background:#035eb1; padding:0 2em;}

/*澶嶉€夋鏍峰紡*/
 

/*椤堕儴鏍峰紡*/
.top_tit {background:#2b57ae; height:2.7em; overflow:hidden;} 
  

/*椤甸潰妗嗘灦*/
.top_tit{ height:3.3em; background:#2b57ae;}
.top_tit_center{ width:60%; margin:0 auto; font-size:1.2em; color:#FFF; display:block; text-align:center; height:2.7em; line-height:2.7em;}


</style>

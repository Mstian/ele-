<template>
 <div>
   <div id="head">我的订单</div>
   <div id="shopList">
        <div class="shop" v-for="(item,index) in carList">
            <div class="top">
                <div class="logo">
                    <img :src="'http://127.0.0.1/upload/'+item.goodsInfo.goodsPic" alt="">
                </div>
                <div class="main">
                    <div class="name">{{item.goodsInfo.goodsName}}</div>
                    <div class="amount"><span>数量:</span>
                      <span @click="upGoods(item._id,0,index)" class="iconfont icon-jian"></span>
                      <span ref="buyNum">{{item.buyNum}}</span>
                      <span @click="upGoods(item._id,1,index)" class="iconfont icon-jia"></span>
                    </div>
                    <div class="send"><span>单价：￥</span><span>{{item.goodsInfo.goodsPrice}}</span></div>
                </div>
                <div @click="removeGoods(item._id)" class="remove">
                    <span>移除该商品</span>
                </div>
            </div>
        </div>
    </div>
    <div id="bottomOrder">
        <p>
          <span class="choice">已选商品：{{buyNum}}</span>
          <span class="priceCount" style="color:#e33333">￥{{countPrice}}</span> 
          <span class="toPay" style="color:#e33333" @click="toPay">提交订单</span>
        </p>
    </div> 
 </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      carList:[],
    }
  },
  methods:{
    toPay(){
      var payPrice = this.countPrice;
       axios.get("http://127.0.0.1:88/toPay",{
         params:{
           payPrice,
           userId:localStorage.userId,
         }
       }).then(({data})=>{
         this.$store.commit("CHANGE_GOLDNUM",data);
         this.clearAllCar();
       })
    },
    clearAllCar(){
      axios.get("http://127.0.0.1:88/clearAllCar").then(({data})=>{
        this.getCarList();
      })
    },
    removeGoods(id){
      axios.get("http://127.0.0.1:88/removeCarList",{
        params:{
          id
        }
      }).then(({data})=>{
       this.getCarList();
      })
    },
    getCarList(){
      axios.get("http://127.0.0.1:88/getCarList").then(({data})=>{
        this.carList = data.carList;
      })    
    },
    upGoods(id,type,index){
      // console.log();
      if(this.$refs.buyNum[index].innerHTML<=1 && type==0){
        alert("亲，购物车商品不能再减啦");
        return 0;
      }
      // console.log(id,type);
      axios.get("http://127.0.0.1:88/upCarList",{
        params:{
          id,
          type,
        }
      }).then(({data})=>{
        // console.log(data);
        this.getCarList();
      })
    }
  },
  mounted(){
    this.getCarList();
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
        countNum+=v.buyNum/1*v.goodsInfo.goodsPrice;
      })
      return countNum;
    }
  }
}

</script>
<style scoped>
/* // 底部提交订单 */
#bottomOrder{
  line-height: 15vw;
  height: 15vw;
  width:100%;
  background-color: #26a2ff;
  position: fixed;
  left: 0;
  bottom: 17vw;
}
#bottomOrder p{
  line-height:5vw;
}
.toPay{
  margin: 0 10vw;
}
.choice{
  margin: 0 10vw;
}




.remove{
  height: 8vw;
  width: 20vw;
  display: inline-block;
  background: #e3333e;
  border-radius: 2vw;
  position: absolute;
  right: 4vw;
  top: 50%;
  margin-top: -5vw;
  color: #eee;
  text-align: center;
  line-height: 8vw;
  font-size: 12px;
}

#head{
  height: 10vw;
  background-color: rgb(77, 195, 241);
  line-height: 10vw;
  width: 100%;
  text-align: center;
  color: antiquewhite;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
#shopList{
  padding: 10vw 0 30vw 0;
}
#shopList .shop{

  margin-top: 2vw;
}
#shopList .shop .top{
    display: flex;
    background: #efefef;;
    position: relative;
}
#shopList .shop .top .logo{
    width: 20%;
}
#shopList .shop .top .logo img{
    width: 100%;
    border: 1px solid #eee;
    margin:3vw 0;
}
#shopList .shop .top .main{
    width: 80%;
    margin-left: 10px;
}
.shop .main div{
    line-height: 25px;
}
.shop .main .name{
    font-size: 14px;
    font-weight: bold;
    font-family: "微软雅黑";
} 
.bot{
    display: flex;
    justify-content: space-between;
}
.bot .left{
    width: 20%;
    height: 60px;
    background-color: #dae;
}
.bot .right{
    width: 80%;
    height: 60px;
    background-color: #435665;
    margin-left: 10px;
}
.amount span{
  margin-right: 4vw;
  font-size: 12px;
}
.send{
  font-size: 12px;
}
.icon-jian{
  color:#bbb;
}
.icon-jia{
  color: #e3333e;
}
</style>

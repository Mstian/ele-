<template>
 <div>
   <div id="head">我的</div>
   <div class="login">
       <div>
            <span class="headPic"><img src="../../assets/logo.png" alt=""></span> 
            <span class="toLogin" @click="toLog">{{userName?userName:"登录/注册"}}</span>  
        </div>
   </div>
   <div id="assets">
        <div>
            <i class="iconfont icon-hunlicehua"></i>
            <span>钱包</span>
        </div>
        <div>
            <i class="iconfont hongbao icon-xinxi2"></i>
            <span>红包</span>
        </div>
        <div>
           <i class="iconfont jinbi icon-cehuazhongxin"></i>
           <span v-if="userName">{{goldNum}}</span>
           <span v-if="!userName">金币</span>
        </div>
   </div>
   <div id="info">
      <ul>
        <li><i>></i> <span class="iconfont dizhi icon-shouye1"></span> 我的地址</li>
        <li><i>></i> <span class="iconfont shangcheng icon-shangjia1"></span> 分享商城</li>
        <li><i>></i> <span class="iconfont xianjin icon-baozhuanhuan"></span> 分享拿十元现金</li>
        <li><i>></i> <span class="iconfont kefu icon-women2"></span> 我的客服</li>
        <li><i>></i> <span class="iconfont xiazai icon-shangjia"></span> 下载饿了么APP</li>
      </ul>
   </div>
 </div>
</template>

<script>
import Vue from "vue"
import {mapMutations} from "vuex"
export default {
  data () {
    return {
       userName:localStorage.userName,
       userId:localStorage.userId,
       goldNum:this.$store.state.my.goldNum,
    }
  },
  methods:{
    toLog(){
      this.$router.push("/login")
    },
    // ...mapMutations(["CHANGE_GOLDNUM"])
  },
  mounted(){
    // console.log(this.$store.state);
  },
  computend(){
    
  }
}

</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
  list-style: none;
}
#info {
  background-color: #eeecec;
  padding-bottom: 10vw;
}
#info .dizhi{
  border-top: none;
  color:skyblue;
}
#info .shangcheng{
  color: rgb(231, 42, 67);
}
#info .xianjin{
  color: gold;
}
#info .kefu{
  color: skyblue;
}
#info .xiazai{
  color: skyblue;
}
#info li{
  color: #555;
  height: 15vw;
  border-top: 1px solid rgb(209, 207, 207);
  border-bottom: 1px solid rgb(209, 207, 207);
  background-color: #fff;
  line-height: 15vw;
  margin: 2vw 0;
}
#info li:nth-child(1){
  border-top: none;
}
#info li span{
  font-size: 18px;
}
#info li i{
  font-style: normal;
  float: right;
  font-size: 14px;
  color: #aaa;
}
#assets{
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
#assets div{
    width: 32vw;
    height: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#assets div i{
  display: inline-block;
  margin-top: 2vw;
  background-color: orange;
  padding: 3vw;
  border-radius: 50%;
  color: aliceblue
  
}
#assets div .hongbao{
  background-color: rgb(235, 69, 97);
}
#assets div .jinbi{
  background-color: yellowgreen;
}
#assets div i.iconfont{
  font-size: 24px;
}
#assets div:nth-child(2){
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  box-sizing: border-box;
}
#head{
  text-align: center;
  font-size: 18px;
  background-color: skyblue;
  padding: 2vw;
  background-color: #26a2ff;
}
.login{
  height: 10vw;
  background-color: skyblue;
  padding: 20vw;
}
.login img{
  width: 80%;
  margin-top: 3vw;
}
.toLogin{
  font-size: 18px;
}
.headPic{
  display: inline-block;
  vertical-align: middle;
  width: 15vw;
  height: 15vw;
  line-height: 15vw;
  background: #ddd;
  border-radius: 50%;
  text-align: center;
}
</style>

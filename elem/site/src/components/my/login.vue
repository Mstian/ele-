<template>
<div>
    <mt-header title="登录注册" fixed>
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.back(-1)"></mt-button>
          </router-link>
    </mt-header>
    <div id="logo">
        <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4101748342,2771081998&fm=26&gp=0.jpg" alt="">
    </div>
    <div id="login">
        <input ref="phoneId" class="phoneId" type="text" placeholder="手机号">
        <p class="getCode"><button @click="sendInfo">获取验证码</button></p>
        <input ref="code" class="code" :value="$store.state.my.code"  type="text" placeholder="验证码">
        <p>新用户登录即自动注册，并表示已同意<span>《用户服务协议》</span></p>
        <button class="log" @click=login >登录</button>
        <p class="about">关于我们</p>
    </div>
</div>
</template>
<script>
import Vue from "vue"
import axios from "axios"
export default {
  data () {
    return {
        // code:"",
        // goldNum:"",
    }
  },
  methods:{
    // sendInfo(){
    //     var phoneId = this.$refs.phoneId.value;
    //     axios.post("http://127.0.0.1:88/sendInfo",{
    //         phoneId,
    //     }).then(({data})=>{
    //         this.code = data.code;
    //     })
    // },
    // login(){
    //     var phoneId = this.$refs.phoneId.value;
    //     var code = this.$refs.code.value;
    //     axios.post("http://127.0.0.1:88/login",{
    //         phoneId,
    //         code,
    //     }).then(({data})=>{
    //         if(data.ok==1){
    //             localStorage.userName = data.userName;
    //             localStorage.userId = data.userId;
    //             this.goldNum = data.goldNum;
    //             bus.$emit("sendGoldNum",this.goldNum);
    //             console.log(111)
    //             //this.$router.push("/my");
               
    //         }
    //     })
    // }
    sendInfo(){
        this.$store.dispatch("sendInfo",{
            phoneId:this.$refs.phoneId.value,
        })
    },
    login(){
        var phoneId = this.$refs.phoneId.value;
        var code = this.$refs.code.value;

        if(phoneId.length>0 && code.length>0){
            var _this = this
            this.$store.dispatch("login",{
                phoneId,
                code,
                success(){
                    _this.$router.push("/my") 
                }
            })
        }else{
            alert("请输入正确的手机号与验证码")
        }
    }
  },
  mounted(){
    //   console.log(this.$store.state.my.goldNum)
  }

}

</script>
<style scoped>
#logo{
    width: 100%;
    height: 40vw;
    text-align: center;
}
#logo img{
    width:40vw;
    margin-top: 15vw;
}
.getCode{
    text-align: right;
}
.getCode button{
    width: 30vw;
    border: none;
    height: 10vw;
    outline: medium;
    color: #666;
}
#login{
    text-align: center;
    color: #666;
}
#login p{
    width: 80vw;
    display: inline-block;
}
#login p span{
    color:royalblue;
}
#login input{
    padding-left:2vw;
    width: 80vw;
    height: 10vw;
    outline: medium;
    border-radius: 2vw;
    border: 1px solid #ddd;
}
.log{
    color:#666;
    width: 80vw;
    height: 10vw;
    border-radius: 2vw;
    border: none;
    outline: medium;
}
</style>

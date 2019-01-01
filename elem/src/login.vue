<template>
<el-form :model="loginForm" class="login-container" :rules="rules" ref="loginForm">
    <h3>饿了么后台管理</h3>
    <el-form-item prop="adminName">
        <el-input v-model="loginForm.adminName" type="text" placeholder="管理员账号"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
       <el-input v-model="loginForm.passWord" class="password" type="password" placeholder="管理员密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" style="width:100%" :loading="isLoading" @click="login('loginForm')">登录</el-button>
    </el-form-item>
</el-form>
</template>

<script>
// import axios from 'axios';
export default {
  name:"login",
  data () {
     var validatePass = (rule, value, callback) => {
       if(value.length<4 || value.length>10 ){
         callback(new Error("请输入4-10位的密码"))
       }else{
         callback()
       }
      };
    return {
      isLoading:false,
      rules:{
        adminName:[
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
        ],
        passWord:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min:4,max:10,message:'请输入4-10位密码', trigger: 'blur' },
          {validator:validatePass,trigger:'blur'}
        ]
      },
      loginForm:{
        adminName:"",
        passWord:"",
      }
    }
  },
  methods:{
    login(formName){
      var _this = this;
      this.$refs[formName].validate((valid) => {
          if(valid){ //valid 是一个布尔值，用于判断输入框里面的内容是否符合条件,当为真时，此时可以执行ajax操作；
            this.isLoading = true;
            this.$store.dispatch("login",{
              adminName:this.loginForm.adminName,
              passWord:this.loginForm.passWord,
              success(msg){
                  _this.isLoading = false;
                  _this.$message({
                    message: msg,
                    type: 'success'
                  });
              },
              error(msg){
                  _this.$message.error(msg);
                  _this.isLoading = false;
              }
            })
          }
      });
    }
  },
  mounted(){
    // console.log(this.$store.state.admin.adminId);
    // console.log(this.$store.state.admin.adminInfo.adminName);
  }
}

</script>
<style scoped>
  .login-container{
    width: 350px;
    margin: 200px auto;
    border:1px solid #ddd;
    padding: 25px 30px;
    box-shadow: 0 0 5px #aaa;
  }
  .login-container h3{
    text-align: center;
    color: #bbb;
  }
  .login-container .password{
      margin: 15px 0;
  }
</style>

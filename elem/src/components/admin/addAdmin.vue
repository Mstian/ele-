<template>
 <div>
  <el-form :model="adminInfo" status-icon :rules="rules" ref="adminInfo" label-width="100px" label-position="left" class="demo-ruleForm">
      <el-form-item prop="adminName" label="管理员">
          <el-input v-model="adminInfo.adminName"  type="text"  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="passWord" label="密码">
          <el-input v-model="adminInfo.passWord" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="repassWord" label="确认密码">
          <el-input v-model="adminInfo.repassWord" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('adminInfo')">提交</el-button>
          <el-button @click="resetForm('')">重置</el-button>
      </el-form-item>
  </el-form>
 </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
       if(value.length<4 || value.length>10 ){
         callback(new Error("请输入4-10位的密码"))
       }else{
         callback()
       }
      };
    var rePwd = (rule,value,callback)=>{
        if(value!= this.adminInfo.passWord){
           callback(new Error("请输入相同的密码"))
        }else{
           callback()
        }
    };
    return {
        adminInfo:{
           adminName:"",
           passWord:"",
           repassWord:""
        },
        rules:{
        adminName:[
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
        ],
        passWord:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min:4,max:10,message:'请输入4-10位密码', trigger: 'blur' },
          {validator:validatePass,trigger:'blur'}
        ],
        repassWord:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          {validator:rePwd,trigger:'blur'}
        ]
      },
    }
  },
  methods:{
    submitForm(formName){
     var _this=this;
       this.$refs[formName].validate((valid)=>{
          if(valid){ //valid 是一个布尔值，用于判断输入框里面的内容是否符合条件,当为真时，此时可以执行ajax操作；
              this.$ajax.post("/addAdmin",{
                adminName:this.adminInfo.adminName,
                passWord:this.adminInfo.passWord
              }).then((data)=>{
                   _this.$message({
                    message: "添加管理员成功",
                    type: 'success'
                  });
              })
          }else{
                _this.$message.error("添加管理员失败");
          }
      });
    }
  }
}

</script>
<style scoped>
.el-form{
  width: 450px;
  margin: 40px auto;
  border:1px solid #ddd;
  padding: 20px;
  padding-top: 40px;
  background-color: #efefef;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #ddd;
}
.btn{
 
}
</style>

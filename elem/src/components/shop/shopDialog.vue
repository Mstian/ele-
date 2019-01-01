<template>
 <div>
    <el-dialog :title="title" :visible="shopVisible" @update:visible="v=>$emit('update:shopVisible',v)" >
      <el-form>
        <el-form-item label="商铺名称">
          <el-input ref="shopName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商铺类别">
           <el-select v-model="shopTypeId" placeholder="请选择">
                <el-option
                v-for="item in shopTypeList"
                :key="item._id"
                :label="item.shopTypeName"
                :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商铺图片">
           <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              :limit="1"
              :on-change="changePic"
              :on-exceed="fn"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <img width="200" v-if="shopPic.length>0" :src="shopPic"  alt="">
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
        <el-button type="primary" @click="addShop()">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
  props:["shopVisible","typeId","getShopList","shopId"],
  data () {
    return {
        // dialogFormVisible:false
        shopTypeList:[],
        shopTypeId:"",
        shopPic:'',
        title:"添加店铺",
    }
  },
  methods:{
    fn(){
        this.$message.error('文件数量过多');
    },
    getAllShopType(){
        this.$ajax.get("getShopType",{}).then((data)=>{
            this.shopTypeList = data.shopTypeList;
        })
    },
    changePic(file){   
        var _this = this;
        this.$refs.upload.clearFiles();
        var render = new FileReader();  //将文件转换为base64格式
        render.readAsDataURL(file.raw);   
        render.onload = function(){
          console.log(this.result);//this.result 为base64格式
          _this.shopPic = this.result
        }
    },
    addShop(){
      var formdata = new FormData();
      formdata.set("shopName",this.$refs.shopName.$data.currentValue);
      formdata.set("shopTypeId",this.shopTypeId);
      formdata.set("shopPic",document.querySelector(".el-upload__input").files[0]);

      if(this.shopId.length>0){//修改
        formdata.set("shopId",this.shopId);
        this.$ajax.put("/upShopList",formdata)
        .then((data)=>{
          console.log(data);
          if(data.ok == 1){
            this.getShopList();
            this.$emit('update:shopVisible',false);
            this.$message({
               message:data.msg,
               type:"success",
            })
          }
        })
      }else{ // 添加
          this.$ajax.post("/addShopList",formdata)
            .then((data)=>{
                console.log(data);
              if(data.ok==1){
                this.$emit("update:shopVisible",false); //关闭弹窗
                this.$refs.upload.clearFiles();
                this.$refs.shopName.$data.currentValue = "";
                this.$message({
                    message:data.msg,
                    type:"success",
                })
                if(this.getShopList){ //如果有getShopList方法那么说明是从商铺管理界面添加的店铺
                  this.getShopList(); //添加成功立即渲染页面 访问父级方法
                }else{                //否则说明是从商铺类型界面添加的商铺
                  this.$router.push("/shopManage");
                }
              }else{
                this.$message({
                    message:data.msg,
                    type:"error",
                })
              }
          }) 
      }
     
    },
    getShopInfoById(){ //根据id获取店铺信息
      this.$ajax.get("/getShopInfoById",{
        params:{
          shopId:this.shopId
        }
      }).then((data)=>{
        // console.log(data);
        this.$refs.shopName.$data.currentValue = data.shopInfo.shopName;
        this.shopTypeId = data.shopInfo.shopTypeId;
        this.shopPic = "http://127.0.0.1/upload/"+data.shopInfo.shopPic;
        this.title = "修改店铺";
      })
    }
  },
  mounted(){                  //在vue生命周期里 mounted只执行一次，因此下面的代码也就只执行一次；
      this.getAllShopType();
      if(this.typeId){
          this.shopTypeId = this.typeId;
      }
      if(this.shopId.length>0){ // 说明待编辑
        this.getShopInfoById();
      }
  }
}

</script>
<style scoped>
</style>

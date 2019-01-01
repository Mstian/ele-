<template>
 <div>
    <el-dialog :visible="goodsVisible" @update:visible="v=>$emit('update:goodsVisible',v)" >
      <el-form>
        <el-form-item label="商品名称">
          <el-input ref="goodsName" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="商品价格">
          <el-input ref="goodsPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺">
           <el-select v-model="shopId" @change="getMatchGoodsType" placeholder="请选择">
                <el-option
                v-for="item in shopList"
                :key="item._id"
                :label="item.shopName"
                :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品类型">
           <el-select v-model="goodsTypeId" placeholder="请选择">
                <el-option
                v-for="item in goodsTypeList"
                :key="item._id"
                :label="item.goodsTypeName"
                :value="item._id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
           <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              :limit="1"
              :on-change="changePic"
              :on-exceed="fn"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <img width="200" v-if="goodsPic.length>0" :src="goodsPic"  alt="">
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
        <el-button type="primary" @click="addGoods()">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
    props:["goodsVisible","getGoodsList"],
    data(){
        return {
            shopId:"5bffcbf21cb30d1c7c3f954c",
            shopList:[],
            goodsTypeId:'',
            goodsTypeList:[],
            goodsPic:'',
        }
    },
    methods:{
        fn(){
            this.$message.error('文件数量过多');
        },
        changePic(file){   
            var _this = this;
            this.$refs.upload.clearFiles();
            var render = new FileReader();  //将文件转换为base64格式
            render.readAsDataURL(file.raw);   
            render.onload = function(){
            // console.log(this.result);//this.result 为base64格式
            _this.goodsPic = this.result
            }
        },
        getAllShop(){
            this.$ajax.get("getAllShopList").then((data)=>{
                // console.log(data);
                this.shopList = data.shopList;

            })
        },
        getMatchGoodsType(){
            this.$ajax.get("getMatchGoodsType",{
                params:{
                    id:this.shopId,
                }
            }).then((data)=>{
                this.goodsTypeList = data.goodsTypeList;
            })
        },
        addGoods(){
            var formdata = new FormData();
            formdata.set("goodsName",this.$refs.goodsName.$data.currentValue);
            formdata.set("goodsPrice",this.$refs.goodsPrice.$data.currentValue);
            formdata.set("shopId",this.shopId);
            formdata.set("goodsTypeId",this.goodsTypeId)
            formdata.set("goodsPic",document.querySelector(".el-upload__input").files[0]);
            this.$ajax.post("addGoodsList",formdata).then((data)=>{
                if(data.ok==1){
                    this.getGoodsList();
                    this.$emit("update:goodsVisible",false); //关闭弹窗
                    this.$refs.upload.clearFiles();
                    this.$refs.goodsName.$data.currentValue = "";
                    this.$message({
                        message:data.msg,
                        type:"success",
                    })
                }
            })
        }
    },
    mounted(){
        this.getAllShop();
        this.getMatchGoodsType()
    }
}

</script>
<style scoped>
</style>

<template>
 <div>
    <el-dialog title="添加商品类型" :visible="goodsTypeVisible" @update:visible="v=>$emit('update:goodsTypeVisible',v)">
        <el-form>
            <el-form-item label="商品类型" >
            <el-input ref="goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商铺">
                <el-select v-model="shopId" placeholder="请选择">
                    <el-option
                    v-for="item in shopList"
                    :key="item._id"
                    :label="item.shopName"
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
              :on-exceed="fn"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!-- <img width="200" v-if="shopPic.length>0" :src="shopPic"  alt=""> -->
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addGoodsType">确 定</el-button>
        </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
    props:["goodsTypeVisible","getGoodsTypeList"],
    data () {
        return {
           shopList:[],
           shopId:"",
        }
    },
   
    methods:{
        getAllshop(){
            this.$ajax.get("/getAllShopList",{}).then((data)=>{
                this.shopList = data.shopList;
            })
        },
        fn(){
            this.$message.error('文件数量过多');
        },
        addGoodsType(){
          var formdata = new FormData();
          formdata.set("goodsTypeName",this.$refs.goodsTypeName.$data.currentValue);
          formdata.set("goodsTypePic",document.querySelector(".el-upload__input").files[0]);
          formdata.set("shopId",this.shopId);

          this.$ajax.post("/addGoodsType",formdata).then((data)=>{
            if(data.ok==1){
                this.getGoodsTypeList();
                this.$refs.upload.clearFiles();
                this.$refs.goodsTypeName.$data.currentValue = "";
                this.$emit("update:goodsTypeVisible",false);
                this.$message({
                message:data.msg,
                type:"success",
                })
            }
          })
        },
    },
    mounted(){
        this.getAllshop();
    }
}

</script>
<style scoped>
  /* $emit('update:goodsTypeVisible',false) */
</style>

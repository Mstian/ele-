<template>
 <div>
    <el-dialog title="添加商铺类别" :visible="dialogFormVisible" @update:visible="v=>$emit('update:dialogFormVisible',v)" >
      <el-form>
        <el-form-item label="商铺类型">
          <el-input ref="shopTypeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商铺类型图片">
           <el-upload
              class="upload-demo"
              ref="upload"
              action="#"
              :limit="1"
              :on-exceed="fn"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
        <el-button type="primary" @click="addShopType">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
  props:["dialogFormVisible","getShopTypeList"],
  data () {
    return {
        // dialogFormVisible:false
    }
  },
  methods:{
    fn(){
        this.$message.error('文件数量过多');
    },
    addShopType(){
      var formdata = new FormData();
      formdata.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);
      formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
      this.$ajax.post("/addShopType",formdata)
        .then((data)=>{
          if(data.ok==1){
            this.$refs.upload.clearFiles();
            this.$refs.shopTypeName.$data.currentValue = "";
            this.$emit("update:dialogFormVisible",false);
            this.getShopTypeList(1);
            this.$message({
              message:data.msg,
              type:"success",
            })
          }else{
            this.$message.error(data.msg);
          }
      })  
    },
  }
}

</script>
<style scoped>
</style>

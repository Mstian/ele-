<template>
 <div>
    <el-dialog title="添加广告类别" :visible="advTypeVisible" @update:visible="v=>$emit('update:advTypeVisible',v)" >
      <el-form>
        <el-form-item label="广告类型">
          <el-input ref="advTypeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="广告类型图片">
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
        <el-button @click="$emit('update:advTypeVisible',false)">取 消</el-button>
        <el-button type="primary" @click="addAdvType">确 定</el-button>
      </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
  props:["advTypeVisible","getAdvTypeList"],
  data () {
    return {
        // dialogFormVisible:false
    }
  },
  methods:{
    fn(){
        this.$message.error('文件数量过多');
    },
    addAdvType(){
        var formdata = new FormData();
        formdata.set("advTypeName",this.$refs.advTypeName.$data.currentValue);
        formdata.set("advTypePic",document.querySelector(".el-upload__input").files[0]);
        this.$ajax.post("addAdvType",formdata).then((data)=>{
            // console.log(data)
            this.getAdvTypeList();
            this.$refs.advTypeName.$data.currentValue = "";
            this.$refs.upload.clearFiles();
            this.$emit("update:advTypeVisible",false);
            this.$message({
                message: '添加广告类型成功',
                type: 'success'
            });
        })
    }
  }
}

</script>
<style scoped>
</style>

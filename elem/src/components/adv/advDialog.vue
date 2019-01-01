<template>
 <div>
    <el-dialog title="添加广告" :visible="advVisible" @update:visible="v=>$emit('update:advVisible',v)">
        <el-form>
            <el-form-item label="广告名称" >
            <el-input ref="advName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="广告类型">
                <el-select v-model="advTypeId" placeholder="请选择">
                    <el-option
                    v-for="item in advTypeList"
                    :key="item._id"
                    :label="item.advTypeName"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
           <el-form-item label="广告图">
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
            <el-button @click="$emit('update:advVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addAdv">确 定</el-button>
        </div>
    </el-dialog>
 </div>
</template>

<script>
export default {
    props:["advVisible","getAdvList"],
    data () {
        return {
            advTypeList:[],
            advTypeId:'',
        }
    },
    methods:{
        fn(){
                this.$message.error('文件数量过多');
        },
        addAdv(){
            console.log(1);
            var formdata = new FormData();
            formdata.set("advName",this.$refs.advName.$data.currentValue);
            formdata.set("advPic",document.querySelector(".el-upload__input").files[0]);
            formdata.set("advTypeId",this.advTypeId);
            this.$ajax.post("addAdv",formdata).then((data)=>{
                this.getAdvList();
                this.$emit("update:advVisible",false); //关闭弹窗
                this.$refs.upload.clearFiles();
                this.$refs.advName.$data.currentValue = "";
                this.$message({
                    message:data.msg,
                    type:"success",
                })
            })
        },
        getAdvTypeList(){
            this.$ajax.get("getAdvTypeList").then((data)=>{
                this.advTypeList = data.advTypeList;
            })
        }
    },
    mounted(){
        this.getAdvTypeList();
    }
}

</script>
<style scoped>
</style>

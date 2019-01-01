<template>
 <div>
     <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="查询">
          <el-input placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <el-button type="primary" @click="advTypeVisible = true">添加广告类别</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加广告类型弹窗 -->
    <advTypeDialog :getAdvTypeList="getAdvTypeList" :advTypeVisible.sync="advTypeVisible"></advTypeDialog>

      <el-table
        :data="advTypeList"
        border
        style="width: 100%">
        <el-table-column
        prop="advTypeName"
        label="广告类型名称"
        width="180"
        >
        </el-table-column>
        <el-table-column
        label="添加日期"
        width="180">
        <template slot-scope="scope">
            <span>{{scope.row.createTime | date}}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="广告ID"
        prop="_id"
        width="180">
        </el-table-column>
        <el-table-column
        label="广告图片">
        <template slot-scope="scope">
            <img style="width:90px" :src="scope.row.advTypePic | imgUrl" alt="">
        </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
 </div>
</template>

<script>
import advTypeDialog from './advTypeDialog'
export default {
    components:{
        advTypeDialog,
      
    },
    data () {
        return {
            advTypeVisible:false,
              advTypeList:[],
        }
    },
    methods:{
        getAdvTypeList(){
            this.$ajax.get("getAdvTypeList").then((data)=>{
                this.advTypeList = data.advTypeList;
            })
        },
        handleDelete(index,row){
            this.$ajax.delete("deleteAdvType",{
                params:{
                    id:row._id,
                }
            }).then((data)=>{
                this.getAdvTypeList();
                this.$message({
                showClose: true,
                message: data.msg,
                });
            })
        }
    },
    mounted(){
        this.getAdvTypeList();
    }
}

</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
</style>

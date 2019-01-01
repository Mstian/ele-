<template>
 <div>
    <div class="toolbar">
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="查询">
            <el-input placeholder="内容"></el-input>
            </el-form-item>
        
            <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
            <el-button type="primary" @click="advVisible = true">添加广告</el-button>
            </el-form-item>
        </el-form>
    </div>
    <advDialog :getAdvList="getAdvList" :advVisible.sync="advVisible"></advDialog>


        <el-table
            :data="advList"
            style="width: 100%">
            <el-table-column
            label="广告日期"
            width="180">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
            </template>
            </el-table-column>
            <el-table-column 
            prop="typeInfo[0].advTypeName"
            label="广告类型"
            >
            </el-table-column>
            <el-table-column
            label="广告名称"
            width="180">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.advName }}</span>
            </template>
            </el-table-column>
            <el-table-column 
            prop="_id"
            label="广告ID"
            >
            </el-table-column>
            <el-table-column
            label="广告图片"
            width="180">
            <template slot-scope="scope">
                 <img style="width:90px" :src="scope.row.advPic | imgUrl" alt="">
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
import advDialog from './advDialog'
export default {
    components:{
        advDialog,
    },
    data () {
        return {
            advVisible:false,
            advList:[],
        }
    },
    methods:{
        getAdvList(){
            this.$ajax.get("/getAdvList").then((data)=>{
                this.advList = data.advList;
            })
        },
        handleDelete(index,row){
            this.$ajax.delete("deleteAdv",{
                params:{
                    id:row._id
                }
            }).then((data)=>{
                 this.getAdvList();
                 this.$message({
                    message:data.msg,
                    type:"success",
                })
            })
        }
    },
    mounted(){
        this.getAdvList();
    }
}

</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
</style>

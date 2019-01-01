<template>
 <div>
     <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="查询">
          <el-input placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <!-- <el-button type="primary" @click="$refs.stDialog.$data.goodsTypeVisible = true">添加商品类别</el-button> -->
           <el-button type="primary" @click="goodsTypeVisible = true">添加商品类别</el-button>
        </el-form-item>
      </el-form>
    </div>
   
    <!-- <goodsTypeDialog ref="stDialog"></goodsTypeDialog> -->
    <!-- <goodsTypeDialog :goodsTypeVisible="goodsTypeVisible" @changevisible="(v)=>{goodsTypeVisible=v}"></goodsTypeDialog> -->
      <goodsTypeDialog :getGoodsTypeList = "getGoodsTypeList" :goodsTypeVisible.sync="goodsTypeVisible"></goodsTypeDialog>

      <!-- 商品类型 -->
       <el-table
            :data="goodsTypeList"
            border
            style="width: 100%">
            <el-table-column
            prop="shopId"
            label="店铺ID">
            </el-table-column>

            <el-table-column
            prop="typeInfo[0].shopName"
            label="店铺名称">
            </el-table-column>

             <el-table-column label="商品类型图片">
                <template slot-scope="scope">
                   <img :src="scope.row.goodsTypePic | imgUrl" style="width:80px;"/>
                </template>
            </el-table-column>
            <el-table-column
            prop="goodsTypeName"
            label="商品类型名称"
            width="180">
            </el-table-column>
            <el-table-column label="添加时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span> {{scope.row.createTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="操作">
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
import goodsTypeDialog from './goodsTypeDialog';
export default {
    components:{
        goodsTypeDialog,
    },
    data () {
        return {
            goodsTypeVisible:false,
            goodsTypeList:[],
        }
    },
    methods:{
       getGoodsTypeList(){
            this.$ajax.get("/getGoodsTypeList").then((data)=>{
               this.goodsTypeList = data.goodsTypeList;
            })
        },
        handleDelete(index,row){
            this.$ajax.delete("deleteGoodsType",{
                params:{
                    id:row._id,
                }
            }).then((data)=>{
                console.log(data)
               this.getGoodsTypeList();
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'success'
                });
            })
        }
    },
    mounted(){
        this.getGoodsTypeList();
    }
}
</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
</style>

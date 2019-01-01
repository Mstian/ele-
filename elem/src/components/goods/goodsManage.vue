<template>
 <div>
     <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="查询">
          <el-input ref="search" placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <el-button type="primary" @click="openGoods">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 添加商品弹出框 -->
     <goodsDialog :getGoodsList="getGoodsList" :goodsVisible.sync="goodsVisible"></goodsDialog>
    <!-- 添加商品弹出框 -->
     <template>
      <el-table
        :data="goodsList"
        style="width: 100%">
         <el-table-column
          prop="_id"
          label="上架日期"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | date}}</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="goodsName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_id"
          label="商品ID"
          width="180">
        </el-table-column>
        <el-table-column
          label="商品图片"
          width="180">
          <template slot-scope="scope">
             <img style="width:90px" :src="scope.row.goodsPic | imgUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="shopName[0].shopName"
          label="商铺名称">
        </el-table-column>
        <el-table-column
          prop="goodsTypeName[0].goodsTypeName"
          label="商品类型">
        </el-table-column>
         <el-table-column 
         width="200"
         label="操作">
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
    </template>

 </div>
</template>

<script>

import goodsDialog from '@/components/goods/goodsDialog'

export default {
  data () {
    return {
      goodsVisible:false,
      goodsList:[],
    }
  },
  components:{
    goodsDialog,
  },
  methods:{
    openGoods(){
      this.goodsVisible = true;
    },
    getGoodsList(){
      this.$ajax.get("getGoodsList").then((data)=>{
        this.goodsList = data.goodsList;
      })
    },
    handleDelete(index,row){
      this.$ajax.delete("deteteGoods",{
        params:{
          id:row._id,
        }
      }).then((data)=>{
        this.getGoodsList();
        this.$message({
          message: data.msg,
          type: 'success'
        });
      })
    }
  },
  mounted(){
    this.getGoodsList();
  }
}

</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
</style>

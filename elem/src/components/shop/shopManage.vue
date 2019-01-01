<template>
 <div>
     <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="查询">
          <el-input ref="search" placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="getShopList()">查询</el-button>
          <el-button type="primary" @click="openShop('')">添加店铺</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 添加店铺弹窗 -->
    <shopDialog v-if="shopVisible" :shopId="shopId" :getShopList="getShopList" :shopVisible.sync="shopVisible"></shopDialog>
    <!-- 添加店铺弹窗 -->
    <div class="showSh">
      <el-table
          border
          :data="shopList"
          style="width: 100%">
          <el-table-column
            prop="shopName"
            label="店铺名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="typeInfo[0].shopTypeName"
            label="店铺类型"
            width="180">
            <!-- {{scope.row.typeInfo[0].shopTypeName}} -->
          </el-table-column>
          <el-table-column
            prop="_id"
            label="ID">
          </el-table-column>
          <el-table-column
            label="图片">
              <template slot-scope="scope">
                <img style="width:80px;" :src="scope.row.shopPic | imgUrl" alt="">
              </template>
          </el-table-column>
          <el-table-column
            label="添加时间">
             <template slot-scope="scope">
                {{scope.row.createTime | date}}
             </template>
          </el-table-column>
          <el-table-column label="操作" width="400">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                @click="openShop(scope.row._id)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  <el-button
                  size="mini"
                  type="primary"
                  @click="(scope.$index, scope.row)">添加商品类别</el-button>
                  <el-button
                  size="mini"
                  type="primary"
                  @click="(scope.$index, scope.row)">添加商品</el-button>
              </template>
          </el-table-column>
    </el-table>
    </div>
 </div>
</template>

<script>
import shopDialog from './shopDialog'
export default {
  data () {
    return {
        shopVisible:false,
        shopList:[],
        shopId:"",
    }
  },
  components:{
    shopDialog,
  },
  methods:{
    getShopList(){
      this.$ajax.get("/getShopList",{
        params:{
          search:this.$refs.search.currentValue,
        }
      })
        .then((data)=>{
          this.shopList = data.shopList;
      })
    },
    handleDelete(index,row){
       this.$ajax.get("/deleteShop",{
         params:{
           id:row._id
         }
       }).then((data)=>{
         if(data.ok==1){
            this.getShopList();
             this.$message({
               message:data.msg,
               type:"success",
          })
         }
       })
    },
    openShop(id){
      this.shopId = id;
      this.shopVisible=true;
    }
  },
  mounted(){
    this.getShopList();
  }
}

</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
</style>


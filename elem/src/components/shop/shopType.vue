<template>
 <div>
   
    <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="查询">
          <el-input placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
          <el-button type="primary" @click="dialogFormVisible = true">添加店铺类别</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="shopTypeList">
         <template>
            <el-table
              :data="shopTypeList"
              style="width: 100%">
              <el-table-column
                label="图片"
               >
                <template slot-scope="scope">
                    <!-- <img :src="'/upload/'+scope.row.shopTypePic" style="width:80px;"/> -->
                      <img :src="scope.row.shopTypePic | imgUrl" style="width:80px;"/>
                </template>
              </el-table-column>
                <el-table-column
                label="ID"
                >
                <template slot-scope="scope">
                  <i class="el-icon-bell"></i>
                  <span style="margin-left: 10px">{{ scope.row._id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="添加时间"
                >
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.createTime | date }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="类型"
               >
                <template slot-scope="scope">
                  <span>{{scope.row.shopTypeName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="310">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="openAddShop(scope.row._id)">添加店铺</el-button>
                  <el-button
                    size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
    </div>
      <div class="block toolbar">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageSum"
          :current-page.sync="pageIndex"
          @current-change='getShopTypeList'
          >
        </el-pagination>
      </div>
        <!-- 添加商铺类型弹出框 -->
        <shopTypeDialog
            :getShopTypeList="getShopTypeList"
            :dialogFormVisible.sync="dialogFormVisible" >
        </shopTypeDialog>
        <!-- 添加商铺类型弹出框 -->
        <!-- 添加商铺弹出框 -->
        <shopDialog v-if="shopVisible" shopId="" :typeId="typeId" :shopVisible.sync="shopVisible" ></shopDialog>
        <!-- 当shopVisible为真时渲染该组件，执行一次该组件下面的mounted钩子函数 -->
        <!-- 添加商铺弹出框 -->
 </div>
</template>

<script>
import shopTypeDialog from './shopTypeDialog';
import shopDialog from './shopDialog'
export default {
  components:{
    shopTypeDialog,
    shopDialog
  },
  data () {
    return {
      typeId:"",
      shopVisible:false,
      dialogFormVisible:false,
      dialogshop:false,
      shopTypeList:[],
      shopTypeEnum:[],
      pageSum:1,
      pageIndex:1
    }
  },
  methods:{
    openAddShop(id){
      this.shopVisible = true;
      this.typeId = id;
    },
    fn(){
        this.$message.error('文件数量过多');
    },
    getShopTypeList(pageIndex){
      this.$ajax.get('/getShopTypeList',{
         params:{
           pageIndex,
         }
      }).then((data)=>{
        this.shopTypeList = data.shopTypeList;
        this.shopTypeEnum = data.shopTypeEnum;
        this.pageSum = data.pageSum;
        this.typeId = data._id;
      })
    },
    handleDelete(index,row){
      this.$ajax.delete('/deleteShopType',{
        params:{
          id:row._id,
        }
      }).then((data)=>{
        if(data.ok==1){
          this.getShopTypeList(this.pageIndex);
          this.$message({
               message:data.msg,
               type:"success",
          })
        }
      })
    }
  },
  mounted(){
    this.getShopTypeList(1);
  }
}

</script>
<style scoped>
.toolbar .el-form-item{
  margin: 0;
}
.el-pagination{
  text-align: center;
}
</style>

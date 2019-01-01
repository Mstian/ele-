<template>
 <div>
    <div class="toolbar">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="搜索">
          <el-input placeholder="内容"></el-input>
        </el-form-item>
    
        <el-form-item>
          <el-button type="primary" @click="">查询</el-button>
        </el-form-item>
      </el-form>
    </div> 
    <el-table
    v-loading="loading"
    border
    :data="adminLogList"
    style="width: 100%">
    <el-table-column label="ID" prop="_id"></el-table-column>
    <!-- prop你要遍历的地方的属性 -->
    <el-table-column
      label="日期"
      >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.addTime | date }}</span> 
        <!-- scope.row  表示adminLogList中的每一个元素项-->
      </template>
    </el-table-column>
    <el-table-column label="详情" prop="detail"></el-table-column>
    <!-- <el-table-column label="管理员" prop="adminInfo[0].adminName"></el-table-column> -->
       <el-table-column label="管理员">
          <template slot-scope="scope">
              {{scope.row.adminInfo[0].adminName}}
          </template>
       </el-table-column>
       <el-table-column label="类型">
          <template slot-scope="scope">
              <!-- {{logTypeEnum[scope.row.logType]}} -->
              {{scope.row.typeInfo[0].typeName}}
          </template>
       </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="pagination toolbar">
          <el-pagination
            background
            @current-change="getAdminList"
            :current-page.sync="pageIndex"
            :page-count="pageSum"
            layout="prev, pager, next"
            >
          </el-pagination>
    </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      adminLogList:[],
      logTypeEnum:{},
      loading:true,
      pageSum:1,
      pageIndex:1
    }
  },
  mounted(){
    this.getAdminList(1);
  },
  methods:{
    getAdminList(pageIndex){
      // console.log(pageIndex)
      this.loading = true;
      this.$ajax.get("/getAdminLogList",{
        params:{
          pageIndex,
        }
      }).then((data)=>{
        this.adminLogList = data.adminLogList;
        this.logTypeEnum = data.logTypeEnum;
        this.pageSum = data.pageSum;
        // console.log(data);
        this.loading = false;
      })
    },
    handleDelete(index,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.get("/deleteAdminLog",{
            params:{
              id:row._id,
            }
          }).then((data)=>{
            if(data.ok==1){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
                this.getAdminList(this.pageIndex);
            }
          })
        }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
  }
}

</script>
<style scoped>
 
</style>

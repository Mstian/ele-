<template>
 <div>
    <el-table
      border
        :data="adminList"
      style="width: 100%">
      <el-table-column
        prop="adminInfo[0].adminName"
        label="管理员"
       >
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID"
       >
      </el-table-column>
      <el-table-column
        label="登录日期">
        <template slot-scope="scope">
            {{ scope.row.addTime | date }}
        </template>
      </el-table-column>
       <el-table-column
        prop="adminInfo[0].passWord"
        label="密码"
       >
      </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="changePwd(scope.$index, scope.row)">修改密码</el-button>
      </template>
    </el-table-column>
    </el-table>
 </div>
</template>

<script>
export default {
  data () {
    return {
        adminList:[],
    }
  },
  mounted(){  
      this.$ajax.get("/checkAdmin").then((data)=>{
          // console.log(data)
          this.adminList = data.adminLogList;
      })
  },
  methods:{
      changePwd(index,row){
          // console.log(row._id)
      }
  }
}

</script>
<style scoped>
</style>

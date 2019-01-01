<template>
  <!-- <div id="app">
    <img src="./assets/logo.png">
    <el-row>
      <el-button @click="OUT_LOGIN">退出登录</el-button>
    </el-row>
  </div> -->
  <el-container>
      <el-header>
          <el-row>
              <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
                  <strong>{{isCollapse?'饿':'饿了么后台管理系统'}}</strong>
              </el-col>
              <el-col :span="8" class="tools">
                  <i :class="isCollapse ? 'el-icon-circle-check-outline':'el-icon-circle-close-outline'" @click="isCollapse=!isCollapse"></i>
              </el-col>
              <el-col class="admin-Info" :span="8">
                  <el-dropdown>
                      <span class="el-dropdown-link">
                          <img src="./assets/logo.png" alt=""> 
                          <span>{{$store.state.admin.adminName}}</span>
                          <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <span @click="OUT_LOGIN">退出登录</span>  
                        </el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </el-col>
          </el-row>
      </el-header>
      <el-container>
          <el-aside :style="{width:isCollapse? 'auto':'240px'}">
              <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            </el-radio-group>
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
            :collapse-transition="false"
            :collapse="isCollapse">
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span slot="title" @click="$router.push('/')">查看日志</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i  class="el-icon-edit"></i>
                <span slot="title" @click="$router.push('/addAdmin')">添加管理员</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title" @click="$router.push('/checkAdmin')">查看管理员</span>
              </el-menu-item>
               <el-menu-item index="4">
                <i class="el-icon-star-on"></i>
                <span slot="title" @click="$router.push('/shopType')">商铺类型管理</span>
              </el-menu-item>
              <el-menu-item index="5">
                <i class="el-icon-refresh"></i>
                <span slot="title" @click="$router.push('/shopManage')">商铺管理</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-goods"></i>
                <span slot="title" @click="$router.push('/goodsType')">商品类型管理</span>
              </el-menu-item>
               <el-menu-item index="7">
                <i class="el-icon-bell"></i>
                <span slot="title" @click="$router.push('/goodsManage')">商品管理</span>
              </el-menu-item>
              <el-menu-item index="8">
                <i class="el-icon-picture"></i>
                <span slot="title" @click="$router.push('/advType')">广告类型管理</span>
              </el-menu-item>
              <el-menu-item index="9">
                <i class="el-icon-upload"></i>
                <span slot="title" @click="$router.push('/advManage')">广告管理</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
           <router-view></router-view>
           <!--  -->
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  name: 'App',
  methods:{
    ...mapMutations(["OUT_LOGIN"]),
  },
  data(){
    return {
      isCollapse:true
    }
  },
  mounted(){

  }
}
</script>

<style>
*{
  padding: 0;
  margin  :0;
}
.el-header{
  padding: 0;
  height: 60px;
  color: #fff;
  background-color: #2d7cf1;
}
.logo{
  font-size: 25px;
  text-align: center;
  line-height: 60px;
  width: 240px;
  border-right: 1px solid #ddd;
}
.el-dropdown-link img{ 
    width: 35px;
    height: 35px;
    vertical-align: middle;
}
.el-dropdown-link{
  color: #fff;
}
.admin-Info{
  float: right;
  text-align: right;
  padding-right: 40px;
  line-height: 60px;
}
.tools{
  font-size: 25px;
  color: #fff;
  line-height: 60px;
  padding-left: 20px;
}
 .el-table th,.el-table td{
    text-align: center;
  }
  .toolbar{
    background-color: #f4f4f4;
    padding: 10px;
    margin:10px 0;
  }
  .toobar .el-form-item{
    margin: 0;
  }
</style>

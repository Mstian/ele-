<template>
 <div>
      <div id="slideShow">
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="item in shopTypeList">
                <div class="slidebox">
                    <div @click="shopTypeToShop(info._id)" v-for="info in item" class="slidePic">
                        <img :src="'http://127.0.0.1/upload/'+info.shopTypePic" alt="">
                        <p>{{info.shopTypeName}}</p>
                    </div>
                </div>
            </mt-swipe-item>
        </mt-swipe>
    </div>
 </div>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
        shopTypeList:[],
    }
  },
  methods:{
    getShopTypeList(){
        axios.get("http://127.0.0.1:88/getShopTypeList").then(({data})=>{
            this.shopTypeList = data.shopTypeList;
        })
    },
    shopTypeToShop(id){
        this.$router.push(`/shopTypeToShop/${id}`)
    }
  },
  mounted(){
      this.getShopTypeList();
  }
}

</script>
<style scoped>
#slideShow{
    height: 40vw;
    background-color: #fff;
}
.slidebox{
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    font-size: 12px;
    color:#666;
    text-align: center;
}
.slidebox img{
    width: 50%;
}
.slidePic{
    width: 20%;
    height: 20vw;
    background-color: #fff;
    box-sizing: border-box;
}
</style>

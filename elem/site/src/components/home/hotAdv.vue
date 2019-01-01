<template>
 <div>
     <div id="hotAdv">
        <div class="adType" v-for="item in hotAdvList">
            <p>{{item.advName}}</p>
            <img :src="'http://127.0.0.1/upload/'+item.advPic" alt="" />
        </div>
    </div>
 </div>
</template>

<script>
import axios from "axios";
export default {
  data () {
    return {
         hotAdvList:[],
    }
  },
  methods:{
    getHotAdv(){
        axios.get("http://127.0.0.1:88/getHotAdvList").then(({data})=>{
            this.hotAdvList = data.hotAdvList;
            // console.log(this.hotAdvList);
        })
    },
  },
  mounted(){
    this.getHotAdv();
  }
}

</script>
<style scoped>
#hotAdv{
    height: 40vw;
    /* background-color: pink; */
    display:flex;
    justify-content: space-between;
    margin-top: 5vw;
}
.adType{
    width: 46vw;
    height: 40vw;
    background-color: #eee;
}
.adType p{
   font-size:18px;
   padding: 2px;
   padding-left: 6vw;
   font-weight: bold;
   color: #000;
}
.adType img{
    width: 30vw;
    margin-left: 10vw;
}
</style>

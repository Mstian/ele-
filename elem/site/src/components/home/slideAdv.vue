<template>
 <div>
      <div id="slideAdv">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in slideAdvList">
                <img :src="'http://127.0.0.1/upload/'+item.advPic" alt="">
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
         slideAdvList:[]
    }
  },
  methods:{
    getSlideAdv(){
        axios.get("http://127.0.0.1:88/getSlideAdv").then(({data})=>{
            this.slideAdvList = data.slideAdvList;
        })
    }
  },
  mounted(){
      this.getSlideAdv()
  }
}

</script>
<style scoped>
#slideAdv{
    height:25vw;
    margin-top: 5vw;
}
#slideAdv img{
    height: 100%;
    width: 100%;
}
</style>

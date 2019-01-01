<template>
 <div>这是study组件
     <button @click="fn('thisp')">点击</button>
     <p ref="thisp">这是一个p标签</p>
 </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted(){
    //   console.log(this.$refs)
  },
  methods:{
      fn(refName){
        //   console.log(this.$refs.thisp.innerHTML)
        // console.log(this.$refs['thisp'].innerHTML)
        console.log(this.$refs[refName].innerHTML);
      }
  }
}

</script>
<style scoped>
</style>

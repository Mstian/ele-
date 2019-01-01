import axios from 'axios'
export default{
    state:{
        shopInfo:{},
        shopId:"",
    },
    mutations:{
        CHANGE_SHOPINFO(state,info){
            state.shopInfo = info.data.shopInfo;
            state.shopId = info.id;
        }
    },
    actions:{
        getShopInfo({commit,state},{id}){
            axios.get("http://127.0.0.1:88/getShopInfo",{
              params:{
                id,
              }
            }).then(({data})=>{
              commit("CHANGE_SHOPINFO",{data,id});
            })
          },
    },
    getters:{

    }
}
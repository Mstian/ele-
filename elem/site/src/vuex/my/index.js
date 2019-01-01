import axios from 'axios'
export default{
    state:{
        code:"",
        goldNum:"",
    },
    mutations:{
        CHANGE_CODE(state,data){
            state.code = data.code;
        },
        CHANGE_GOLDNUM(state,data){
            state.goldNum = data.goldNum;
        }
    },
    actions:{
        sendInfo({commit},{phoneId}){
            axios.post("http://127.0.0.1:88/sendInfo",{
                phoneId,
            }).then(({data})=>{
                commit("CHANGE_CODE",data);
            })
        },
        login({commit},{phoneId,code,success}){
            axios.post("http://127.0.0.1:88/login",{
                phoneId,
                code,
            }).then(({data})=>{
                if(data.ok==1){
                    localStorage.userName = data.userName;
                    localStorage.userId = data.userId;
                    commit("CHANGE_GOLDNUM",data);
                    success()
                }
            })
        }
    },
    getters:{

    }
}
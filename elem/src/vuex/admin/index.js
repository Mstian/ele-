import axios from "axios"
import Bus from "@/Bus"
export default{
    state:{
        adminName:localStorage.adminName || null,      //管理员账号
        adminId:localStorage.adminId || null,        //管理员Id
    },
    mutations:{
        CHANGE_ADMININFO(state,adminInfo){
            state.adminName = localStorage.adminName = adminInfo.adminName,
            state.adminId = localStorage.adminId = adminInfo.adminId
        },
        OUT_LOGIN(state){
            localStorage.clear();
            state.adminName = localStorage.adminName;
            state.adminId = localStorage.adminId;
            Bus.$message({
                showClose: true,
                message: '请登录'
            });
        }
    },
    actions:{
        login({commit},{adminName,passWord,success,error}){
            axios({
                url:"/login",
                method:"post",
                data:{
                    adminName,
                    passWord,
                }
            }).then((data)=>{
                if(data.ok==1){
                    commit("CHANGE_ADMININFO",data)
                    success(data.msg);
                }else{
                    error(data.msg)
                }
            })
        }
    },
    getters:{

    },
    modules:{
        
    }
}
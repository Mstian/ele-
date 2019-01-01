const db = require("../modules/db");
const common = require("../modules/common");
const eleEnum = require("../modules/eleEnum");
const md5 = require("md5");
module.exports.login = function(req,res){    //登录接口
    db.findOne("adminList",{
        adminName:req.body.adminName,
        passWord:md5(req.body.passWord+"ele")
    },function(err,results){
        if(results){
            db.insertOne("adminLog",{
                adminId:results._id,
                logType:4,
                detail:results.adminName+'在'+common.getNowTime()+'登录了该系统',
                addTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    adminId:results._id,
                    adminName:results.adminName,
                    msg:"登陆成功"
                })
            }) 
        }else{
            res.json({
                ok:2,
                msg:"账号或密码错误"
            })
        }
    })
}
module.exports.getAdminLogList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    db.count("adminLog",{},function(count){
        var pageSum = Math.ceil(count/pageNum);
        if(pageSum<1){
            pageSum = 1;
        }
        if(pageIndex>pageSum){
            pageIndex = pageSum
        }
        db.getAdminLogList((pageIndex-1)*pageNum,pageNum,function(err,adminLogList){
            setTimeout(()=>{
                res.json({
                    ok:1,
                    msg:"获取日志成功",
                    adminLogList,
                    logTypeEnum:eleEnum.logTypeEnum,
                    pageSum
                })
            },1000) 
        })
    })
}
module.exports.checkAdmin = function(req,res){
    db.checkAdmin(function(err,adminLogList){
        res.json({
            ok:1,
            msg:"获取admin信息成功",
            adminLogList,
            logTypeEnum:eleEnum.logTypeEnum,
        })
    })
}
module.exports.deleteAdminLog = function(req,res){
    db.deleteOneById("adminLog",req.query.id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功",
        })
    })
}
module.exports.addAdmin = function(req,res){
    var adminName = req.body.adminName;
    var passWord = md5(req.body.passWord+"ele");
    db.insertOne("adminList",{
        adminName,
        passWord,
    },function(err,results){
        res.json({
            ok:1,
            msg:"添加管理员成功",
            adminInfo:results,
        })
    })
}
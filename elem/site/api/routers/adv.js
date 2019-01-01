const {upPic} = require("../modules/upPic");
const db = require("../modules/db")
const mongodb = require('mongodb')
module.exports.addAdvType = function(req,res){
    upPic(req,"advTypePic",function(obj){
        if(obj.ok==1){
            db.insertOne("advTypeList",{
                advTypeName:obj.params.advTypeName,
                advTypePic:obj.newPicName,
                createTime:Date.now(),
            },function(){
                res.json({
                    ok:1,
                    msg:"上传广告类型成功"
                })
            })
        }
    })
}

module.exports.getAdvTypeList = function(req,res){
    var sortObj = {
        createTime:-1
    }
    db.find("advTypeList",{sortObj},function(err,advTypeList){
        res.json({
            ok:1,
            msg:"获取广告类型成功",
            advTypeList,
        })
    })
}
module.exports.deleteAdvType = function(req,res){
    var id = req.query.id;
    db.deleteOneById("advTypeList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功",
        })
    })
}

module.exports.getAdvTypeList = function(req,res){
    db.find("advTypeList",{},function(err,advTypeList){
        res.json({
            ok:1,
            msg:"获取广告类型列表成功",
            advTypeList,
        })
    })
}
module.exports.addAdv = function(req,res){
    upPic(req,"advPic",function(obj){
        if(obj.ok==1){
            db.insertOne("advList",{
                advName:obj.params.advName,
                advPic:obj.newPicName,
                advTypeId:mongodb.ObjectId(obj.params.advTypeId),
                createTime:Date.now()
            },function(err,results){
                res.json({
                    ok:1,
                    msg:"插入广告成功"
                })
            })
        }
    })
}

module.exports.getAdvList = function(req,res){
    db.getAdvList(function(err,advList){
        res.json({
            ok:1,
            msg:"获取广告成功",
            advList,
        })
    })
}

module.exports.deleteAdv = function(req,res){
    var id = req.query.id;
    db.deleteOneById("advList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}
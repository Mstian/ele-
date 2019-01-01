const {upPic} = require("../modules/upPic");
const db = require("../modules/db")
const mongodb = require('mongodb')
module.exports.addShopType = function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok===1){
            db.insertOne("shopTypeList",{
                shopTypeName:obj.params.shopTypeName,
                shopTypePic:obj.newPicName,
                createTime:Date.now(),
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        } else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }  
    })
}
module.exports.addShopList = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok===1){
            db.insertOne("shopList",{
                shopName:obj.params.shopName,
                shopPic:obj.newPicName,
                shopTypeId:mongodb.ObjectId(obj.params.shopTypeId),
                createTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    msg:"添加店铺成功"
                })
            })
        }
    })
}
module.exports.getShopList = function(req,res){
    var search = req.query.search;
    var whereObj ={
       shopName:new RegExp(search)
    } 
    db.getShopList(whereObj,function(err,shopList){
        res.json({
            ok:1,
            shopList,
        })
    })
}
module.exports.getShopTypeList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 3;
    db.count("shopTypeList",{},function(count){
        var pageSum = Math.ceil(count/pageNum);
        if(pageIndex>pageSum){
            pageIndex = pageSum;
        }
        if(pageIndex<1){
            pageIndex = 1
        }
        var obj = {
            sortObj:{
                createTime:-1,
            },
            skipNum:(pageIndex-1)*pageNum,
            limitNum:pageNum,
        }
        db.find("shopTypeList",obj,function(err,shopTypeList){
            res.json({
                ok:1,
                msg:"查找成功",
                shopTypeList,
                // shopTypeEnum:{
                //     "1":"美食",
                //     "2":"水果",
                //     "3":"饮品"
                // },
                pageSum,
            })
        })
    })
}
module.exports.deleteShopType = function(req,res){
    var id = req.query.id;
    db.deleteOneById("shopTypeList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}
module.exports.getShopType = function(req,res){
    db.find("shopTypeList",{},function(err,shopTypeList){
        res.json({
            shopTypeList,
            ok:1,
            msg:"查找type成功",
        })
    })
}
module.exports.deleteShop = function(req,res){
    db.deleteOneById("shopList",req.query.id,function(){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}
module.exports.getShopInfoById=function(req,res){
    db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
        res.json({
            ok:1,
            msg:"查找该条信息成功",
            shopInfo,
        })
    })
}
module.exports.upShopList = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok==2){
            res.json({
                ok:2,
                msg:obj.msg
            })
        }else{
            var upObj = {
                $set:{
                    shopName:obj.params.shopName,
                    shopTypeId:mongodb.ObjectId(obj.params.shopTypeId)
                }
            }
            if(obj.newPicName){
                upObj.$set.shopPic = obj.newPicName;
            }
            db.updateOneById("shopList",obj.params.shopId,upObj,function(){
                res.json({
                    ok:1,
                    msg:"修改成功"
                })
            })
        }
    })
}
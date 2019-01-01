const {upPic} = require("../modules/upPic");
const db = require("../modules/db")
const mongodb = require('mongodb')
module.exports.addGoodsType = function(req,res){
    upPic(req,"goodsTypePic",function(obj){
       
        if(obj.ok==1){
            db.insertOne("goodsTypeList",{
                goodsTypeName:obj.params.goodsTypeName,
                goodsTypePic:obj.newPicName,
                shopId:mongodb.ObjectId(obj.params.shopId),
                createTime:Date.now(),
            },function(){
                res.json({
                    ok:1,
                    msg:"商品类型添加成功",
                })
            })
        }else{
            res.json({
                ok:2,
                msg:"商品类型添加失败"
            })
        }
    })
}

module.exports.getGoodsTypeList = function(req,res){
    db.getGoodsTypeList(function(err,goodsTypeList){
        res.json({
            ok:1,
            msg:"获取商品信息成功",
            goodsTypeList,
        })
    })
}
module.exports.getAllshop = function(req,res){
    db.find("shopList",{},function(err,shopList){
        res.json({
            ok:1,
            msg:"获取商铺信息成功",
            shopList,
        })
    })
}

module.exports.deleteGoodsType = function(req,res){
    var id = req.query.id;
    db.deleteOneById("goodsTypeList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}

module.exports.getMatchGoodsType = function(req,res){ //根据商铺ID查找对应得商品类型
    var id = req.query.id;
    if(id == ""){
        res.json({
            ok:2,
            msg:"没有id哦"
        })
    }else{
        var whereObj = {
            shopId: mongodb.ObjectId(id)
        }
        db.find("goodsTypeList",{whereObj},function(err,goodsTypeList){
            res.json({
                ok:1,
                msg:"查找成功",
                goodsTypeList,
            })
        })
    }
}

module.exports.addGoodsList = function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok==1){
            db.insertOne("goodsList",{
                goodsName:obj.params.goodsName,
                goodsPrice:obj.params.goodsPrice/1,
                shopId:mongodb.ObjectId(obj.params.shopId),
                goodsTypeId:mongodb.ObjectId(obj.params.goodsTypeId),
                goodsPic:obj.newPicName,
                createTime:Date.now()
            },function(err,results){
                res.json({
                    ok:1,
                    msg:"添加商品成功"
                })
            })
        }
    })
}

module.exports.getGoodsList = function(req,res){
    db.getGoodsList(function(err,goodsList){
        res.json({
            ok:1,
            msg:"获取商品列表成功",
            goodsList,
        })
    })
}

module.exports.deleteGoodsList = function(req,res){
    var id = req.query.id;
    db.deleteOneById("goodsList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功"
        })
    })
}
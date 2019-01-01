const express = require("express");
const bodyParser = require("body-parser");
const db = require("./modules/db");
const common = require("./modules/common");
const mongodb = require('mongodb')
const app = express();

function getCode(max,min){
    var num =Math.round(Math.random()*(max-min)+min);
    return num; 
}

// const admin = require("./routers/admin")
// const shop = require("./routers/shop")
// const goods = require("./routers/goods")
// const adv = require("./routers/adv")
app.use(express.static("../../api"))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:false
// }))
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
})

app.get("/getShopTypeList",function(req,res){
    db.find("shopTypeList",{},function(err,shopTypeList){
        var arr = shopTypeList;
        var num = Math.ceil(arr.length/10);
        var shopTypeList = [];
        for(var i = 0; i<num; i++){
            shopTypeList[i] = [];
            for(var j = i*10;j<i*10+10 && j<arr.length; j++){
                shopTypeList[i].push(arr[j]);
            }
        }
        res.json({
            ok:1,
            msg:"查找商品类型成功",
            shopTypeList,
        })
    }) 
})

app.get("/getHotAdvList",function(req,res){
    var whereObj = {
        advTypeId:mongodb.ObjectId("5bff5f588dcbd70c181551dd")
    }
    db.find("advList",{whereObj},function(err,hotAdvList){
        res.json({
            ok:1,
            msg:"获取成功",
            hotAdvList,
        })
    })
})

app.get("/getSlideAdv",function(req,res){
    var whereObj = {
        advTypeId:mongodb.ObjectId("5bff5e538dcbd70c181551dc")
    }
    db.find("advList",{whereObj},function(err,slideAdvList){
        res.json({
            ok:1,
            msg:"获取成功",
            slideAdvList,
        })
    })
})

app.get("/getShopList",function(req,res){
    var type = req.query.type;
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var skip = (pageIndex-1)*pageNum;
    var nowList = [];
    var sortObj = {};
    if(type == 2){
        sortObj = {
            createTime:-1
        }
    }else if(type == 3){
        sortObj = {
            createTime:1
        }
    }else if(type == 4){
        sortObj = {
            shopName:-1
        }
    }else{
        sortObj = {}
    }
    db.find("shopList",{sortObj},function(err,shopList){
        var arr = shopList;
        for(var i = skip; i<skip+pageNum;i++){
            if(!arr[i]){
                break;
            }
            nowList.push(arr[i]);
        }
        setTimeout(()=>{
            res.json({
                ok:1,
                msg:"查找成功",
                nowList,
            })
        },1000)
    })
})
//登录模块

app.post("/sendInfo",function(req,res){
    var phoneId = req.body.phoneId;
    var code = getCode(999999,100000);
    db.insertOne("codeList",{
        phoneId,
        code,
        createTime:Date.now
    },function(err,results){
        res.json({
            ok:1,
            msg:"发送信息成功",
            code,
        })
    })
})

app.post("/login",function(req,res){
    var phoneId = req.body.phoneId;
    var code = req.body.code/1;
    db.findOne("codeList",{phoneId,code},function(err,results){
        if(err){
            res.json({
                ok:2,
                msg:"您的账号或验证码错误"
            })
        }else{
            db.findOne("userList",{
                userName:phoneId,
            },function(err,results){
                if(!results){
                    db.insertOne("userList",{
                        userName:phoneId,
                        goldNum:99999,
                    },function(err,results){
                        db.findOne("userList",{
                            userName:phoneId,
                        },function(err,results){
                            res.json({
                                ok:1,
                                msg:"用户刚注册",
                                userName:results.userName,
                                userId:results._id,
                                goldNum:results.goldNum
                            })
                        })
                    })  
                }else{
                    res.json({
                        ok:1,
                        msg:"用户存在",
                        userName:results.userName,
                        userId:results._id,
                        goldNum:results.goldNum
                    })
                }
            })
        }
    })
})

//商铺详情
app.get("/getShopInfo",function(req,res){
    var id = req.query.id;
    db.findOneById("shopList",id,function(err,shopInfo){
        res.json({
            ok:1,
            msg:"获取店铺信息成功",
            shopInfo
        })
    })
})

app.get("/getShopListById",function(req,res){
    var id = req.query.id;
    var whereObj = {
        shopTypeId:mongodb.ObjectId(id)
    }
    var type = req.query.type/1;
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 5;
    var skip = (pageIndex-1)*pageNum;
    var nowList = [];
    var sortObj = {};
    if(type == 2){
        sortObj = {
            createTime:-1
        }
    }else if(type == 3){
        sortObj = {
            createTime:1
        }
    }else if(type == 4){
        sortObj = {
            shopName:-1
        }
    }else{
        sortObj = {}
    }
    db.find("shopList",{whereObj,sortObj},function(err,shopList){
        var arr = shopList;
        for(var i = skip; i<skip+pageNum;i++){
            if(!arr[i]){
                break;
            }
            nowList.push(arr[i]);
        }
        setTimeout(()=>{
            res.json({
                ok:1,
                msg:"查找成功",
                nowList,
            })
        },1000)
    })
})

//获取店铺下的商品类型
app.get("/getGoodsTypeList",function(req,res){
    var shopId = mongodb.ObjectId(req.query.shopId);
    var whereObj = {
        shopId,
    }
    db.find("goodsTypeList",{whereObj},function(err,goodsTypeList){
        res.json({
            ok:1,
            msg:"获取商品类型成功",
            goodsTypeList,
        })
    })
})

app.get("/getGoodsList",function(req,res){
    var goodsTypeId = mongodb.ObjectId(req.query.goodsTypeId);
    var whereObj = {
        goodsTypeId,
    }
    db.find("goodsList",{whereObj},function(err,goodsList){
        res.json({
            ok:1,
            msg:"获取商品列表成功",
            goodsList
        })
    })
})


//购物车逻辑

//添加购物车
app.get("/addToCar",function(req,res){
    var goodsId = req.query.goodsId;
    var userId = req.query.userId;
    var whereObj = {
        goodsId,
        userId,
    }
    db.findOne("carList",whereObj,function(err,results){
        if(results){ //找到了修改buyNum
            var upObj = {
                $inc:{
                    buyNum:1,
                }
            }
            db.updateOne("carList",whereObj,upObj,function(err,results){
                res.json({
                    ok:1,
                    msg:"修改成功",
                })
            })
        }else{ // 没找到添加一条信息
            // goodsInfo,
            // userId,
            // buyNum
            // createTime,
            db.findOneById("goodsList",goodsId,function(err,goodsInfo){
                db.insertOne("carList",{
                    goodsInfo,
                    goodsId,
                    userId,
                    buyNum:1,
                    createTime:common.getNowTime()
                },function(err,results){
                    res.json({
                        ok:1,
                        msg:"购物车添加成功",
                    })
                })
            })
        }
    })
})

//获取购物车列表
app.get("/getCarList",function(req,res){
    db.find("carList",{},function(err,carList){
        return res.json({
            ok:1,
            msg:"查找成功",
            carList,
        })
    })
})

//修改购物车列表
app.get("/upCarList",function(req,res){
    var id = req.query.id;
    var type = req.query.type/1;
    var upObj = {};
    if(type==0){
        upObj.$inc={buyNum:-1}
    }else{
        upObj.$inc={buyNum:1}
    }
    db.updateOneById("carList",id,upObj,function(err,carList){
        res.json({
            ok:1,
            msg:"更新成功",
            carList,
        })
    })
})

//删除一条购物车信息
app.get("/removeCarList",function(req,res){
    var id = req.query.id;
    db.deleteOneById("carList",id,function(err,results){
        res.json({
            ok:1,
            msg:"删除成功",
        })
    })
})

//支付
app.get("/toPay",function(req,res){
    var payPrice = req.query.payPrice;
    var userId = req.query.userId;
    db.findOneById("userList",userId,function(err,userInfo){
        var upObj = {
            $inc:{
                goldNum:-payPrice/1,
            }
        }
        db.updateOneById("userList",userId,upObj,function(err,results){
            res.json({
                ok:1,
                msg:"更改金钱成功"
            })
        })
    })  
})


app.get("/clearAllCar",function(req,res){
    db.find("carList",{},function(err,carList){
        var carList = carList;
        for(var i = 0; i<carList.length;i++){
            db.deleteOneById("carList",carList[i]._id,function(err,results){
                res.json({
                    ok:1,
                    msg:"清空购物车成功"
                })
            })
        }
    })
})




















// //================管理员相关接口====================
// app.post("/login",admin.login);
// //获得管理员日志接口：
// app.get("/getAdminLogList",admin.getAdminLogList)
// app.get("/checkAdmin",admin.checkAdmin)
// app.get("/deleteAdminLog",admin.deleteAdminLog)
// app.post("/addAdmin",admin.addAdmin)

// //=================店铺相关接口=====================
// app.post("/addShopType",shop.addShopType);
// app.get("/getShopTypeList",shop.getShopTypeList)

// app.delete("/deleteShopType",shop.deleteShopType)

// app.get("/getShopType",shop.getShopType)
// app.get("/deleteShop",shop.deleteShop)
// app.post("/addShopList",shop.addShopList)  //添加店铺
// app.get("/getShopList",shop.getShopList);  //获取店铺
// app.get("/getShopInfoById",shop.getShopInfoById)
// app.put("/upShopList",shop.upShopList)  //更新店铺信息

// //==================商品相关接口===================

// app.post("/addGoodsType",goods.addGoodsType)
// app.get("/getGoodsTypeList",goods.getGoodsTypeList)
// app.get("/getAllShopList",goods.getAllshop)
// app.delete("/deleteGoodsType",goods.deleteGoodsType);
// app.get("/getMatchGoodsType",goods.getMatchGoodsType);
// app.post("/addGoodsList",goods.addGoodsList)
// app.get("/getGoodsList",goods.getGoodsList)
// app.delete("/deteteGoods",goods.deleteGoodsList)

// //====================广告相关接口===================
// app.post("/addAdvType",adv.addAdvType);
// app.get("/getAdvTypeList",adv.getAdvTypeList);
// app.delete("/deleteAdvType",adv.deleteAdvType);
// app.get("/getAdvTypeList",adv.getAdvTypeList);
// app.post("/addAdv",adv.addAdv);
// app.get("/getAdvList",adv.getAdvList);
// app.delete("/deleteAdv",adv.deleteAdv);
app.listen(88,function(){
    console.log("服务器开启成功")
})
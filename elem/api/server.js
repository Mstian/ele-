const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const admin = require("./routers/admin")
const shop = require("./routers/shop")
const goods = require("./routers/goods")
const adv = require("./routers/adv")
app.use(express.static("../api"))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended:false
// }))
// app.all("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","content-type");
//     next();
// })
//================管理员相关接口====================
app.post("/login",admin.login);
//获得管理员日志接口：
app.get("/getAdminLogList",admin.getAdminLogList)
app.get("/checkAdmin",admin.checkAdmin)
app.get("/deleteAdminLog",admin.deleteAdminLog)
app.post("/addAdmin",admin.addAdmin)

//=================店铺相关接口=====================
app.post("/addShopType",shop.addShopType);
app.get("/getShopTypeList",shop.getShopTypeList)

app.delete("/deleteShopType",shop.deleteShopType)

app.get("/getShopType",shop.getShopType)
app.get("/deleteShop",shop.deleteShop)
app.post("/addShopList",shop.addShopList)  //添加店铺
app.get("/getShopList",shop.getShopList);  //获取店铺
app.get("/getShopInfoById",shop.getShopInfoById)
app.put("/upShopList",shop.upShopList)  //更新店铺信息

//==================商品相关接口===================

app.post("/addGoodsType",goods.addGoodsType)
app.get("/getGoodsTypeList",goods.getGoodsTypeList)
app.get("/getAllShopList",goods.getAllshop)
app.delete("/deleteGoodsType",goods.deleteGoodsType);
app.get("/getMatchGoodsType",goods.getMatchGoodsType);
app.post("/addGoodsList",goods.addGoodsList)
app.get("/getGoodsList",goods.getGoodsList)
app.delete("/deteteGoods",goods.deleteGoodsList)

//====================广告相关接口===================
app.post("/addAdvType",adv.addAdvType);
app.get("/getAdvTypeList",adv.getAdvTypeList);
app.delete("/deleteAdvType",adv.deleteAdvType);
app.get("/getAdvTypeList",adv.getAdvTypeList);
app.post("/addAdv",adv.addAdv);
app.get("/getAdvList",adv.getAdvList);
app.delete("/deleteAdv",adv.deleteAdv);
app.listen(80,function(){
    console.log("服务器开启成功")
})
const mongodb = require("mongodb");  //引入数据库

const mongoClient = mongodb.MongoClient;

function _connect(cb){          // db模块里封装的函数
	mongoClient.connect("mongodb://127.0.0.1:27017",{useNewUrlParser:true},function(err,client){
		cb(client.db("ele"));
	})
}

//------------------需要暴露的模块-------------------------

module.exports.insertOne = function(coll,obj,cb){ //插入数据模块
	_connect(function(db){
		db.collection(coll).insertOne(obj,cb)
	})
}


module.exports.find = function(coll,obj,cb){ //查找数据模块
	obj.whereObj = obj.whereObj || {};
	obj.sortObj = obj.sortObj || {};
	obj.skipNum = obj.skipNum || 0;
	obj.limitNum = obj.limitNum || 0;
	_connect(function(db){
		db.collection(coll).find(obj.whereObj).sort(obj.sortObj).skip(obj.skipNum).limit(obj.limitNum).toArray(cb);
	})
}


module.exports.count = function(coll,whereObj,cb){   //计算总数据模块
	_connect(function(db){
		db.collection(coll).countDocuments(whereObj).then(cb)
	})
}


module.exports.deleteOneById = function(coll,id,cb){  //删除数据模块
	_connect(function(db){
		db.collection(coll).deleteOne({
			_id:mongodb.ObjectId(id),
		},cb)
	})
}

module.exports.updateOneById = function(coll,id,upObj,cb){  //根据id更新数据模块
	_connect(function(db){
		db.collection(coll).updateOne({
			_id:mongodb.ObjectId(id)
		},upObj,cb)
	})
}

module.exports.updateOne=function(coll,whereObj,upObj,cb){  //更新一条模块
    _connect(function(db){
        db.collection(coll).updateOne(whereObj,upObj,cb)
    })
}
module.exports.updateMany=function(coll,whereObj,upObj,cb){  //更新多条数据模块
    _connect(function(db){
        db.collection(coll).updateMany(whereObj,upObj,cb)
    })
}

module.exports.findOneById = function(coll,id,cb){  //根据id查找一条信息模块
	_connect(function(db){
		db.collection(coll).findOne({
			_id:mongodb.ObjectId(id)
		},cb)
	})
}

module.exports.findOne = function(coll,whereObj,cb){  //查找一条信息模块
	_connect(function(db){
		db.collection(coll).findOne(whereObj,cb)
	})
}

//多表联查获得管理员日志列表
module.exports.getAdminLogList = function(skip,limit,cb){
	_connect(function(db){
		db.collection("adminLog").aggregate([      //从哪个表里进行查找
			{$sort:{addTime:-1}},
			{$skip:skip},
			{$limit:limit},
			{
				$lookup:{
					from:"adminList",              //要和那个表进行关联
					localField:"adminId",			// 关联依据（查找依据）
					foreignField:"_id",				//外部集合的字段依据
					as:"adminInfo",				//将合并的数据放到指定的字段当中
				}
			},
			{
				$lookup:{
					from:"logType",
					localField:"logType",
					foreignField:"typeId",
					as:"typeInfo"
				}
			}
		]).toArray(cb)
	})
}

//以adminLog.adminId为条件去adminList中查找与adminId相同的_id，将_id与adminId相同的记录提取出来放到adminInfo当中；

module.exports.checkAdmin = function(cb){
	_connect(function(db){
		db.collection("adminLog").aggregate([      //从哪个表里进行查找
			{
				$lookup:{
					from:"adminList",              //要和那个表进行关联
					localField:"adminId",			// 关联依据（查找依据）
					foreignField:"_id",				//外部集合的字段依据
					as:"adminInfo",				//将合并的数据放到指定的字段当中
				}
			},
			{
				$lookup:{
					from:"logType",
					localField:"logType",
					foreignField:"typeId",
					as:"typeInfo"
				}
			}
		]).toArray(cb)
	})
}


//查找商铺类型id对应的商铺类型名
module.exports.getShopList = function(whereObj,cb){
	_connect(function(db){
		db.collection("shopList").aggregate([
			{$sort:{createTime:-1}},
			{$match:whereObj},         //模糊搜索匹配内容$match
			{
				$lookup:{
					from:"shopTypeList",
					localField:"shopTypeId",
					foreignField:"_id",
					as:"typeInfo"
				}
			}
		]).toArray(cb)
	})
}


//根据商铺id查找对应的商铺名称
module.exports.getGoodsTypeList = function(cb){
	_connect(function(db){
		db.collection("goodsTypeList").aggregate([
			{$sort:{createTime:-1}},
			{
				$lookup:{
					from:"shopList",
					localField:"shopId",
					foreignField:"_id",
					as:"typeInfo",
				}
			}
		]).toArray(cb)
	})
}

module.exports.getGoodsList = function(cb){
	_connect(function(db){
		db.collection("goodsList").aggregate([
			{$sort:{createTime:-1}},
			{
				$lookup:{
					from:"shopList",
					localField:"shopId",
					foreignField:"_id",
					as:"shopName"
				}
			},
			{
				$lookup:{
					from:"goodsTypeList",
					localField:"goodsTypeId",
					foreignField:'_id',
					as:"goodsTypeName",
				}
			}
		]).toArray(cb)
	})
}

module.exports.getAdvList = function(cb){
	_connect(function(db){
		db.collection("advList").aggregate([
			{$sort:{createTime:-1}},
			{
				$lookup:{
					from:"advTypeList",
					localField:"advTypeId",
					foreignField:"_id",
					as:"typeInfo"
				}
			}
		]).toArray(cb)
	})
}
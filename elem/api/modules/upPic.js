const formidable = require("formidable");
const fs = require("fs");



module.exports.upPic = function(req,picName,cb){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./upload";//指定上传文件的文件夹
	form.encoding = "utf-8";//设置编码格式
	form.keepExtensions = true;//是否保留文件扩展名
	form.parse(req,function(err,params,file){
		if(err){
			cb({
				ok:2,
				msg:"网络连接错误",
			})
		}else{
			var picInfo=file[picName];
			if(picInfo){
				if(picInfo.size>0){ //已添加上传文件
					var keepName = picInfo.name.substr(picInfo.name.lastIndexOf(".")).toLowerCase();//文件后缀名
					var keepArr = [".jpg",".png",".gif","jpeg"];
					if(keepArr.includes(keepName)){
						var newPicName = Date.now()+keepName;
						fs.rename(picInfo.path,"./upload/"+newPicName,function(err){
							cb({
								ok:1,
								params,
								newPicName
							})
						})
					}else{
						fs.unlink(picInfo.path,function(err){
							cb({
								ok:2,
								msg:"请输入正确的图片格式"
							})
						})
					}
				}else{
					fs.unlink(picInfo.path,function(err){
						cb({
							ok:3,
							params,
						})
					})
				}
			}else{
				cb({
					ok:3,
					params,
				})
			}	
		}
	})		
}




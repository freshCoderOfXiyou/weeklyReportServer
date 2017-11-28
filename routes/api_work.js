var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var workModel = require("../models/work");
// project using chalk for colorful output at terminal
const chalk = require("chalk")
const msgCk = chalk.green
const errCk = chalk.bold.red
const warnCk = chalk.yellow
const keyCk = chalk.bgRed.white
// connect to mongodb databse
mongoose.connect("mongodb://127.0.0.1:27017/blog");

mongoose.connection.on("connected",()=>{
	console.log(keyCk("work server has connected to mongodb 127.0.0.1:27017"))
})

mongoose.connection.on("error",()=>{
	console.log(errCk("work server has happend an error when connected to mongodb at 127.0.0.1:27017"))
})

mongoose.connection.on("disconnected",()=>{
	console.log(keyCk("work server has disconnected to mongoodb at 127.0.0.1:27017"))
})

router.post("/add",(req , res , next)=>{

	workModel.create(req.body,(err , doc)=>{
		if (err) {
			console.log(errCk(err))
			res.json({"status":"0" , "msg":err})
		}
		else{
			res.json({"status":"1","msg":"doc has insert into db"})
		}
	})
})

router.get("/add",(req , res )=>{
	console.log(req.body)
	res.send("work data")
})

// 这个功能较为复杂，也是最为核心的功能
/*1.能够更具时间来推送数据，将时间存储为字符串，可以利用字符串的动态转化
*2.能够根据栏目来推送数据
*3.能够根据用户推送数据
*/



// 首先实现对于时间的需求，即可以根据传入时间推送数据
router.post("/query",(req, res, next)=>{
	let locStart = req.body.start;
	let locEnd = req.body.end;
	console.log(locStart,locEnd);
	// workModel.find({"date":{'$get':req.body.start, '$lte':req.body.end}}, (err , doc)=>{
	// 	if (err) {
	// 		console.log(errCk(err))
	// 		res.json({"status":"0" , "msg":err})
	// 	}
	// 	else{
	// 		res.json({"status":"1" , "msg":"had found doc" , "data":doc })
	// 	}
	// }) .where('age').gt(17).lt(66)
	workModel
	.find({})
	.where("date").gte(locStart).lte(locEnd)
	.exec(function(err,doc){
		if (err) {
			console.log(errCk(err))
			res.json({"status":"0" , "msg":err ,"data":[]})
		}
		else{
			// 对数据做整理
			var sendData = formatData(doc);

			res.json({"status":"1" , "msg":"had found doc" , "data":sendData , "queryStar":locStart,"queryEnd":locEnd })
		}

	})
})

// 对相同栏目数据进行汇总
function formatData(_arr){
	//为了更加高效实现数据整理， 将数据作为一个对象，而不是一个数组
	let locData = {}
	_arr.forEach((item,index,array)=>{
		try{
			// 首先获取到当前项的栏目英文名
			let locEname = item.column;

			// 如果locData中没有这个栏目的数据，就直接添加该项
			if (locData.length == 0 || locData[locEname] == undefined ) {
				locData[locEname]=item;
			}
			else{
				// 如果locdata中已经有了这个栏目的数据，update数量操作
				locData[locEname].fixedNum+=item.fixedNum
				locData[locEname].updateNum+=item.updateNum
				locData[locEname].activityNum+=item.activityNum
				locData[locEname].themeNum+=item.themeNum
				locData[locEname].debuggerNum+=item.debuggerNum
				locData[locEname].otherNum+=item.otherNum
			}
			console.log(index);
			console.log(locData);

		}
		catch(e){
			// console.log(e);
			console.log(index);
		}

	})

	return locData;
}




module.exports = router;
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var columnModel = require("../models/column");
// project using chalk for colorful output at terminal
const chalk = require("chalk")
const msgCk = chalk.green
const errCk = chalk.bold.red
const warnCk = chalk.yellow
const keyCk = chalk.bgRed.white
// connect to mongodb databse
mongoose.connect("mongodb://127.0.0.1:27017/blog");


mongoose.connection.on("error",()=>{
	console.log(errCk("column server has happend an error when connected to mongodb at 127.0.0.1:27017"))
})


router.get("/add",(req , res , next)=>{
	res.json({text:1});
})

router.post("/add",(req , res ,next)=>{
	var clientData = req.body;
	columnModel.create([clientData],(err,doc)=>{
		if (err) {
			res.json({done:false,msg:"插入数据库发生了错误",doc:null})
		}
		else{
			res.json({done:true,msg:"成功新增一条栏目记录",doc:doc})
		}
	})
})

router.get("/all",(req , res , next)=>{
	columnModel.find({} , (err , doc) =>{
		if (err) {
			res.json({status:0,doc:null,msg:"500获取所有栏目数据发生错误"})
		}
		else{
			res.json({status:1 , doc , msg:"获取所有栏目数据成功"})
		}
	})
})

module.exports = router;
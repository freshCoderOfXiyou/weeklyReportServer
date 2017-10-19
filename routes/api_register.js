var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var userModel = require("../models/user");
// project using chalk for colorful output at terminal
const chalk = require("chalk")
const msgCk = chalk.green
const errCk = chalk.bold.red
const warnCk = chalk.yellow
const keyCk = chalk.bgCyan.white
// connect to mongodb databse
mongoose.connect("mongodb://127.0.0.1:27017/blog");

mongoose.connection.on("connected",()=>{
	console.log(keyCk("server has connected to mongodb 127.0.0.1:27017"))
})

mongoose.connection.on("error",()=>{
	console.log(errCk("server has happend an error when connected to mongodb at 127.0.0.1:27017"))
})

mongoose.connection.on("disconnected",()=>{
	console.log(keyCk("server has disconnected to mongoodb at 127.0.0.1:27017"))
})

router.get("/",(req,res,next)=>{
	res.json({
		status:"12",
		msg:"register success"
	})
	let testObj={
		name:"jyy",
		psw:"123456",
		works:["lanmu","life","music","fitness"]
	}
	userModel.create([testObj],(err,doc)=>{
		if (err) {
			console.log(errCk("has err when create an doc"))
		}else{
			console.log(msgCk("has create an doc suc"))
		}
	})
})	

module.exports = router;
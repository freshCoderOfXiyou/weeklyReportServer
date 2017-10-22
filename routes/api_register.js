var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var userModel = require("../models/user");
// project using chalk for colorful output at terminal
const chalk = require("chalk")
const msgCk = chalk.green
const errCk = chalk.bold.red
const warnCk = chalk.yellow
const keyCk = chalk.bgRed.white
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

router.post("/register",(req,res,next)=>{
	console.log(req.body)
	userModel.create([req.body],(err,doc)=>{
		if (err) {
			console.log(errCk("has happend an err at create an doc at api_register"))
		}else{
			console.log(msgCk("success create an doc at api_register"))
			res.json("back data")		
		}
	})
})

router.post("/load",(req,res,next)=>{
	console.log(req.body)
	userModel.findOne(req.body,(err,doc)=>{
		if (err) {
			console.log(errCk("has happend an err at find an doc at api_register"))
			
		}else{
			console.log(msgCk("success find an doc at api_register"))
			console.log(doc)
			
			if (doc === null) {
				res.json({"result":"0"})	
			}else{
				res.json({"result":"1"})	
			}
		}
	})
})


module.exports = router;
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

router.post("/query",(req, res, next)=>{
	console.log(req.body)
	workModel.find(req.body , (err , doc)=>{
		if (err) {
			console.log(errCk(err))
			res.json({"status":"0" , "msg":err})
		}
		else{
			res.json({"status":"1" , "msg":"had found doc" , "data":doc })
		}
	})
})
module.exports = router;
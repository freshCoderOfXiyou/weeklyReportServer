var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var workModel = require("../models/column");
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
	res.json({txt:2})
})

module.exports = router;
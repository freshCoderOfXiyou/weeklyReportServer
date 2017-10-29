var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var workSchema = new Schema({
	'column':String,
	'columnCname':String, 
	'date':String, 
	'man':String, 
	'manId' :String, 
	'fixedNum' : Number,
	'updateNum' : Number,
	'activityNum' : Number,
	'debuggerNum' :Number ,
	'otherNum' : Number
})

module.exports  = mongoose.model("workModel" , workSchema);
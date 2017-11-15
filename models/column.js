var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var columnSchema = new Schema({
	cname:{
		type:String,
		default:"为定义的栏目名"
	},
	ename:{
		type:String,
		unique:true
	}
})

module.exports  = mongoose.model("columnModel" , columnSchema);
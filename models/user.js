var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var userSchema = new Schema({
	"id":{
		type:String ,
		unique:true,
		onece:true,
		trim:true
	}, 
	"name":{
		type:String,
		trim:true
	},
	"psw":String,
	"works":Array
})

module.exports  = mongoose.model("userModel" , userSchema);
var mongoose = require("mongoose")
var Schema = mongoose.Schema 

var userSchema = new Schema({
	"id":String,
	"name":String,
	"psw":String,
	"works":Array
})

module.exports  = mongoose.model("userModel" , userSchema);
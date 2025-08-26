const mongoose = require("mongoose")

const userschema = mongoose.Schema({
   username:{type:String, required:true},
   email:{type:String, unique:true, required:true},
   password:{type:String, required:true},
   profilepicture:{type:String},
   verified:{type:Boolean, default:false},
   otp:{type:String}
})

const usermodel = mongoose.model("users_collection",userschema)

module.exports = usermodel
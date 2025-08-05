
const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
   title: {type:String, required: true, unique:true},
   content: {type:String, required: true, unique:true}
})

const todomodel = mongoose.model("todo_collection", todoschema)


module.exports = todomodel
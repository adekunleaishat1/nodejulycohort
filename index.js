const express =  require("express")
const app =  express()
const ejs = require("ejs")
const mongoose = require("mongoose")
require("dotenv").config()
const connect = require("./DB.config/db.connect")
const userouter = require("./route/user.route")


// CRUD
// CREATE READ UPDATE DELETE

//middleware
app.set("view engine", "ejs")
app.use(express.urlencoded())
app.use("", userouter)

let userarray = []
let biscuit = []
let errormessage = ""
let user =""
const users = [
   { Id:1, Name:"Joshua", Food:"Rice", Age:"13"},
   { Id:2, Name:"Ridwan", Food:"Beans", Age:"10"},
   { Id:3, Name:"Mary", Food:"spagheti", Age:"15"},
   { Id:4, Name:"Emmanuel", Food:"Pounded Yam", Age:"23"},
   { Id:5, Name:"Patrick", Food:"Semo", Age:"20"},
   { Id:5, Name:"Ronald", Food:"Bread and Egg", Age:"18"},
   { Id:5, Name:"Abdullah", Food:"Yam and Egg", Age:"17"},
]










app.get("/",(req,res)=>{
 if (user) {
  return res.render("index",{name:"Tolnai",users, user})
 }
  return res.redirect("/login")
})


app.get("/login",(req, res)=>{
   res.render("login",{errormessage})
})



app.get("/todo",async (req, res)=>{
 const alltodo =   await todomodel.find()
 console.log(alltodo);
 
 res.render("todo",{alltodo})


})


app.post("/post/todo", async(req, res )=>{
   console.log(req.body);
   const {content, title} = req.body
   console.log(content, "this is content");
   console.log(title, "this is title");
   if (!content || !title) {
      console.log("input field cannot be empty");
      
   }else{
     const user = await todomodel.create(req.body)
     console.log(user);
     res.redirect("/todo")
   }
  
})



app.post("/del", async (req, res)=> {
   // console.log(req.body.id);
  try {
    const {id} = req.body
   const deleted = await todomodel.findByIdAndDelete(id)
   if (deleted) {
       res.redirect("/todo")
   }
  } catch (error) {
     console.log(error);
     
  }
})

app.get("/edit/:id", async(req, res)=>{
  try {
   const {id} = req.params
   const onetodo = await todomodel.findById(id)
   // console.log(biscuit[index], "Element on that particular index");
   res.render("edit",{onetodo})
  } catch (error) {
   console.log(error);
   
  }
})

app.post("/update/:id", async(req,res)=>{
  try {
    const {id} = req.params
   
     const update = await todomodel.findByIdAndUpdate(
      id,
      req.body
    )
    if (update) {
         res.redirect("/todo")
    }
  } catch (error) {
   console.log(error);
   
  }  
})




connect()
const  port = 8008
app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})
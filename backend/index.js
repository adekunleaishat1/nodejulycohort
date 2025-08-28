const express = require("express")
const app = express()
const connect = require("./dbcofig/db.connect")
require("dotenv").config()
const userrouter = require("./route/user.route")
const cors = require("cors")
const ejs = require("ejs")
const socket = require("socket.io")

// middleware 
app.use(express.json({limit:"50mb"}))
app.use(cors({
    origin:"*"
}))
app.use("/user", userrouter)
app.set("view engine", "ejs")



connect()
const port = 8005
const connection = app.listen(port,()=>{
    console.log(`app started at ${port}`);
    
})

const io = socket(connection,{
   cors:{origin:"*"}
})

io.on("connection",(socket)=>{
    console.log("A user connected");
    socket.on("sendchat",(message)=>{
       console.log(message);
       socket.emit("recievemessage", message)
    })
})
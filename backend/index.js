const express = require("express")
const app = express()
const connect = require("./dbcofig/db.connect")
require("dotenv").config()
const userrouter = require("./route/user.route")
const cors = require("cors")


// middleware 
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use("/user", userrouter)



connect()
const port = 8005
app.listen(port,()=>{
    console.log(`app started at ${port}`);
    
})
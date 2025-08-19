const express = require("express")
const userrouter = express.Router()

const {Signup, Login, verifyToken,UploadProfile} = require("../controller/user.controller")



userrouter.post("/signup", Signup)
userrouter.post("/login", Login)
userrouter.get("/verify", verifyToken)
userrouter.patch("/upload", UploadProfile)








module.exports = userrouter
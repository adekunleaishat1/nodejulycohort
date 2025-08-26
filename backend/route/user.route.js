const express = require("express")
const userrouter = express.Router()

const {Signup, Login, verifyToken,UploadProfile, VerifyEmail} = require("../controller/user.controller")
const {AuthMiddleware} = require("../middleware/Authmiddleware")


userrouter.post("/signup", Signup)
userrouter.post("/login", Login)
userrouter.get("/verify", verifyToken)
userrouter.patch("/upload",AuthMiddleware, UploadProfile)
userrouter.get("/emailverification/:otp", VerifyEmail)








module.exports = userrouter
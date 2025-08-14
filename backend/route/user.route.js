const express = require("express")
const userrouter = express.Router()

const {Signup, Login, verifyToken} = require("../controller/user.controller")



userrouter.post("/signup", Signup)
userrouter.post("/login", Login)
userrouter.get("/verify", verifyToken)








module.exports = userrouter
const express = require("express")
const userrouter = express.Router()

const {Signup, Login} = require("../controller/user.controller")



userrouter.post("/signup", Signup)
userrouter.post("/login", Login)








module.exports = userrouter
const express = require("express")
const userouter =  express.Router()
const {getuserpage,getsignup,signupuser, userlogin} = require("../controller/user.controller")

userouter.get("/user",getuserpage)
userouter.get("/signup", getsignup)
userouter.post("/user/signup", signupuser)
userouter.post("/user/login",userlogin )

module.exports = userouter
const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Signup = async(req,res) =>{
    try {
        console.log(req.body);
        const {username , email, password} = req.body
       if (!username || !email || !password) {
        return res.status(400).json({message:"All fields are mandatory", status:false})
       }    
       const hashedpassword = await bcrypt.hash(password,10)
     
      const newUser = await usermodel.create({
        username,
        email,
        password:hashedpassword
      })
      if (!newUser) {
        return res.status(400).json({message:"unable to create user", status:false})
      }

       return res.status(200).json({message:"signup successful", status:true})
    } catch (error) {
      if (error.message.includes("E11000 duplicate key error collection")) {

       return res.status(406).json({message:"user already exist", status:false})
        
      }
       return res.status(500).json({message:error.message, status:false})
        
    }
}



const Login = async (req, res) =>{
  try {
    console.log(req.body);
    const {email , password} = req.body
    if (!email || !password) {
        return res.status(400).json({message:"All fields are mandatory", status:false})
    }
    
     const existuser =   await usermodel.findOne({email})
     if (!existuser) {
        return res.status(400).json({message:"User does not exist,plaese register!!!", status:false})
      
     }
       const correctpassword =  await bcrypt.compare(password, existuser.password)
       
     if (existuser && correctpassword) {
      const token =  await jwt.sign({email:existuser.email, id:existuser._id}, process.env.SECRETKEY,{expiresIn:300} )

       return res.status(200).json({message:"login successful", status:true, token})
      
     }
        return res.status(400).json({message:"User does not exist,plaese register!!!", status:false})
  } catch (error) {
       return res.status(500).json({message:error.message, status:false})
  }
}

const verifyToken =async (req, res) =>{
  try {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(400).json({message:"Invalid token", status:false})
    }
    console.log(token);
    
    const verifieduser =  await jwt.verify(token, process.env.SECRETKEY)
      console.log(verifieduser);
      if (verifieduser) {
       const user =   await usermodel.findById(verifieduser.id)
       return res.status(200).json({status:true, user})
      }
      return res.status(400).json({message:"token verification failed", status:false})
      
  } catch (error) {
        console.log(error);
       return res.status(500).json({message:error.message, status:false})
  }
}

module.exports = {Signup, Login, verifyToken}
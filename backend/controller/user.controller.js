const usermodel = require("../model/user.model")
const bcrypt = require("bcryptjs")

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
       return res.status(200).json({message:"login successful", status:true})
      
     }
        return res.status(400).json({message:"User does not exist,plaese register!!!", status:false})
  } catch (error) {
       return res.status(500).json({message:error.message, status:false})
  }
}

module.exports = {Signup, Login}
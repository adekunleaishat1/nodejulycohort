
const jwt = require("jsonwebtoken")
const usermodel = require("../model/user.model")

const AuthMiddleware = async (req, res, next) =>{
   try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
           return res.status(401).json({message:"No authorization provided"})
        }
        
       const token = authHeader.split(" ")[1]
       if (!token) {
           return res.status(401).json({message:"Invalid token"})
       }
       const decodedtoken =  await jwt.verify(token, process.env.SECRETKEY)
       const user = await usermodel.findOne({email:decodedtoken.email})
        if (!user) {
           return res.status(401).json({message:"Invalid User"})
        }
        req.user = user
        next()
   } catch (error) {
    if (error.message.includes("jwt expired")) {
        return res.status(403).json({message:"token expired"})
    }
     return res.status(403).json({message:error.message})
   }
}

module.exports = {AuthMiddleware}
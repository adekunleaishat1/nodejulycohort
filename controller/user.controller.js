let errormessage = ""
const usermodel = require("../model/user.model")

const getuserpage = (req, res) =>{
   res.json({
    "users":[
        { Id:1, Name:"Joshua", Food:"Rice", Age:"13"},
        { Id:2, Name:"Ridwan", Food:"Beans", Age:"10"},
        { Id:3, Name:"Mary", Food:"spagheti", Age:"15"},
        { Id:4, Name:"Emmanuel", Food:"Pounded Yam", Age:"23"},
        { Id:5, Name:"Patrick", Food:"Semo", Age:"20"},
        { Id:5, Name:"Ronald", Food:"Bread and Egg", Age:"18"},
        { Id:5, Name:"Abdullah", Food:"Yam and Egg", Age:"17"},
    ]
   })
}

const getsignup = (req, res) =>{
 res.render("signup",{errormessage})
}


const signupuser = async(req,res) =>{
try {
     const user = await usermodel.create(req.body)
  console.log(user);
  if (user) {
   res.redirect("/login")
  }else{
   res.redirect("/signup")
  }
} catch (error) {
   // console.log("Error message:",error.message);
   //    console.log("Error Name:",error.name);
   //    console.log("Error Code:",error.code);
   if (error.message.includes("E11000 duplicate key error collection")) {
     return errormessage = "user already exist"

   }
   if (error.name == "ValidationError") {
       if (error.message.includes(" username: Path `username` is required")) {
          errormessage = "username is required"
         return   res.redirect("/signup")
       }
       if (error.message.includes("email: Path `email` is required")) {
          errormessage = "email is required"
           return   res.redirect("/signup")
       }
        if (error.message.includes("password: Path `password` is required")) {
           errormessage = "pasword is required"
            return res.redirect("/signup")
       }
   }
}
}

const userlogin =async (req, res) =>{
     console.log(req.body);
  const {email , password } = req.body
  try {
    const existuser = await usermodel.findOne({email})
    console.log(existuser);
    if (existuser && existuser.password == password) {
      console.log("login successful");
        res.redirect("/")
    }else{
       errormessage = "Invalid Credentials"
      res.redirect("/login")
    }
  } catch (error) {
   console.log(error);
   res.redirect("/login")
  }
}

module.exports = {getuserpage, getsignup, signupuser, userlogin}
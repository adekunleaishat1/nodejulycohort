const express =  require("express")
const app =  express()


app.get("/user",(request, response)=>{
//    response.send("Welcome to your Node Class.")
   response.json({
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
   
})



const  port = 8008
app.listen(port,()=>{
   console.log(`app started at port ${port}`);
   
})
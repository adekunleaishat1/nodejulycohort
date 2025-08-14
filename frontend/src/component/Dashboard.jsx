import React , {useEffect}from 'react'
import axios from 'axios'

const Dashboard = () => {
    const token = localStorage.getItem("token")

    useEffect(() => {
      axios.get("http://localhost:8005/user/verify",{
        headers:{
            "Authorization":`bearer ${token}`
        }
      }).then((res)=>{
        console.log(res);
        
      }).catch((err)=>{
        console.log(err);
        
      })
    }, [])
    
  return (
    <div>
       <h1>this is your dashboard</h1>
    </div>
  )
}

export default Dashboard
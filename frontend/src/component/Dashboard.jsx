import React , {useEffect, useState}from 'react'
import axios from 'axios'

const Dashboard = () => {
    const token = localStorage.getItem("token")
    const [image, setimage] = useState("")

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
    
    const handleFilechange = (e) =>{
      let imagefile = e.target.files[0]
      console.log(imagefile);
      const reader = new FileReader()
      reader.readAsDataURL(imagefile)
      reader.onload = (e) =>{
         setimage(e.target.result)
      }
    }

    const Uploadimage = async () =>{
     try {
       const response = await axios.patch("http://localhost:8005/user/upload",{image},
        {
        headers:{
            "Authorization":`bearer ${token}`
        }
      })

      if (response) {
        console.log(response);
        
      }
     } catch (error) {
      console.log(error);
      
     }
    }
  return (
    <div>
       <h1>this is your dashboard</h1>
       <input onChange={handleFilechange} type="file"  />
       <button onClick={Uploadimage}>Upload</button>
    </div>
  )
}

export default Dashboard
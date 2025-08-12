import React ,{useState}from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Signup = () => {
    const navigate = useNavigate()
    const [userDetail, setuserDetail] = useState({
        username:"",
        email:"",
        password:""
    })
    const handleInputchange = (e) =>{
       console.log(e.target.name  ,e.target.value);
       const name = e.target.name 
       setuserDetail({...userDetail, [name]:e.target.value})
    }

    const Register = () =>{
       axios.post("http://localhost:8005/user/signup",userDetail)
       .then((res)=>{
        toast.success(res.data.message)
        navigate("/login")
        console.log(res);
       }).catch((err)=>{
         console.log(err);
        const errormessage = err.response.data?.message
        toast.error(errormessage)
       })
    }
  return (
    <div>
       <div className='w-50 mx-auto px-3 py-3 shadow'>
        <h1 className='text-center'>Signup</h1>
            <input name='username' className='form-control mt-3' onChange={handleInputchange} placeholder='Username' type="text" />
            <input name='email' className='form-control mt-3' onChange={handleInputchange} placeholder='Email' type="text" />
            <input name='password' className='form-control mt-3' onChange={handleInputchange} placeholder='Password' type="text" />
            <button  className='btn btn-dark mt-3' onClick={Register}>Register</button>
       </div>
    </div>
  )
}

export default Signup
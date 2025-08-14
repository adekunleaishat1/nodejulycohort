import React ,{useState}from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
    const [userDetail, setuserDetail] = useState({
        email:"",
        password:""
    })
    const handleInputchange = (e) =>{
       console.log(e.target.name  ,e.target.value);
       const name = e.target.name 
       setuserDetail({...userDetail, [name]:e.target.value})
    }

    const Loginuser = () =>{
       axios.post("http://localhost:8005/user/login",userDetail)
       .then((res)=>{
        console.log(res);
        localStorage.setItem("token", res.data.token)
        navigate("/dashboard")
       }).catch((err)=>{
        console.log(err);
       })
    }
  return (
    <div>
        <div className='w-50 mx-auto px-3 py-3 shadow'>
        <h1 className='text-center'>Login</h1>
            <input name='email' className='form-control mt-3' onChange={handleInputchange} placeholder='Email' type="text" />
            <input name='password' className='form-control mt-3' onChange={handleInputchange} placeholder='Password' type="text" />
            <button  className='btn btn-dark mt-3' onClick={Loginuser}>Login</button>
       </div>
    </div>
  )
}

export default Login
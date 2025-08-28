import React ,{useRef} from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import {ToastContainer} from "react-toastify"
import Dashboard from './component/Dashboard'
import socketclient from "socket.io-client"
import Chat from './component/Chat'

const App = () => {
  const endpiont = "http://localhost:8005"
  const socket = useRef(socketclient(endpiont))
  
    
  return (
    <div> 
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/chat' element={<Chat socket={socket.current}/>} />
      </Routes>

    </div>
  )
}

export default App
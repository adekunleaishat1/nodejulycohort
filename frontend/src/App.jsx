import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import {ToastContainer} from "react-toastify"

const App = () => {
  return (
    <div> 
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>

    </div>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Router, Routes} from "react-router-dom"

const Approutes = () => {
  return (
    <>
    <BrowserRouter>
    <Router>
        <Routes path='/' element={<h1>Home</h1>} /> 
        <Routes path='/login' element={<h1>Login</h1>} /> 
        <Routes path='/register' element={<h1>Registered</h1>} /> 
    </Router>
    </BrowserRouter>
        
    </>
  )
}

export default Approutes
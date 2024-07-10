import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/login' element = {<Login />}/>
    <Route path='/signup' element = {<Signup />}/>

    <Route/>


    </Routes>
      
    </>
  )
}

export default App

  import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'


import ProtectedRoute from './components/ProtectedRoute'
import HeaderPage from './pages/Header/HeaderPage'


 import HomePage from './pages/HomePage/HomePage'
import TechCatalog from './pages/TechCatalog/TechCatalog'
function App() {

  return(
    <div>
      <HeaderPage/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/home' element={<HomePage/>} /> 
    
      <Route path='/regist'
      element={<RegisterPage />} />
      
      <Route path='/catalog' element={<TechCatalog />}/>
       
      <Route path='/cart'
      element={
      <ProtectedRoute>
      {/* <CartPage /> */}
      </ProtectedRoute>
    }/>
    </Routes>
    
    </div>
  )
}

export default App

  import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CatalogPage from './pages/CatalogPage/CatalogPage'
import CartPage from './pages/CartPage/CartPage'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return(
    <div>
    <Routes>
      <Route path='/regist'
      element={<RegisterPage />} />
      <Route path='/login'
      element={<LoginPage />} />
      <Route path='/catalog'
      element={

      <CatalogPage />
  }/>
       
      <Route path='/cart'
      element={
      <ProtectedRoute>
      <CartPage />
      </ProtectedRoute>
    }/>
    </Routes>
    </div>
  )
}

export default App

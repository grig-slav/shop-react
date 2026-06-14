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
import HeaderPage from './pages/Header/HeaderPage'
import FooterPage from './pages/FooterPage/FooterPage'
import ProductPage from './pages/ProductPage/ProductPage'
function App() {

  return(
    <div>
      <HeaderPage/>
    <Routes>
      <Route path='/product/:id'
      element={<ProductPage />} />
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
    <FooterPage/>
    </div>
  )
}

export default App

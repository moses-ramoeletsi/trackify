import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/Sign-up'
import ForgotPassword from './pages/ForgotPassword'
import PageNotFound from './pages/PageNotFound'
import Index from './pages/Index'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Features from './components/Features'
import Logout from './components/Logout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/sign-up' element={<SignUp  />}/>
          <Route path='/privacy' element={<Privacy  />}/>
          <Route path='/terms' element={<Terms  />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/features' element={<Features />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<PageNotFound/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

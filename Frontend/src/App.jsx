import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Start from './Pages/Start'
import UserLogin from './Pages/UserLogin'
import UserLogout from './Pages/UserLogout'
import UserSignup from './Pages/UserSignup'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainRegister from './Pages/CaptainRegister'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import CaptainHome from './Pages/CaptainHome'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper'
import Riding from './Pages/Riding'
import CaptainRiding from './Pages/CaptainRiding'
// import { UserDataContext } from './Context/UserContext'

const App = () => {
  // const ans = UserDataContext();
  // console.log(ans);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login'element={<UserLogin/>} />
        <Route path='/signup'element={<UserSignup/>} />
        <Route path='/riding' element={<Riding/>} />
        <Route path='/captain-login'element={<CaptainLogin/>} />
        <Route path='/captain-signup'element={<CaptainRegister/>} />
        <Route path='/home' element={<UserProtectedWrapper> <Home/> </UserProtectedWrapper>} />
        <Route path='/users/logout' element={<UserProtectedWrapper> <UserLogout/> </UserProtectedWrapper>} />
        <Route path='/captain-home' element={<CaptainProtectedWrapper> <CaptainHome/> </CaptainProtectedWrapper>}/>
        <Route path='/captain-riding' element={<CaptainRiding/>}/>
      </Routes>
    </div>
  )
}

export default App

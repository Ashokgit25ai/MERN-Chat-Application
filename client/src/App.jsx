import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import Profile from './pages/Profile/Profile'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import Loader from './redux/components/Loader'
import { useSelector } from 'react-redux'


const App = () => {
  const { loader } = useSelector(state => state.loaderReducer)
  return (
          <div>
            <Toaster position="top-center" reverseOrder={true} />
            {loader && <Loader />}
            <BrowserRouter>
              <Routes>
                <Route path='/' element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>}>
                </Route>
                <Route path='/profile' element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>}>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
              </Routes>
            </BrowserRouter>
          </div>
          )
}

export default App

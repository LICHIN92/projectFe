import React from 'react'
import Navbar from '../components/navbar/Navbar'
import UserSignin from '../components/user/UserSignin'
import AuthPage from './authPage/AuthPage'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Home
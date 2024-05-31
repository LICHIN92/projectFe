import React from 'react'
import { Navigate } from 'react-router-dom'

const Authprotect = ({children}) => {
  
    const token=localStorage.getItem('token')
    if(token){
       return <Navigate to='/home' replace/>;
    }
   return children;
}

export default Authprotect
import React from 'react'
import { Navigate } from 'react-router-dom'

const Authprotect = ({children}) => {
  
   //  const token=sessionStorage.getItem('token')
    const token=sessionStorage.getItem('token')
    if(token){
       return <Navigate to='/home' replace/>;
    }
   return children;
}

export default Authprotect
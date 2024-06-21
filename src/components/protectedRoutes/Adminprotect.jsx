import React from 'react'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom'
const Adminprotect = ({ children }) => {
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
    const { user } = useSelector(store => store.user)
    const role = user.role
    if (token && role === 'admin' && Date.now / 1000 <= decodedToken.exp) {
        return children
    }
    return <Navigate to={'/'} replace />
}

export default Adminprotect
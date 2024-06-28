// import React from 'react'
// import { useSelector } from 'react-redux'
// import { jwtDecode } from 'jwt-decode'
// import { Navigate } from 'react-router-dom'
// const Adminprotect = ({ children }) => {
//     const token = sessionStorage.getItem('token')
//     const decodedToken = jwtDecode(token)
//     const { user } = useSelector(store => store.user)
//     const role = user.role
//     if (token && role === 'admin') {
//         return children
//     }
//     return <Navigate to={'/'} replace />
// }

// export default Adminprotect

import React from 'react';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';

const AdminProtect = ({ children }) => {
    // const token = sessionStorage.getItem('token');
    const token=sessionStorage.getItem('token')
    
    if (!token) {
        return <Navigate to={'/'} replace />;
    }
    
    try {
        const decodedToken = jwtDecode(token);
        const { exp, role } = decodedToken._doc;

        if (role === 'admin' && Date.now() / 1000 <= exp) {
            console.log('adminprotect');
            return children;
        }
    } catch (error) {
        console.error("Token decoding failed:", error);
        return <Navigate to={'/'} replace />;
    }

    return <Navigate to={'/'} replace />;
}

export default AdminProtect;

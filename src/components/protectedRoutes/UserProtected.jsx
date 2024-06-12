// import { jwtDecode } from 'jwt-decode';
// import React from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';

// const UserProtected = ({ children }) => {
//   const token = localStorage.getItem('token');
//   const navigate=useNavigate()
//   const decoded = jwtDecode(token)
//   const currentTime = Date.now() / 1000;
//   if (!token) {
//     return <Navigate to="/" replace />;
//   }
//   console.log(currentTime>=decoded.exp)
//   if(currentTime>=decoded.exp){
//     localStorage.removeItem(token)
//     // localStorage.clear(token)
//     navigate('/')
//     return
//   }
//     return children;
// };

// export default UserProtected;

import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const UserProtected = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    console.log(currentTime >= decoded.exp);

    if (currentTime >= decoded.exp) {

      localStorage.removeItem('token');
      localStorage.clear(token)
      return  navigate('/');
    }
  }, [token, navigate]);

  if (!token || Date.now() / 1000 >= (jwtDecode(token)?.exp || 0)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtected;

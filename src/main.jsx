// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import UserSignin from './components/user/UserSignin.jsx'
// import AuthPage from './pages/authPage/AuthPage.jsx'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Home from './pages/Home.jsx'

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<AuthPage/>,
//     children:[
//       {
//         path:'/home',
//         element:<Home/>
//       }
//     ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//        <RouterProvider router={router}/>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthPage from './pages/authPage/AuthPage.jsx';
import Home from './pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />,
  },
  {
    path:"/home",
    element:<Home/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

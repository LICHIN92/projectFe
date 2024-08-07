import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthPage from './pages/authPage/AuthPage.jsx';
import Home from './pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserProtected from './components/protectedRoutes/UserProtected.jsx';
import Authprotect from './components/protectedRoutes/Authprotect.jsx';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';;
import Store from './redux/Store.js';
import HomePage from './components/homepage/HomePage.jsx';
import AddCourt from './components/AddCourt/AddCourt.jsx';
import CourtDetail from './pages/CourtDetail/CourtDetail.jsx';
import Mycourt from './components/mycourt/Mycourt.jsx';
import AdminDashboars from './components/dashboard/admindashboard/AdminDashboars.jsx';
import Userdashboard from './components/dashboard/userDashboars/Userdashboard.jsx';
import Adminprotect from './components/protectedRoutes/Adminprotect.jsx';
import Editcourt from './components/editCourt/Editcourt.jsx';
import MyBook from './components/MyBooking/MyBook.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Authprotect>
        <AuthPage />
        {/* <Editcourt/> */}
      </Authprotect>
    )
  },
  {
    // path: '/home',
    element: (
      <UserProtected>
        <Home />
      </UserProtected>
    ),
    children: ([
      {
        path: '/home',
        element: <HomePage />
      },

      {
        path: '/userdash',
        element: <Userdashboard />
      },
      {
        path: '/addCourt',
        element: <AddCourt />
      },

      {
        path: '/court/:id',
        element: <CourtDetail />
      },
      {
        path: '/mycourt',
        element: <Mycourt />
      },
      {
        path: '/admindash',
        element:
          <AdminDashboars />

      },
      {
        path: '/addCourt',
        element:
          <AddCourt />

      },
      {
        path:'/mybookings',
        element:<MyBook/>
      }
    ])

  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ChakraProvider>
      <Provider store={Store}>

        <RouterProvider router={router} />

      </Provider>
    </ChakraProvider>
  //  </React.StrictMode>
);

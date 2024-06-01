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

import Store from './redux/Store.js';
import HomePage from './components/homepage/HomePage.jsx';
import AddCourt from './components/AddCourt/AddCourt.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Authprotect>
        <AuthPage />
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
    children:([
      {
        path:'/home',
        element:<HomePage/>        
      },{
        path:'/addCourt',
        element:<AddCourt/>
      }
    ])

  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store}>

      <RouterProvider router={router} />

    </Provider>
  </React.StrictMode>
);

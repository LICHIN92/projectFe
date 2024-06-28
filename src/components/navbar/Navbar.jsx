
// import React from 'react';
// import { Link, Navigate, useNavigate} from 'react-router-dom';
// import './navbar.css';
// import { jwtDecode } from "jwt-decode";
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUserData } from '../../redux/userSlice';

// const Navbar = () => {
//     const token = sessionStorage.getItem("token")
//     const decoded = jwtDecode(token)
//     const navigate=useNavigate
//     console.log(token);   
//     const dispatch = useDispatch()
//     const { user } = useSelector(state => state.user)
//     console.log(user.firstName);
//     const Logout = () => {
//         sessionStorage.removeItem('token')
//         dispatch(clearUserData())
//         navigate('/')
//     }
//     return (
//         <nav className="header navbar navbar-expand-lg ">
//             <div className="container-fluid">

//                 <Link className="navbar-brand" to="#">
//                     <h1 className='navbar_head'>
//                         turf_hub
//                         <small className='navbar_head-small'>Get on the field faster</small>
//                     </h1>
//                 </Link>
//                 <button
//                     className="navbar-toggler"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="navbar-toggler-icon" />
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav  mb-2 mb-lg-0">
//                         <li className="nav-link">
//                             <Link className="nav-link active text-white me-lg-2" aria-current="page" to="#">
//                                 Home
//                             </Link>
//                         </li>
//                         <li className="nav-link me-2">
//                             <Link className="nav-link text-white" to="#">
//                                 Courts
//                             </Link>
//                         </li>
//                         <li className=" nav-link dropdown text-white me-lg-2">
//                             <Link
//                                 className="nav-link dropdown-toggle text-white"
//                                 to="#"
//                                 role="button"
//                                 data-bs-toggle="dropdown"
//                                 aria-expanded="false"
//                             >
//                                 {decoded.email}
//                                 {/* {user.firstName+' '+user.lastName} */}
//                                 {user.firstName}
//                             </Link>
//                             <ul className="dropdown-menu">
//                                 <li>
//                                     <Link className="dropdown-item" to="#">
//                                         Action
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link className="dropdown-item" to="#">
//                                         Another action
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <hr className="dropdown-divider" />
//                                 </li>
//                                 <li>
//                                     <Link className="dropdown-item" to="#">
//                                         Something else here
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li className="nav-link">
//                             <span className="text-bg-danger btn" aria-disabled="true" onClick={Logout}>
//                                 Logout
//                             </span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../../redux/userSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const token = sessionStorage.getItem("token");
    console.log(user);
    const Logout = () => {
        sessionStorage.removeItem('token');
        dispatch(clearUserData());
        navigate('/');
    };

    return (
        <nav className="header navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">
                    <h1 className='navbar_head'>
                        turf_hub
                        <small className='navbar_head-small'>Get on the field faster</small>
                    </h1>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 ">
                        <li className="nav-item me-1">
                            <Link className="nav-link active text-white " aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        {user.role == 'admin' && <li className="nav-item me-">
                            <Link className="nav-link text-white" to="/mycourt">
                                Courts
                            </Link>

                        </li>}
                        <li className="nav-item me-1">
                            <Link className="nav-link text-white" to={user.role === 'admin' ? "/admindash" : "/userdash"}>
                                Dashboard
                            </Link>
                        </li>


                        <li className="nav-item dropdown text-white me-lg-1">
                            <Link
                                className="nav-link dropdown-toggle text-white text-capitalize"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {user && `${user.firstName}
                                
                                 `}
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/">
                                        My_Booking
                                    </Link>
                                </li>
                                {user.role == 'admin' &&
                                    <li>
                                        <Link className="dropdown-item" to="/addCourt">
                                            AddCourt
                                        </Link>
                                    </li>
                                }

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Something else here
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item ">
                            <button className="text-bg-danger btn Logout" onClick={Logout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

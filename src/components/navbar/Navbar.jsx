
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
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
                    <ul className="navbar-nav  mb-2 mb-lg-0">
                        <li className="nav-link">
                            <Link className="nav-link active text-white me-lg-2" aria-current="page" to="#">
                                Home
                            </Link>
                        </li>
                        <li className="nav-link me-2">
                            <Link className="nav-link text-white" to="#">
                                Courts
                            </Link>
                        </li>
                        <li className=" nav-link dropdown text-white me-lg-2">
                            <Link
                                className="nav-link dropdown-toggle text-white"
                                to="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Action
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        Another action
                                    </Link>
                                </li>
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
                        <li className="nav-link">
                            <span className="text-bg-danger btn" aria-disabled="true">
                                Logout
                            </span>
                        </li>
                    </ul>
                  </div>
            </div>
        </nav>
    );
};

export default Navbar;

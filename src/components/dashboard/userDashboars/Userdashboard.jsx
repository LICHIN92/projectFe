import React, { useEffect, useState } from 'react'
import './userdash.css'
// import headimg from '../../../assets/turf.avif'
import { FaAlignJustify } from 'react-icons/fa';
import viewsvg from '../../../assets/view.svg'
import backimg from '../../../assets/duffy-brook-IwDTKKFmWAc-unsplash.jpg'
import courtimg from '../../../assets/court.svg'
import addicon from '../../../assets/create.svg'
import deleteicon from '../../../assets/delete.svg'
import connect from '../../../assets/contact.svg'
import HomePage from '../../homepage/HomePage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
const Userdashboard = () => {
    const [dashlist, setdashlist] = useState(0)
    const [options, setOptions] = useState(0)
    const [value, setValue] = useState('');
    const navigate = useNavigate()
    const toggleSidebar = () => setOptions(!options);
    const [courtsNumber, setCourtNumber] = useState()
    const {user}=useSelector(state=>state.user)
    console.log(user._id);
    useEffect(() => {
        const loadingfunction = async () => {
            const courts = await axios.get('http://localhost:3000/court')
            setCourtNumber(courts.data.length)
        }
        loadingfunction()
    }, [])
    console.log(courtsNumber);
    console.log(value);
    const  deleteFunction=async (id)=>{
        console.log(id);
        try {
            const deleting = await axios.delete(`http://localhost:3000/court/${id}`);
            console.log('Delete successful:', deleting.data);
            // Add any additional logic you need here, e.g., updating the state to reflect the deletion
        } catch (error) {
            console.error('Error deleting the court:', error);
        }
    }
    return (
        <div className='userdashboard row'>
            <div className='sidebar col-lg-2 col-md-3 '>
                <div className='optionbar d-flex '>
                    <span className='p-1 togglebar' onClick={toggleSidebar}> <FaAlignJustify style={{ color: 'black', fontSize: '24px' }} />
                    </span>
                </div>
                <div className={options ? 'visible' : 'hidden'}>
                    <li onClick={() => setdashlist(0)}>Dashboard</li>
                    <li onClick={() => setdashlist(1)}>view courts</li>
                    <li onClick={() => setdashlist(2)}>Edit Account</li>
                    <li onClick={() => setdashlist(3)}>Delete Account</li>
                    <li onClick={() => setdashlist(4)}>Contact</li>
                </div>

            </div>

            <div className='usercontent col-lg-10 col-md-9'>
                <div style={{
                    backgroundImage: `url(${backimg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} className='userdash-header ps-2' >
                    <h2 className='dash-heading  ps-lg-2'>Dashboard<span className='controlpnl'>Control pannel</span></h2>

                </div>
                {dashlist == '0' && (
                    <div className='user-card-box p-lg-4 gap-lg-4  '>
                        <div className='user-card' onClick={() => navigate('/home')}>
                            <img className='user-card-img' src={viewsvg} alt="img" />

                            <div className='card-head'>
                                <h3>{courtsNumber}</h3>
                                <h5>view Courts</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-edit'>
                            <img className='user-card-img' src={addicon} alt="img" />

                            <div className='card-head'>
                                <h3>hhh</h3>
                                <h5>Edit Account</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-delete'>
                            <img className='user-card-img' src={deleteicon} alt="img" />

                            <div className='card-head'>
                                <h3>hhh</h3>
                                <h5>Delete Account</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-connect'>
                            <img className='user-card-img' src={connect} alt="img" />

                            <div className='card-head'>
                                <h3>hhh</h3>
                                <h5>Contact</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                    </div>
                )}
                {dashlist == '1' && (
                    // <div className='user-card-box p-lg-4 gap-lg-4  '>
                    //     <div className='user-card'>
                    //         <img className='user-card-img' src={viewsvg} alt="img" />

                    //         <div className='card-head'>
                    //             <h5>hhh</h5>
                    //             <h3>view Courts</h3>
                    //         </div>
                    //         <div className='user-card-info'>info</div>
                    //     </div>

                    // </div>
                    <HomePage />
                )}
                {dashlist == '3' && (
                    <div className=''>
                        <h3 className='m-lg-3 text-danger'>Delete Account</h3>
                        <div className='ps-3'>
                            <label className='text-black text-capitalize' htmlFor="">why you are deleting your Account?</label>
                            <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className='deletebox '>
                            <button className='btn btn-info'>Cancel</button>
                            <button className='btn btn-danger' onClick={() => deleteFunction(user._id)}>Delete</button>
                        </div>
                    </div>
                )}


                {dashlist == '2' && (
                    <div className=''>
                        <h3 className='m-lg-3 text-danger'>Edit Account</h3>
                        <div className='ps-3'>
                            <label className='text-black text-capitalize' htmlFor="">why you are deleting your Account?</label>
                            <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className='deletebox '>
                            <button className='btn btn-info'>Cancel</button>
                        <button className='btn btn-danger' onClick={() =>{}}>Delete</button>
                        </div>
                    </div>
                )}


            </div>



        </div>
    )
}

export default Userdashboard

import React, { useEffect, useState } from 'react'
import './userdash.css'
import { FaAlignJustify } from 'react-icons/fa';
import viewsvg from '../../../assets/view.svg'
import backimg from '../../../assets/duffy-brook-IwDTKKFmWAc-unsplash.jpg'
import addicon from '../../../assets/create.svg'
import deleteicon from '../../../assets/delete.svg'
import connect from '../../../assets/contact.svg'
import mail from '../../../assets/email.svg'
import insta from '../../../assets/instagram.svg'
import fb from '../../../assets/facebook.svg'
import mails from '../../../assets/emails.svg'
import location from '../../../assets/location.svg'
import mobile from '../../../assets/mobile.svg'
import HomePage from '../../homepage/HomePage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react'
import { clearUserData, setUserData } from '../../../redux/userSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const Userdashboard = () => {
    const [dashlist, setdashlist] = useState(0)
    const [options, setOptions] = useState(0)
    const [value, setValue] = useState('');
    const navigate = useNavigate()
    const [userdetail, setuserDetail] = useState()
    const toggleSidebar = () => setOptions(!options);
    const [courtsNumber, setCourtNumber] = useState()
    const [alertbox, setAlert] = useState(null)
    const [changePassword, setChangePassword] = useState(false)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const id = user._id
    const schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email('Invalid email').required('Email is required'),
        mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
        password: yup.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')

    })
    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
    useEffect(() => {
        const loadingfunction = async () => {
            // const courts = await axios.get('https://projectbe-hqct.onrender.com/court')
            const courts = await axios.get('https://projectbe-hqct.onrender.com/court')

            setCourtNumber(courts.data.length)
        }
        loadingfunction()
    }, [])
    const LogoutFuntion = () => {
        setTimeout(() => {
            setAlert(null)
        }, 4000);
    }
    const deleteFunction = async (id) => {
        try {
            const deleting = await axios.delete(`https://projectbe-hqct.onrender.com/delete/${id}`);

            setAlert({
                status: 'success',
                title: 'Success!',
                description: deleting.data
            });
            setTimeout(() => {
                sessionStorage.removeItem('token');
                dispatch(clearUserData());
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error deleting the court:', error);
            setAlert({
                status: 'error',
                title: 'Error',
                description: 'Error deleting the account. Please try again.'
            });
        }
    }
    const onsubmit = async (data) => {
        console.log(data);
        try {
            const token = sessionStorage.getItem('token');
            const edit = await axios.patch(`https://projectbe-hqct.onrender.com/updates/${id}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(edit.data);
            dispatch(setUserData(edit.data))
            if (edit.data) {
                setdashlist(0)

                setAlert({
                    status: 'success',
                    title: 'Success!',
                    description: 'Updated Successfully'
                });
                setTimeout(() => { setAlert(null) }, 5000);
            }

        } catch (error) {

        }
    }
    const contactUs = (data) => {

    }
    return (
        <div className='userdashboard row'>
            <div className='sidebar col-lg-2 col-md-3 '>
                <div className='optionbar d-flex '>
                    <span className='p-1 togglebar' onClick={toggleSidebar}> <FaAlignJustify style={{ color: 'black', fontSize: '24px' }} />
                    </span>
                </div>
                <div className={options ? 'visible' : 'hidden'}>
                    <li onClick={() =>{ setdashlist(0),toggleSidebar()}}>Dashboard</li>
                    <li onClick={() => { setdashlist(1),toggleSidebar()}}>View Courts</li>
                    <li onClick={() => { setdashlist(2),toggleSidebar()}}>Edit Account</li>
                    <li onClick={() => { setdashlist(2),toggleSidebar()}}>Delete Account</li>
                    <li onClick={() => { setdashlist(4),toggleSidebar()}}>Contact</li>
                </div>
            </div>

            <div className='usercontent col-lg-10 col-md-9'>
                <div style={{
                    backgroundImage: `url(${backimg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }} className='userdash-header ps-2'>
                    <h2 className='dash-heading ps-lg-2'>Dashboard<span className='controlpnl'>Control panel</span></h2>
                </div>
                {alertbox && (
                    <Stack className='mx-5 alrt' spacing={3} mb={4}>
                        <Alert status={alertbox.status} variant='subtle'>
                            <AlertIcon />
                            <AlertTitle>{alertbox.title}</AlertTitle>
                            <AlertDescription className='fw-medium'>{alertbox.description}</AlertDescription>
                        </Alert>
                    </Stack>
                )}

                {dashlist === 0 && (
                    <div className='user-card-box p-lg-4 gap-lg-4'>
                        <div className='user-card' onClick={() => navigate('/home')}>
                            <img className='user-card-img' src={viewsvg} alt="img" />
                            <div className='card-head'>
                                <h3>{courtsNumber}</h3>
                                <h5>view Courts</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-edit' onClick={() => setdashlist(2)}>
                            <img className='user-card-img' src={addicon} alt="img" />
                            <div className='card-head'>
                                <h3>Edit</h3>
                                <h5>Edit Account</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-delete' onClick={() => setdashlist(3)}>
                            <img className='user-card-img' src={deleteicon} alt="img" />
                            <div className='card-head'>
                                <h3>Delete</h3>
                                <h5>Delete Account</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                        <div className='user-card-connect' onClick={() => setdashlist(4)}>
                            <img className='user-card-img' src={connect} alt="img" />
                            <div className='card-head'>
                                <h3>Contact Us</h3>
                                <h5>Connect</h5>
                            </div>
                            <div className='user-card-info'>info</div>
                        </div>
                    </div>
                )}
                {dashlist === 1 && <HomePage />}
                {dashlist === 3 && (
                    <div className=''>
                        <h3 className='m-lg-3 text-danger'>Delete Account</h3>
                        <div className='ps-3'>
                            <label className='text-black text-capitalize' htmlFor="">Why are you deleting your Account?</label>
                            <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
                        </div>
                        <div className='deletebox'>
                            <button className='btn btn-info' onClick={() => setdashlist(0)}>Cancel</button>
                            <button className='btn btn-danger' onClick={() => deleteFunction(user._id)}>Delete</button>
                        </div>
                    </div>
                )}
                {dashlist === 2 && (
                    <div className=''>
                        <h3 className='m-lg-3 text-danger'>Edit Account</h3>
                        <form onSubmit={handleSubmit(onsubmit)} action="" className='px-3'>
                            <div className='edit'>
                                <div className='box'>
                                    <label htmlFor="">FirstName</label>
                                    <input type="text" {...register('firstName')} defaultValue={user.firstName} />
                                </div>
                                <div className='box'>
                                    <label htmlFor="">LastName</label>
                                    <input type="text" {...register('lastName')} defaultValue={user.lastName} />
                                </div>
                                <div className='box'>
                                    <label htmlFor="">Email</label>
                                    <input type="text" {...register('email')} defaultValue={user.email} />
                                </div>
                                <div className='box'>
                                    <label htmlFor="">Mobile</label>
                                    <input type="text" {...register('mobile')} defaultValue={user.mobile} />
                                </div>
                                {!changePassword && <button className='btn' onClick={() => setChangePassword(!changePassword)}>Change Password</button>}
                                {changePassword && (<>
                                    <div className='box'>
                                        <label htmlFor="">Change Password</label>
                                        <input type="password" {...register('password')} />
                                    </div>
                                    <div className='box'>
                                        <label htmlFor="">Confirm Password</label>
                                        <input type="password" {...register('confirmPassword')} />
                                    </div>
                                </>)}
                            </div>
                            <div className='deletebox'>
                                <button className='btn btn-danger' onClick={() => setdashlist(0)}>Cancel</button>
                                <button type='submit' className='btn btn-info text-white'>Update</button>
                            </div>
                        </form>


                    </div>
                )}
                {dashlist === 4 && (
                    // 'contact'
                    <div className='contact'>
                        <h2 className='text-capitalize text-info text-'>contact </h2>
                        <div className='contact-box'>
                            <div className='d-flex gap-3 justify-content-center'>
                                <img src={mail} alt="email" />
                                <img src={insta} alt="instagram" onClick={() => window.open('https://www.instagram.com/lichinchandran92/', '_blank')} />
                                <img src={fb} alt="facebook" />
                            </div>
                            <div className='d-flex flex-column py-3 gap-3 '>
                                <div className='xx' >
                                    <span>
                                        <label className='text-black'>Email</label>
                                        <img src={mails} alt="" />
                                    </span>
                                    <p>turfhub@gmail.com</p>
                                </div>
                                <div className='xx'>
                                    <span>
                                        <label className='text-black'>Mobile</label>
                                        <img src={mobile} alt="" />
                                    </span>
                                    <p>8086200861</p>

                                </div>
                                <div className='xx'>
                                    <span>
                                        <label htmlFor="" className='text-black'>Location</label>
                                        <img src={location} alt="" />
                                    </span>
                                    <p>Calicut</p>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Userdashboard


// import React, { useEffect, useState } from 'react'
// import './userdash.css'
// // import headimg from '../../../assets/turf.avif'
// import { FaAlignJustify } from 'react-icons/fa';
// import viewsvg from '../../../assets/view.svg'
// import backimg from '../../../assets/duffy-brook-IwDTKKFmWAc-unsplash.jpg'
// import courtimg from '../../../assets/court.svg'
// import addicon from '../../../assets/create.svg'
// import deleteicon from '../../../assets/delete.svg'
// import connect from '../../../assets/contact.svg'
// import HomePage from '../../homepage/HomePage';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     Alert,
//     AlertIcon,
//     AlertTitle,
//     AlertDescription,
//     Stack,
// } from '@chakra-ui/react'
// import { clearUserData } from '../../../redux/userSlice';

// const Userdashboard = () => {
//     const [dashlist, setdashlist] = useState(0)
//     const [options, setOptions] = useState(0)
//     const [value, setValue] = useState('');
//     const navigate = useNavigate()
//     const toggleSidebar = () => setOptions(!options);
//     const [courtsNumber, setCourtNumber] = useState()
//     const [alertbox, setAlert] = useState(null)
//     const {user}=useSelector(state=>state.user)
//     console.log(user._id);
//     useEffect(() => {
//         const loadingfunction = async () => {
//             const courts = await axios.get('http://localhost:3000/court')
//             setCourtNumber(courts.data.length)
//         }
//         loadingfunction()
//     }, [])
//     console.log(courtsNumber);
//     console.log(value);
//     const  deleteFunction=async (id)=>{
//         console.log(id);
//         try {
//             const deleting = await axios.delete(`http://localhost:3000/delete/${id}`);
//             console.log('Delete successful:', deleting.data);
//             setAlert({
//                 status: 'success',
//                 title: 'Success!',
//                 description: deleting.data
//             });
//             setTimeout(() => {
//                 localStorage.removeItem('token');
//                 dispatch(clearUserData());
//                 navigate('/');
//             }, 3000);
//         } catch (error) {
//             console.error('Error deleting the court:', error);
//         }
//     }
//     return (
//         <div className='userdashboard row'>
//             <div className='sidebar col-lg-2 col-md-3 '>
//                 <div className='optionbar d-flex '>
//                     <span className='p-1 togglebar' onClick={toggleSidebar}> <FaAlignJustify style={{ color: 'black', fontSize: '24px' }} />
//                     </span>
//                 </div>
//                 <div className={options ? 'visible' : 'hidden'}>
//                     <li onClick={() => setdashlist(0)}>Dashboard</li>
//                     <li onClick={() => setdashlist(1)}>view courts</li>
//                     <li onClick={() => setdashlist(2)}>Edit Account</li>
//                     <li onClick={() => setdashlist(3)}>Delete Account</li>
//                     <li onClick={() => setdashlist(4)}>Contact</li>
//                 </div>

//             </div>

//             <div className='usercontent col-lg-10 col-md-9'>
//                 <div style={{
//                     backgroundImage: `url(${backimg})`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     backgroundRepeat: 'no-repeat',
//                 }} className='userdash-header ps-2' >
//                     <h2 className='dash-heading  ps-lg-2'>Dashboard<span className='controlpnl'>Control pannel</span></h2>

//                 </div>
//                 {alertbox && (
//                     <Stack spacing={3} mb={4}>
//                         <Alert status={alertbox.status} variant='subtle'>
//                             <AlertIcon />
//                             <AlertTitle>{alertbox.title}</AlertTitle>
//                             <AlertDescription className='fw-medium'>{alertbox.description}</AlertDescription>
//                         </Alert>
//                     </Stack>
//                 )}

//                 {dashlist == '0' && (
//                     <div className='user-card-box p-lg-4 gap-lg-4  '>
//                         <div className='user-card' onClick={() => navigate('/home')}>
//                             <img className='user-card-img' src={viewsvg} alt="img" />

//                             <div className='card-head'>
//                                 <h3>{courtsNumber}</h3>
//                                 <h5>view Courts</h5>
//                             </div>
//                             <div className='user-card-info'>info</div>
//                         </div>
//                         <div className='user-card-edit'>
//                             <img className='user-card-img' src={addicon} alt="img" />

//                             <div className='card-head'>
//                                 <h3>Edit</h3>
//                                 <h5>Edit Account</h5>
//                             </div>
//                             <div className='user-card-info'>info</div>
//                         </div>
//                         <div className='user-card-delete'>
//                             <img className='user-card-img' src={deleteicon} alt="img" />

//                             <div className='card-head'>
//                                 <h3>Delete</h3>
//                                 <h5>Delete Account</h5>
//                             </div>
//                             <div className='user-card-info'>info</div>
//                         </div>
//                         <div className='user-card-connect'>
//                             <img className='user-card-img' src={connect} alt="img" />

//                             <div className='card-head'>
//                                 <h3>Contact Us</h3>
//                                 <h5>Connect</h5>
//                             </div>
//                             <div className='user-card-info'>info</div>
//                         </div>
//                     </div>
//                 )}
//                 {dashlist == '1' && (
//                     // <div className='user-card-box p-lg-4 gap-lg-4  '>
//                     //     <div className='user-card'>
//                     //         <img className='user-card-img' src={viewsvg} alt="img" />

//                     //         <div className='card-head'>
//                     //             <h5>hhh</h5>
//                     //             <h3>view Courts</h3>
//                     //         </div>
//                     //         <div className='user-card-info'>info</div>
//                     //     </div>

//                     // </div>
//                     <HomePage />
//                 )}
//                 {dashlist == '3' && (
//                     <div className=''>
//                         <h3 className='m-lg-3 text-danger'>Delete Account</h3>
//                         <div className='ps-3'>
//                             <label className='text-black text-capitalize' htmlFor="">why you are deleting your Account?</label>
//                             <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
//                         </div>
//                         <div className='deletebox '>
//                             <button className='btn btn-info' onClick={()=>setdashlist(0)}>Cancel</button>
//                             <button className='btn btn-danger' onClick={() => deleteFunction(user._id)}>Delete</button>
//                         </div>
//                     </div>
//                 )}


//                 {dashlist == '2' && (

//                     <div className=''>
//                         <h3 className='m-lg-3 text-danger'>Edit Account</h3>
//                         <div className='ps-3'>
//                             <label className='text-black text-capitalize' htmlFor="">why you are deleting your Account?</label>
//                             <ReactQuill className='quill' theme="snow" value={value} onChange={setValue} />
//                         </div>
//                         <div className='deletebox '>
//                             <button className='btn btn-info' >Cancel</button>
//                         <button className='btn btn-danger' onClick={() =>{}}>Delete</button>
//                         </div>
//                     </div>
//                 )}


//             </div>



//         </div>
//     )
// }

// export default Userdashboard

import React, { useEffect, useState } from 'react'
import './userdash.css'
import { FaAlignJustify } from 'react-icons/fa';
import viewsvg from '../../../assets/view.svg'
import backimg from '../../../assets/duffy-brook-IwDTKKFmWAc-unsplash.jpg'
import addicon from '../../../assets/create.svg'
import deleteicon from '../../../assets/delete.svg'
import connect from '../../../assets/contact.svg'
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
import { clearUserData } from '../../../redux/userSlice';
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
    const[changePassword,setChangePassword]=useState(false)
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
            const courts = await axios.get('http://localhost:3000/court')
            // const courts = await axios.get('https://new-be-u7li.onrender.com/court')

            setCourtNumber(courts.data.length)
        }
        loadingfunction()
    }, [])

    const deleteFunction = async (id) => {
        try {
            const deleting = await axios.delete(`http://localhost:3000/delete/${id}`);
            // https://projectbe-1-91ol.onrender.com
            // const deleting = await axios.delete(`https://new-be-u7li.onrender.com/delete/${id}`);

            setAlert({
                status: 'success',
                title: 'Success!',
                description: deleting.data
            });
            setTimeout(() => {
                localStorage.removeItem('token');
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
    const onsubmit = (data) => {
        console.log(data);
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
                    <li onClick={() => setdashlist(1)}>View Courts</li>
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
                }} className='userdash-header ps-2'>
                    <h2 className='dash-heading ps-lg-2'>Dashboard<span className='controlpnl'>Control panel</span></h2>
                </div>
                {alertbox && (
                    <Stack spacing={3} mb={4}>
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
                                {!changePassword &&<button className='btn' onClick={()=>setChangePassword(!changePassword)}>Change Password</button>}
                               { changePassword && (<>
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
                                <button type='submit' className='btn btn-info text-white' onClick={() => { }}>Update</button>
                            </div>
                        </form>


                    </div>
                )}
            </div>
        </div>
    )
}

export default Userdashboard


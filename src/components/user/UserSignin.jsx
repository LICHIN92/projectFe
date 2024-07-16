import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import Forget from '../forget/Forget';
// import {Cookies} from 'js-cookie'

const UserSignin = ({ setAuth, setforget, setloader }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    // const[emai,setemail]=useState('')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onsubmit = async (data) => {
        console.log(data);
        // setemail(data.email)
        setloader(true)
        try {
            const Signin = await axios.post("https://newbackend-176c.onrender.com", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            console.log(Signin.data.data);
            if (Signin.data.data === 'Signin successful') {
                // console.log(Cookies.get('token'));
                console.log(Signin.data);
                const token = Signin.data.token
                console.log(Signin);
                sessionStorage.setItem('token', token)
                const userData = await jwtDecode(token)._doc
                dispatch(setUserData(userData))
                console.log(userData.role);

                setTimeout(() => {
                    alert("Signin successful")
                    setloader(false)
                navigate('/home')

                }, 200);
            }
        } catch (error) {
            console.log(error);
            setTimeout(() => {
                alert(error.response.data)
                setloader(false)

            }, 3000);

        }
    }
    return (
        <div className='form_div d-flex flex-column justify-content-center align-items-center  shadow-lg py-2'>

            <form onSubmit={handleSubmit(onsubmit)} className='form d-flex flex-column justify-content-center align-items-center px-3 gap-2'>
                <h1 className='form-header'>Sign In</h1>

                <input type="text" {...register("email", { required: true })} placeholder='Email' />
                {errors.email && <span className=' text-danger'>Email feild is required</span>}
                <input type="password" {...register("password", { required: true })} placeholder='Password' />
                {errors.password && <span className=' text-danger '>Password feild is required</span>}
                <input className='text-uppercase mt-3 bt' type="submit" />
                <span className='forget_password' onClick={() => setforget(true)}>Forget Password</span>
            </form>
            <hr style={{ color: "white", width: '100%' }} />
            <button onClick={() => setAuth('signup')}>Create new account</button>


        </div>

    )
}

export default UserSignin
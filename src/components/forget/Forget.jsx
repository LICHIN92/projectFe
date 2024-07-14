import React, { useState } from 'react'
import './forget.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Loader from '../Loader/Loader'


const Forget = ({ email, setforget }) => {
    const [loader, setLoader] = useState(false)
    const schema = yup.object({
        email: yup.string().email('Invalid email').required('Email is required'),
        mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
        New_Password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirm_Password: yup.string().oneOf([yup.ref('New_Password'), null], 'Passwords must match').required('Confirm Password is required')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const changePassword = async (data) => {
        console.log(data);
        if (data.New_Password === data.confirm_Password) {
            setLoader(true)
            try {
                const result = await axios.patch('https://projectbe-hqct.onrender.com/changePassword', data)
                console.log(result.data);
                setTimeout(() => {
                    setLoader(false)
                    alert(result.data)
                    setforget(false)
                }, 3000);

            } catch (error) {
                setTimeout(() => {
                    setLoader(false),
                    alert(error.response.data)

                }, 3000);

            }
        }

    }
    return (
        <div className='forget-container '>
            {loader ? <Loader /> :
                <div className='formBox'>
                    <h2 className='text-center'>Forget Password</h2>
                    <form onSubmit={handleSubmit(changePassword)}>
                        <div className='label-box'>
                            <label htmlFor="">Enter your Email</label>
                            <input type="email" {...register('email')} defaultValue={email} placeholder='Enter Email' />
                            {errors.email && <small className='span'>{errors.email.message}</small>}
                        </div>
                        <div className='label-box'>
                            <label htmlFor="">Enter your Mobile</label>
                            <input type="number" {...register('mobile')} placeholder='Enter Your Registered Mobile' />
                            {errors.mobile && <small className='span'>{errors.mobile.message}</small>}
                        </div>
                        <div className='label-box'>
                            <label htmlFor="">Enter New Password</label>
                            <input type="password" {...register('New_Password')} placeholder='Enter New Password' />
                            {errors.New_Password && <small className='span'>{errors.New_Password.message}</small>}
                        </div>
                        <div className='label-box'>
                            <label htmlFor="">Confirm Your Password</label>
                            <input type="password" {...register('confirm_Password')} placeholder='Confirm Your Password' />
                            {errors.confirm_Password && <small className='span'>{errors.confirm_Password.message}</small>}
                        </div>
                        <input className='mt-3 Change_Password' type="submit" value={'Change Password'} />
                    </form>
                    <p className=' text-center' onClick={() => setforget(false)}>Login</p>
                </div>
            }




        </div>
    )
}

export default Forget
import React from 'react'
import { useForm } from 'react-hook-form'
import './signin.css'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios'

const UserSignup = ({ setAuth }) => {

  const schema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    mobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const onsubmit = async (data) => {
    try {
      const signup = await axios.post('https://turfhubbe.onrender.com/signup', data,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
      // const signup = await axios.post('https://turfhubbe.onrender.com/signup', data)

      console.log(signup.data.message);
      if(signup.data.message==='User created successfully'){
        alert("account created successfully ")
        setAuth('signin')
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data)
    }
     
    

    console.log(data)
  }

  return (
    <div className='d-flex flex-column shadow-lg px-md-2 px-sm-1 text-center py-2'>
      <form onSubmit={handleSubmit(onsubmit)} className='form d-flex flex-column justify-content-center align-items-center px-3 gap-1'>
        <h1 className='form-header'>Sign up</h1>

        <input type="text" {...register('firstName')} placeholder='First Name' />
        {errors.firstName && <small className='span'>{errors.firstName.message}</small>}

        <input type="text" {...register('lastName')} placeholder='Last Name' />
        {errors.lastName && <small className='span'>{errors.lastName.message}</small>}

        <input type="text" {...register('mobile')} placeholder='Mobile' />
        {errors.mobile && <small className='span'>{errors.mobile.message}</small>}

        <input type="text" {...register('email')} placeholder='Email' />
        {errors.email && <small className='span'>{errors.email.message}</small>}

        <input type="password" {...register('password')} placeholder='Password' />
        {errors.password && <small className='span'>{errors.password.message}</small>}

        <input type="password" {...register('confirmPassword')} placeholder='Confirm Password' />
        {errors.confirmPassword && <small className='span'>{errors.confirmPassword.message}</small>}

        <input className='text-uppercase mt-2 bt' type="submit" />
      </form>
      <span className='' onClick={() => setAuth('signin')}>Already Have An Account</span>
    </div>
  )
}

export default UserSignup

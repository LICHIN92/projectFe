import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const UserSignin = ({ setAuth }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onsubmit = async (data) => {
        console.log(data);
  try {
    const Signin=await axios.post("http://localhost:3000",data)
    console.log(Signin.data.data);
    if(Signin.data.data==='Signin successful'){
        navigate('/home')
    }
  } catch (error) {
    console.log(error);
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
                <input className='text-uppercase mt-3' type="submit" />
            </form>
            <hr style={{ color: "white", width: '100%' }} />
            <button onClick={() => setAuth('signup')}>Create new account</button>
        </div>
    )
}

export default UserSignin
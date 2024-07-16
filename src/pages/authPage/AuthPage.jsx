import React, { useState } from 'react'
import UserSignin from '../../components/user/UserSignin'
import './AuthPage.css'
import imgg from '../../assets/turf.avif'
import logo from '../../assets/logo.png'
import UserSignup from '../../components/user/UserSignup'
import Forget from '../../components/forget/Forget'
import Loader from '../../components/Loader/Loader'

const AuthPage = () => {
    const [auth, setAuth] = useState('signin')
    const [forget, setforget] = useState(false)
    const [loader, setloader] = useState(false)
    return (

        <div className='auth_parent pb-3'>
            <>
                {loader && <Loader />}

                {forget && <Forget setforget={setforget} />}

                <div className='logo'>
                    <h1>turf_hub
                        <small className='h1small'>Get on the field faster</small>
                    </h1>


                </div>
                <div className='auth-box row '>
                    <div className='right_box col-12 col-md-6'
                        style={{
                            backgroundImage: `url(${imgg})`,
                            backgroundSize: 'fit',
                            backgroundPosition: 'center',
                            backgroundRepeat: "no-repeat",

                        }}>
                        <h2 className='fs-3'>Where champions come to play</h2>
                    </div>
                    <div className='auth col-12 col-md-6'>
                        {auth == 'signin' ? <UserSignin setAuth={setAuth} setloader={setloader} setforget={setforget} /> : <UserSignup setloader={setloader} setAuth={setAuth} />}
                    </div>
                </div>

            </>


        </div>

    );
}

export default AuthPage
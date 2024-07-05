import React from 'react'
import './Loader.css'
import loader from '../../assets/loader.svg'
const Loader = () => {
  return (
    <div className='loader-container'>
        <div className="loaderbox">
            <img src={loader} alt="" />
            <h5 className='text-white'>Loading <span>...</span></h5>
        </div>

    </div>
  )
}

export default Loader
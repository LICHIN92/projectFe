import React from 'react'
import './bookingmodal.css'
import '../../assets/modalclose.svg'
import close from '../../assets/modalclose.svg'
const Bookmodal = ({heading,CloseModal,children}) => {
    return (
        <div className='modal-container  d-flex justify-content-center align-items-center'>
          <div className='modal-box border border-1 me-md-1 me-4'>
            <img src={close} style={{height:'35px',width:'35px'}} className='modal-close' alt="close"  onClick={CloseModal} />
            <div className='modal-heading w-100 '>
              <span className='modal-span '>book</span>{heading}
            </div>
            {children}
          </div>
        </div>
      )
}

export default Bookmodal
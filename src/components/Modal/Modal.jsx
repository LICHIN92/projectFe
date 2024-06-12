import React from 'react'
import './modal.css'
import '../../assets/modalclose.svg'
import close from '../../assets/modalclose.svg'
const Modal = ({ heading,CloseModal,children }) => {
  return (
    <div className='modal-container d-flex justify-content-center align-items-center'>
      <div className='modal-box border border-1'>
        <img src={close} style={{height:'35px',width:'35px'}} className='modal-close' alt="close"  onClick={CloseModal} />
        <div className='modal-heading w-100'>
          {heading}
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
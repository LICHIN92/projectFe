import React from 'react'
import Carousels from '../../components/carousel/Carousels'
import { useLocation } from 'react-router-dom'

const CourtDetail = () => {
  const location=useLocation();
  const data=location.state.court
  console.log(data);
  return (
    <div className=''>
        <Carousels data={data}/>
    </div>
  )
}

export default CourtDetail
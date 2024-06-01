import React, { useState } from 'react'
import '../AddCourt/addcourt.css'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const AddCourt = () => {
    const sportsOptions = [
        'Basketball',
        'Football',
        'Tennis',
        'Cricket',
        'Badminton',
        'Hockey'
    ];
    const [availableSports, SetAvailableSports] = useState(sportsOptions)
    const [selectedSports, setSelectedSports] = useState([])
    const handleCheckBoxChange = (sport) => {
        if (selectedSports.includes(sport)) {
            setSelectedSports(selectedSports.filter((s) => s !== sport));
        } else {
            setSelectedSports([...selectedSports, sport]);
        }
    }
    const {register,handleSubmit}=useForm({resolver:yupResolver(schema)})
    const schema=yup.object({
        
    })
    const Submit = () => {
        console.log(selectedSports);
    }
    return (
        <div className='container-fluid addcourt p-2'>

            <div className='row p-0 p-md-3'>
                <h1>Add New Court</h1>
                <form action="" onSubmit={handleSubmit(Submit)} className='row px-lg-5 px-md-3'>
                    <div className='d-flex flex-column  col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtname">Court Name</label>
                        <input type="text" {...register('CourtName')} id='courtname' placeholder='Court Name'/>
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtlocation">Location</label>
                        <input type="text" {...register('Location')} id='courtlocation' placeholder='Location' />
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="contact">Contact Number</label>
                        <input type="text" {...register('ContactNumber')} id='contact' placeholder='Contact Number' />
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress1">Address Line1</label>
                        <input type="text" {...register('AddressLine1')} id='courtAddress1'  placeholder='Address Line1'/>
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress2">Address Line2</label>
                        <input type="text" {...register('AddressLine2 ')} id='courtAddress2' placeholder='Address Line2'/>
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress3">Address Line3</label>
                        <input type="text" {...register('AdreessLine3')} id='courtAddress3' placeholder='Address Line3' />
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="landmark">Landmark</label>
                        <input type="text" {...register('Landmark')} id='landmark'  placeholder='Landmark'/>
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courttype">Court Type</label>
                        <input type="text" {...register('CourtType')} id='courttype' placeholder='Court Type'/>
                    </div>
                    <div className='d-flex flex-column my-2'>
                        <label htmlFor="">Sports Available</label>
                        <div className='row gap-2 ms-2'>
                            {availableSports.map((sports, index) => (
                                <div className='checkbox  col-2 col-md-2'>
                                    <input type="checkbox" id={`${sports}`} className='check' 
                                        checked={selectedSports.includes(sports)}
                                        onChange={() => handleCheckBoxChange(sports)} />
                                    <label htmlFor={sports} className='label'>{sports}</label>
                                </div>

                            ))}
                        </div>

                    </div>
                    <div className='d-flex flex-column'>
                        <label htmlFor="courtImage">Upload image</label>
                        <input type="file" id='courtImage' />
                    </div>

                    <button type='submit' className='col-md-6 col-lg-4 my-1'>Add Court</button>
                </form>
            </div>


        </div>
    )
}

export default AddCourt
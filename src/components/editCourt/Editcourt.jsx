import React, { useState } from 'react'
import './Editcourt.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Editcourt = ({ seteditcourt, court }) => {
    const courtz = court
    const id = court._id
    const [formData, setFormData] = useState({
        CourtName: court.CourtName,
        Location: court.Location,
        AddressLine1: court.AddressLine1,
        AddressLine2: court.AddressLine2,
        AddressLine3: court.AddressLine3,
        Price: court.Price,
        CourtType: court.CourtType
    });
    const navigate=useNavigate()

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const updatecourt =async (e)=> {
        e.preventDefault();
        console.log(formData);
        try {
             const upload=await axios.patch(`https://projectbe-hqct.onrender.com/court/${id}`,formData)
             console.log(upload);
             alert(upload.data.message)
             seteditcourt(false)
             navigate('/home')
        } catch (error) {
            
        }
    }

    return (
        <div className='editContainer'>
            <form onSubmit={updatecourt}>
                <div className='eidtbox'>
                    <h3 className='text-center '>{courtz.CourtName}</h3>
                    <div className='mini-box'>
                        <label htmlFor="">Court Name</label>
                        <input type="text" name='CourtName' value={formData.CourtName} onChange={handleOnChange}  required />
                    </div>

                    <div className='mini-box'>
                        <label htmlFor="">Location</label>
                        <input type="text" name='Location' value={formData.Location}  onChange={handleOnChange}  required />

                    </div>
                    <div className='mini-box'>
                        <label htmlFor="">Address</label>
                        <input type="text" name='AddressLine1' value={formData.AddressLine1} onChange={handleOnChange}   required />

                        <input type="text" name='AddressLine2' value={formData.AddressLine2} onChange={handleOnChange}  required />

                        <input type="text" name='AddressLine3'  value={formData.AddressLine3} onChange={handleOnChange}  required />

                    </div>
                    <div className='mini-box'>
                        <label htmlFor="">Price</label>
                        <input type="text" name='Price' value={formData.Price}  onChange={handleOnChange}  required />

                    </div>
                    <div className='mini-box'>
                        <label htmlFor="">Court Type</label>
                        <input type="text" name='CourtType'  value={formData.CourtType} onChange={handleOnChange}  required />

                    </div>
                    <div className="d-flex justify-content-center flex-wrap gap-2">
                    <button type='submit' className='save'  >SAVE</button>
                    <button className='cancel-edit text-uppercase' onClick={() => { seteditcourt(false) }}> Cancel</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Editcourt


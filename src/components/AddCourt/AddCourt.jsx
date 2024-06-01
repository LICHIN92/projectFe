// import React, { useState } from 'react'
// import '../AddCourt/addcourt.css'
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// const AddCourt = () => {
//     const sportsOptions = [
//         'Basketball',
//         'Football',
//         'Tennis',
//         'Cricket',
//         'Badminton',
//         'Hockey'
//     ];
//     const [selectedSports, setSelectedSports] = useState([])
//     const handleCheckBoxChange = (sport) => {
//         if (selectedSports.includes(sport)) {
//             setSelectedSports(selectedSports.filter((s) => s !== sport));
//         } else {
//             setSelectedSports([...selectedSports, sport]);
//         }
//     }

//     const schema = yup.object({
//         CourtName: yup.string().min(2).required('Please add Court Name'),
//         Location: yup.string().min(3).required('Please add Location'),
//         AddressLine1: yup.string().min(3).required('Please provide Address Line 1'),
//         AddressLine2: yup.string().min(3).required('Please provide Address Line 2'),
//         AddressLine3: yup.string().min(3).required('Please provide Address Line 3'),
//         Landmark: yup.string().min(3).required('Please provide Landmark'),
//         CourtType: yup.string().min(3).required('Please provide Court Type'),
//     });
//     const {register,handleSubmit,formState:{errors}}=useForm( {resolver: yupResolver(schema)})

//     const onSubmit = (data) => {
//         console.log(selectedSports);
//         console.log(data);
//     }
//     return (
//         <div className='container-fluid addcourt p-2'>

//             <div className='row p-0 p-md-3'>
//                 <h1>Add New Court</h1>
//                 <form onSubmit={handleSubmit(onSubmit)} className='row px-lg-5 px-md-3'>
//                     <div className='d-flex flex-column  col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courtname">Court Name</label>
//                         <input type="text" {...register('CourtName')} id='courtname' placeholder='Court Name'/>
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courtlocation">Location</label>
//                         <input type="text" {...register('Location')} id='courtlocation' placeholder='Location' />
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="contact">Contact Number</label>
//                         <input type="text" {...register('ContactNumber')} id='contact' placeholder='Contact Number' />
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courtAddress1">Address Line1</label>
//                         <input type="text" {...register('AddressLine1')} id='courtAddress1'  placeholder='Address Line1'/>
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courtAddress2">Address Line2</label>
//                         <input type="text" {...register('AddressLine2 ')} id='courtAddress2' placeholder='Address Line2'/>
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courtAddress3">Address Line3</label>
//                         <input type="text" {...register('AdreessLine3')} id='courtAddress3' placeholder='Address Line3' />
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="landmark">Landmark</label>
//                         <input type="text" {...register('Landmark')} id='landmark'  placeholder='Landmark'/>
//                     </div>
//                     <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
//                         <label htmlFor="courttype">Court Type</label>
//                         <input type="text" {...register('CourtType')} id='courttype' placeholder='Court Type'/>
//                     </div>
//                     <div className='d-flex flex-column my-2'>
//                         <label htmlFor="">Sports Available</label>
//                         <div className='row gap-2 ms-2'>
//                             {sportsOptions.map((sports, index) => (
//                                 <div className='checkbox  col-2 col-md-2'>
//                                     <input type="checkbox" id={`${sports}`} className='check' 
//                                         checked={selectedSports.includes(sports)}
//                                         onChange={() => handleCheckBoxChange(sports)} />
//                                     <label htmlFor={sports} className='label'>{sports}</label>
//                                 </div>

//                             ))}
//                         </div>

//                     </div>
//                     <div className='d-flex flex-column'>
//                         <label htmlFor="courtImage">Upload image</label>
//                         <input type="file" id='courtImage' />
//                     </div>
//                      <input type="submit" />
//                     {/* <button type='submit' className='col-md-6 col-lg-4 my-1'>Add Court</button> */}
//                 </form>
//             </div>


//         </div>
//     )
// }

// export default AddCourt



import React, { useState } from 'react';
import '../AddCourt/addcourt.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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

    const [selectedSports, setSelectedSports] = useState([]);

    const handleCheckBoxChange = (sport) => {
        if (selectedSports.includes(sport)) {
            setSelectedSports(selectedSports.filter((s) => s !== sport));
        } else {
            setSelectedSports([...selectedSports, sport]);
        }
    };

    const schema = yup.object({
        CourtName: yup.string().required('Please add CourtName'),
        Location: yup.string().min(3).required('Please add Location'),
        ContactNumber: yup.string().matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
        AddressLine1: yup.string().min(3).required('Please provide AddressLine1'),
        AddressLine2: yup.string().min(3).required('Please provide AddressLine2'),
        AddressLine3: yup.string().min(3).required('Please provide AddressLine3'),
        Landmark: yup.string().min(3).required('Please provide Landmark'),
        CourtType: yup.string().min(3).required('Please provide your CourtType')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log('Selected Sports:', selectedSports);
        const formdata={...data}
        formdata.selectedSports=selectedSports
        console.log(formdata);
        console.log(formdata.selectedSports);
    };

    return (
        <div className='container-fluid addcourt p-2'>
            <div className='row p-0 p-md-3'>
                <h1>Add New Court</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='row px-lg-5 px-md-3'>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtname">Court Name</label>
                        <input type="text" {...register('CourtName')} id='courtname' placeholder='Court Name' />
                        {errors.CourtName && <small className="error">{errors.CourtName.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtlocation">Location</label>
                        <input type="text" {...register('Location')} id='courtlocation' placeholder='Location' />
                        {errors.Location && <small className="error">{errors.Location.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="contact">Contact Number</label>
                        <input type="text" {...register('ContactNumber')} id='contact' placeholder='Contact Number' />
                        {errors.ContactNumber && <small className="error">{errors.ContactNumber.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress1">Address Line1</label>
                        <input type="text" {...register('AddressLine1')} id='courtAddress1' placeholder='Address Line1' />
                        {errors.AddressLine1 && <small className="error">{errors.AddressLine1.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress2">Address Line2</label>
                        <input type="text" {...register('AddressLine2')} id='courtAddress2' placeholder='Address Line2' />
                        {errors.AddressLine2 && <small className="error">{errors.AddressLine2.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress3">Address Line3</label>
                        <input type="text" {...register('AddressLine3')} id='courtAddress3' placeholder='Address Line3' />
                        {errors.AddressLine3 && <small className="error">{errors.AddressLine3.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="landmark">Landmark</label>
                        <input type="text" {...register('Landmark')} id='landmark' placeholder='Landmark' />
                        {errors.Landmark && <small className="error">{errors.Landmark.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courttype">Court Type</label>
                        <input type="text" {...register('CourtType')} id='courttype' placeholder='Court Type' />
                        {errors.CourtType && <small className="error">{errors.CourtType.message}</small>}
                    </div>
                    <div className='d-flex flex-column my-2'>
                        <label htmlFor="">Sports Available</label>
                        <div className='row gap-2 ms-2'>
                            {sportsOptions.map((sport, index) => (
                                <div key={index} className='checkbox col-2 col-md-2'>
                                    <input type="checkbox" id={`${sport}`} className='check'
                                        checked={selectedSports.includes(sport)}
                                        onChange={() => handleCheckBoxChange(sport)} />
                                    <label htmlFor={sport} className='label'>{sport}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex flex-column'>
                        <label htmlFor="courtImage">Upload image</label>
                        <input type="file" id='courtImage' />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddCourt;

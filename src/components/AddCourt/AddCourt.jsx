import React, { useRef, useState } from 'react';
import '../AddCourt/addcourt.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import addimage from '../../assets/add-image-frame-svgrepo-com (1).svg'
import close from '../../assets/close.svg.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate=useNavigate()
    const fileInputRef = useRef();

    const handleCheckBoxChange = (sport) => {
        const updatedSports = selectedSports.includes(sport)
            ? selectedSports.filter((s) => s !== sport)
            : [...selectedSports, sport];
        setSelectedSports(updatedSports);
        setValue('AvailableSports', updatedSports);
    };

    const handleAddIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter((file) => file.type.startsWith("image/") || file.type.startsWith("video/"));
        setSelectedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...validFiles];
            setValue('files', updatedFiles);
            return updatedFiles;
        });
    };

  const remover=(index)=>{
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));


  }

    const schema = yup.object({
        CourtName: yup.string().required('Please add Court Name'),
        Location: yup.string().min(3).required('Please add Location'),
        ContactNumber: yup.string().matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
        AddressLine1: yup.string().min(3).required('Please provide Address Line 1'),
        AddressLine2: yup.string().min(3).required('Please provide Address Line 2'),
        AddressLine3: yup.string().min(3).required('Please provide Address Line 3'),
        Landmark: yup.string().min(3).required('Please provide Landmark'),
        CourtType: yup.string().min(3).required('Please provide Court Type')
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        // data.availableSports = selectedSports;
        data.files = selectedFiles;
        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'files') {
                    value.forEach((file) => {
                        formData.append('image', file);
                    });
                } else {
                    formData.append(key, value);
                }
            });
            
            console.log(data);
           const response= await axios.post("http://localhost:3000/admin", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response);
            alert(response.data.data)
            navigate('/home')
           
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='container-fluid addcourt p-2'>
            <div className='row p-0 p-md-3'>
                <h1>Add New Court</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='row px-lg-5 ms-sm-3 px-md-3'>
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
                        <label htmlFor="courtAddress1">Address Line 1</label>
                        <input type="text" {...register('AddressLine1')} id='courtAddress1' placeholder='Address Line 1' />
                        {errors.AddressLine1 && <small className="error">{errors.AddressLine1.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress2">Address Line 2</label>
                        <input type="text" {...register('AddressLine2')} id='courtAddress2' placeholder='Address Line 2' />
                        {errors.AddressLine2 && <small className="error">{errors.AddressLine2.message}</small>}
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-4 my-2'>
                        <label htmlFor="courtAddress3">Address Line 3</label>
                        <input type="text" {...register('AddressLine3')} id='courtAddress3' placeholder='Address Line 3' />
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
                        <label>Sports Available</label>
                        <div className='row ms-1'>
                            {sportsOptions.map((sport, index) => (
                                <div key={index} className='checkbox '>
                                    <input type="checkbox" id={`${sport}`} className='check'
                                        checked={selectedSports.includes(sport)}
                                        onChange={() => handleCheckBoxChange(sport)} />
                                    <label htmlFor={sport} className='label'>{sport}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex flex-column col-md-6 col-lg-12 my-2'>
                        <label htmlFor="courtImage">Upload image</label>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            required
                            accept='image/*,video/*'
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <div className="image-preview d-flex gap-3 flex-wrap">
                            {selectedFiles.map((file, index) => (
                                file.type.startsWith("image/") && (
                                    <div className='image_box' key={index}>
                                        <span className='close' onClick={()=>remover(index)} > <img className='close_img' src={close} alt="" /></span>
                                    <img src={URL.createObjectURL(file)} alt='' height={110} key={index} className='images' />

                                    </div>
                                )
                            ))}
                        </div>
                        <img src={addimage} className='my-2' id='courtImage' style={{ width: '50px', cursor: "pointer" }} alt="" onClick={handleAddIconClick} />
                    </div>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddCourt;

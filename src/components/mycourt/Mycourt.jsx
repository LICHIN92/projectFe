import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { TIMINGS } from '../Constant/constant';
import Modal from '../Modal/Modal';
import './mycourt.css'
import calender from '../../assets/calender.svg'

const Mycourt = () => {
    const { user } = useSelector(state => state.user)
    const [MyCourt, setMyCourt] = useState()
    const[timing,setTiming]=useState(TIMINGS)
    const [timeSlot,SetTimeSlot]=useState(false)
    console.log(timing);
    useEffect(() => {
        const getMyCourt = async () => {
            try {
                if (user && user._id) {
                    const mycourt = await axios.get(`http://localhost:3000/court/mycourt/${user._id}`)
                    console.log(mycourt);
                    await setMyCourt(mycourt.data)
                    console.log(MyCourt);
                }


            } catch (error) {
                console.log(error);
            }
        }
        if (user && user._id) {
            getMyCourt();
        }
    }, [])
    return (
        <div>
            <h1>My Court</h1>
            <div className='d-flex flex-wrap gap-3 px-3'>
                {MyCourt && MyCourt.length > 0 ? (
                    MyCourt.map(court => (
                        <Card style={{ width: '18rem' }} key={court._id}>
                            <Card.Img variant="top"  src={court.pics[0]} alt={court.CourtName} style={{ width: '10rem', height: '10rem', alignSelf: 'center' }}
                     />
                            <Card.Body>
                                <Card.Title>{court.CourtName}</Card.Title>
                                <Card.Text>{court.Location}</Card.Text>
                                <Button variant="primary" onClick={()=>SetTimeSlot(true)}>Add Slot</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No court</p>
                )}
            </div>
            {timeSlot && <Modal
            heading={'Add New Time Slots'}
             CloseModal={()=>SetTimeSlot(false)}>
                <div className='.time-slot-select-modal p-2 d-flex justify-content-center  gap-3'>
                    <p>Select Date </p>
                    <img src={calender} alt="" style={{height:'24px'}} /> 
                </div>
                </Modal>}
        </div>
    )
}

export default Mycourt
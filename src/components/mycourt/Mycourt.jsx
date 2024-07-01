import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { TIMINGS } from '../Constant/constant';
import Modal from '../Modal/Modal';
import './mycourt.css'
import calender from '../../assets/calender.svg'
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from 'react-date-range'
import arrow from '../../assets/arrow.svg'
import times from '../../assets/timeslot.svg'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react'

const Mycourt = () => {
    const { user } = useSelector(state => state.user)
    const [MyCourt, setMyCourt] = useState()
    const [timing, setTiming] = useState(TIMINGS)
    const [timeSlot, SetTimeSlot] = useState(false)
    const [openCalendar, SetOpenCalender] = useState(false)
    const [selectedCourt, setSelectedCourt] = useState(null)
    const [DateRangeState, setDateRangeState] = useState({
        startDate: null,
        endDate: null,
        key: 'selection'
    })
    const [opentime, SetOpentime] = useState(false)
    const [selectedSlots, setSelectedSlots] = useState([])
    const [alertbox, setAlertbox] = useState(null)

    const modalStartfunction = (court) => {
        setSelectedCourt(court)
        setDateRangeState({ startDate: null, endDate: null, key: 'selection' });
        SetTimeSlot(true)
        setTiming(TIMINGS)
        setSelectedSlots([])
    }
    console.log(DateRangeState.startDate);
    const Canselfun = () => {
        SetOpenCalender(false)
        setDateRangeState({ startDate: null, endDate: null, key: 'selection' });
    }

    const selectSlot = (slot) => {
        setSelectedSlots([...selectedSlots, slot])
        const newtimer = timing.filter((time) => slot.id != time.id)
        setTiming(newtimer)
        SetOpentime(false)
    }
    console.log(selectedSlots);
    console.log(timing);
    const removetimeslot = (slot) => {
        console.log(slot);
        const slots = selectedSlots.filter((item) => slot.id != item.id);
        setSelectedSlots(slots)
        setTiming([...timing, slot])
    }
    useEffect(() => {
        const getMyCourt = async () => {
            try {
                if (user && user._id) {
                    const mycourt = await axios.get(`https://projectbe-hqct.onrender.com/court/mycourt/${user._id}`)
                    // const mycourt = await axios.get(`https://projectbe-hqct.onrender.com/court/mycourt/${user._id}`)

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

    const CreateShedule = async (court) => {
        console.log(court);
        console.log(selectedSlots);
        console.log(DateRangeState);
        const token = sessionStorage.getItem('token')
        if (DateRangeState.startDate) {
            if (selectedSlots.length>0) {
                try {
                    const createSlot = await axios.post(`https://projectbe-hqct.onrender.com/Slot/${court._id}`,
                        {
                            startDate: DateRangeState.startDate,
                            endDate: DateRangeState.endDate,
                            selectedSlot: selectedSlots
                        }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                    )
                    console.log(createSlot);
                    SetTimeSlot(false)
                    setAlertbox({
                        status: 'success',
                        title: 'Success!',
                        description: createSlot.data.message
                    });
                    setTimeout(() => { setAlertbox(null) }, 4000);
                } catch (error) {
                    console.log(error);
                    alert(error.response.data)
                }

            } else {
                alert('Please Select Slot')
            }
        }else{
            alert('pleade select Date')
        }

    }
    return (
        <div>
            <h1>My Court</h1>
            {alertbox && (
                <Stack spacing={3} mb={4}>
                    <Alert status={alertbox.status} variant='subtle'>
                        <AlertIcon />
                        <AlertTitle>{alertbox.title}</AlertTitle>
                        <AlertDescription>{alertbox.description}</AlertDescription>
                    </Alert>
                </Stack>
            )}
            <div className='d-flex flex-wrap gap-3 px-3'>

                {MyCourt && MyCourt.length > 0 ? (
                    MyCourt.map(court => (
                        <Card style={{ width: '18rem' }} key={court._id}>
                            <Card.Img variant="top"
                                src={court.pics[0]} alt={court.CourtName}
                                style={{ width: '18rem', height: '10rem', alignSelf: 'center' }}
                            />
                            <Card.Body>
                                <Card.Title>{court.CourtName}</Card.Title>
                                <Card.Text>{court.Location}</Card.Text>
                                <Button variant="primary" onClick={() => modalStartfunction(court)}>Add Slot</Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No court</p>
                )}
            </div>
            {timeSlot && <Modal
                heading={`${selectedCourt.CourtName}`}
                CloseModal={() => SetTimeSlot(false)}>
                <div className='time-slot-select-modal'>
                    <div className='d-flex gap-3'>
                        <span>Select Date </span>
                        <img src={calender} alt="" className='calendar-img' onClick={() => SetOpenCalender(true)} />
                    </div>


                    <div className='d-flex  gap-1 gap-sm-2 align-items-center mt-1 px-md-2'>
                        {DateRangeState.startDate && (
                            <>
                                <div className='timeslot-date flex-grow-1 border border-1 rounded-1 p-1'>
                                    {DateRangeState.startDate && DateRangeState.startDate.toDateString()}
                                </div>
                                <img src={arrow} className='arrow' alt="arrow" />
                                <div className='timeslot-date flex-grow-1 border border-1 rounded-1 p-1'>
                                    {DateRangeState.endDate && DateRangeState.endDate.toDateString()}
                                </div>
                            </>
                        )}

                    </div>
                </div>


                {openCalendar && (
                    <div className='calender-box'>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDateRangeState(item.selection)}
                            moveRangeOnFirstSelection={false}
                            ranges={[DateRangeState]}
                            minDate={new Date()}
                        />
                        <div className='d-flex gap-2 px-2 py-2'>
                            <button className='btn btn-danger' onClick={Canselfun}>Cancel</button>
                            <button className='btn btn-success' onClick={() => SetOpenCalender(false)}>Set Date</button>
                        </div>

                    </div>
                )}

                <div className='time-slot-select-modal'>
                    <div className='d-flex gap-3 mb-1'>
                        <span>Select Slots</span>
                        <img src={times} alt="time" className='time-img' onClick={() => SetOpentime(true)} />
                    </div>
                    {opentime && timing.length > 0 ? (
                        <ul className='list'>
                            {timing.map((slot) => <li className='slot-list ' onClick={() => selectSlot(slot)}>{slot.name}</li>)}
                        </ul>
                    ) : null}
                    <div className='selectedSlots '>
                        {selectedSlots.map((slot) => <span className='selected-time-slot' onClick={() => removetimeslot(slot)}>{slot.name}</span>)}
                    </div>
                </div>
                <div className="buttons">
                    <button className='btn btn-dark'>Cancel</button>
                    <button className='btn btn-info' onClick={() => CreateShedule(selectedCourt)}>Create</button>
                </div>
            </Modal>}
        </div>
    )
}

export default Mycourt
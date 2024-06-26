import React, { useEffect, useState } from 'react'
import '../admindashboard/admindash.css'
import court from '../../../assets/court.svg'
import users from '../../../assets/users.svg'
import book from '../../../assets/calender.svg'
import deleteicon from '../../../assets/delete.svg'
import addicon from '../../../assets/create.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Stack,
} from '@chakra-ui/react'

const AdminDashboars = () => {
    const [dash, setdash] = useState('0')
    const [NoCourts, setNocourt] = useState()
    const [Nousers, setusers] = useState()
    const [NoOrders, setOrders] = useState()
    const [options, setOptions] = useState(false)
    const togglebar = () => setOptions(!options)
    const navigate = useNavigate()
    const [courtz, setcourtz] = useState()
    const [alertbox, setAlertbox] = useState(null)
    useEffect(() => {
        const getcourtnumber = async () => {
            try {
                // const courts = await axios.get('https://projectbe-1-91ol.onrender.com/court')
                // https://projectbe-1-91ol.onrender.com
                const courts = await axios.get('https://projectbe-1-91ol.onrender.com/court')

                console.log('courts', courts.data.length);
                setNocourt(courts.data.length)
                setcourtz(courts.data)

                // const users = await axios.get('https://projectbe-1-91ol.onrender.com/usercount')
                const users = await axios.get('https://projectbe-1-91ol.onrender.com/usercount')

                setusers(users.data)
                console.log(users);
                // const orders = await axios.get('https://projectbe-1-91ol.onrender.com/Order')
                const orders = await axios.get('https://projectbe-1-91ol.onrender.com/Order')

                console.log(orders);
                setOrders(orders.data)
                console.log(courtz);
            } catch (error) {
                console.log(error);
            }
        }
        getcourtnumber()
    }, [])

    const deletecourt = async (id) => {
        try {
            const deleting = await axios.delete(`https://projectbe-1-91ol.onrender.com/court/${id}`)
            setAlertbox({
                status: 'success',
                title: 'Success!',
                description: deleting.data.message
            });
            setTimeout(() => {
                getcourtnumber();
                setdash(0);
                setAlertbox(null);
              }, 3000);
            
            console.log(deleting.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='dashboard row '>
             {alertbox && (
                    <Stack spacing={3} mb={4}>
                        <Alert status={alertbox.status} variant='subtle'>
                            <AlertIcon />
                            <AlertTitle>{alertbox.title}</AlertTitle>
                            <AlertDescription>{alertbox.description}</AlertDescription>
                        </Alert>
                    </Stack>
                )}
            <div className='options col-md-2 '>
                <div className='optionbar d-flex '>
                    <span className='p-1 togglebar' onClick={togglebar}> <FaAlignJustify style={{ color: 'black', fontSize: '24px' }} />
                    </span>
                </div>
                <div className={options ? 'visible' : 'hidden'}>
                    <li className='option-list' onClick={() => { setdash(0), togglebar() }}>Dashboard</li>
                    <li className='option-list' onClick={() => { setdash(1), togglebar() }}>Courts</li>
                    <li className='option-list' onClick={() => { setdash(2), togglebar() }}>Users</li>
                    <li className='option-list' onClick={() => { setdash(3), togglebar() }}>Bookings</li>
                    <li className='option-list' onClick={() => { setdash(4), togglebar() }}>Delete Court</li>
                    <li className='option-list' onClick={() => navigate('/addCourt')}>Create Court</li>

                </div>

            </div>
            {dash == '0' && (
                <div className='panelbox col-md-10 pt-2'>
                    <h2 className=' ps-lg-2'>Dashboard<span className='controlpnl'>Control pannel</span></h2>

                    <div className="cards ps-lg-4">
                        <div className='panelcard1' onClick={() => setdash(1)}>
                            <img className='user-card-img1' src={court} alt="" />
                            <div className='card-headers'>
                                <h3>{NoCourts} </h3>
                                <h5> No.of Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                        <div className='panelcard2' onClick={() => setdash(2)}>
                            <img className='user-card-img1' src={users} alt="" />
                            <div className='card-headers'>
                                <h3>{Nousers}</h3>
                                <h5>No.of Users</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>

                        </div>
                        <div className='panelcard3' onClick={() => setdash(3)}>
                            <img className='user-card-img1' src={book} alt="" />
                            <div className='card-headers'>
                                <h3>{NoOrders}</h3>
                                <h5>No.of Bookings</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                        <div className='panelcard4' onClick={() => setdash(4)}>
                            <img className='user-card-img1' src={deleteicon} alt="" />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>Deleted Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>

                        </div>
                        <div className='panelcard5' onClick={() => navigate('/addCourt')}>
                            <img className='user-card-img1' src={addicon} alt="" />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>Create Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                    </div>
                </div>

            )}

            {dash == '1' && (
                <div className='panelbox col-md-10 pt-2 '>
                    <h2 className=''>Dashboard<span className='controlpnl'>Control pannel</span></h2>
                    <div className="cards">
                        <div className='panelcard1'>
                            <img src={court} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>{NoCourts} </h3>
                                <h5> No.of Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {dash == '2' && (
                <div className='panelbox col-md-10 pt-2 '>
                    <h2 className=''>Dashboard<span className='controlpnl'>Control pannel</span></h2>
                    <div className="cards">
                        <div className='panelcard2'>
                            <img src={users} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>{Nousers}</h3>
                                <h5>No.of Users</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {dash == '3' && (
                <div className='panelbox col-md-10 pt-2 '>
                    <h2 className=''>Dashboard<span className='controlpnl'>Control pannel</span></h2>
                    <div className="cards">
                        <div className='panelcard3'>
                            <img src={book} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>number</h3>
                                <h5>No.of Bookings</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {dash == '4' && (<>
                <div className='panelbox col-md-10  ' >
                    <h2 className=''>Dashboard<span className='controlpnl'>Control pannel</span></h2>
                    <div className="cards">
                        <div className='panelcard4' onClick={() => setdash(4)}>
                            <img className='user-card-img1' src={deleteicon} alt="" />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>Deleted Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>

                        </div>
                    </div>
                    <h4 className='text-decoration-underline'>Delete Court</h4>
                    <table className='table p-2'>
                        {courtz.map((item, index) => (
                            <tr className='ps-2'>
                                <th className='ms-2'> {index + 1}</th>
                                <th className='ps-lg-1 py-2'>{item.CourtName}</th>
                                <th > <span className='delete-span text-bg-danger' onClick={() => deletecourt(item._id)}> Delete</span></th>
                            </tr>
                        ))}

                    </table>
                </div>
            </>
            )}
        </div>

    )
}

export default AdminDashboars



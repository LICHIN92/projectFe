import React, { useEffect, useState } from 'react'
import '../admindashboard/admindash.css'
import court from '../../../assets/court.svg'
import users from '../../../assets/users.svg'
import book from '../../../assets/calender.svg'
import deleteicon from '../../../assets/delete.svg'
import addicon from '../../../assets/create.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminDashboars = () => {
    const [dash, setdash] = useState('0')
    const [NoCourts, setNocourt] = useState()
    const [Nousers, setusers] = useState()
    const navigate=useNavigate()
    useEffect(() => {
        const getcourtnumber = async () => {
            try {
                // const courts = await axios.get('http://localhost:3000/court')
                // https://projectbe-1-91ol.onrender.com
                const courts = await axios.get('https://new-be-u7li.onrender.com/court')

                console.log('courts', courts.data.length);
                setNocourt(courts.data.length)
                // const users = await axios.get('http://localhost:3000/usercount')
                const users = await axios.get('https://new-be-u7li.onrender.com/usercount')

                setusers(users.data)
                console.log(users);
            } catch (error) {
                console.log(error);
            }
        }
        getcourtnumber()
    }, [])
    return (
        <div className='dashboard row '>
            <div className='options col-md-2 h-auto'>
                <li className='option-list' onClick={() => setdash(0)}>Dashboard</li>
                <li className='option-list' onClick={() => setdash(1)}>Courts</li>
                <li className='option-list' onClick={() => setdash(2)}>Users</li>
                <li className='option-list' onClick={() => setdash(3)}>Bookings</li>
                <li className='option-list' onClick={() => setdash(4)}>Delete Court</li>
                <li className='option-list' onClick={() => navigate('/addCourt')}>Create Court</li>

            </div>
            {dash == '0' && (
                <div className='panelbox col-md-10 pt-2'>
                    <h2 className=' ps-lg-2'>Dashboard<span className='controlpnl'>Control pannel</span></h2>

                    <div className="cards ps-lg-4">
                        <div className='panelcard1' onClick={() => setdash(1)}>
                            <img src={court} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>{NoCourts} </h3>
                                <h5> No.of Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                        <div className='panelcard2' onClick={() => setdash(2)}>
                            <img src={users} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>{Nousers}</h3>
                                <h5>No.of Users</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>

                        </div>
                        <div className='panelcard3' onClick={() => setdash(3)}>
                            <img src={book} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>No.of Bookings</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                        <div className='panelcard4' onClick={() => setdash(4)}>
                            <img src={deleteicon} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>Deleted Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                        <div className='panelcard5' onClick={() => navigate('/addCourt')}>
                            <img src={addicon} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
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
            {dash == '4' && (
                <div className='panelbox col-md-10 pt-2 ' >
                    <h2 className=''>Dashboard<span className='controlpnl'>Control pannel</span></h2>
                    <div className="cards">
                    <div className='panelcard4'>
                            <img src={court} alt="" style={{ width: '50px', position: 'relative', left: '210px', top: '60px', opacity: '.5' }} />
                            <div className='card-headers'>
                                <h3>0</h3>
                                <h5>Deleted Courts</h5>
                            </div>
                            <div className="info">
                                more info
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default AdminDashboars




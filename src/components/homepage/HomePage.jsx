import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const [courts, setCourts] = useState([])
    useEffect(() => {
        const courtdata = async () => {
            try {
                const court = await axios.get('https://new-be-u7li.onrender.com/court')
                
                

                console.log(court.data);
                setCourts(court.data)
            } catch (error) {
                console.log(error);
            }
        }
        courtdata();
    }, [])
    const navigate=useNavigate()
    const courtdetails=async (id)=>{
        const courtItem=await axios.get(`https://new-be-u7li.onrender.com/court/singleCourt/${id}`)
        // const courtItem=await axios.get(`https://new-be-u7li.onrender.com/court/singleCourt/${id}`)

        console.log(courtItem);
        navigate(`/court/${id}`,{ state: { court: courtItem.data } })
    }
    return (
        <div className='d-flex justify-content-center flex-wrap gap-4 pt-2 pb-3 '>
        {courts.length > 0 ? courts.map((data, index) => (
            <Card  onClick={()=>courtdetails(data._id)} key={index} style={{ width: '15rem',cursor:"pointer" }} className='text-center d-flex justify-content-center mt-1 '>
                <Card.Img style={{ width: '15rem', height: '10rem', alignSelf: 'center' }}
                    variant="center"
                    src={data.pics[0]} />
                <Card.Body>
                    <Card.Title>{data.CourtName}</Card.Title>
                    <Card.Text>
                        {/* Add any additional text or details here */}
                        <span className='text-capitalize'>{data.Location}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        )) : 
            <h1>No court available</h1>
        }
    </div>

    )
}

export default HomePage
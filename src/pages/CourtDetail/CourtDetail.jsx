// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import './courtdetail.css';
// import Football from '../../assets/football.svg';
// import Cricket from '../../assets/cricket.svg';
// import Tennis from '../../assets/tennis.svg';
// import Badminton from '../../assets/badminton.svg';
// import Hockey from '../../assets/hockey.svg';
// import Basketball from '../../assets/basketball.svg';
// import chekk from '../../assets/chekk.svg'
// import Bookmodal from '../../components/bookingmodal/Bookmodal';
// import axios from 'axios';

// const CourtDetail = () => {
//   const location = useLocation();
//   const { court } = location.state || {};
//   const { CourtName, Location, pics, AvailableSports, Amenities } = court || {};

//   const sportImages = { Football, Cricket, Tennis, Badminton, Hockey, Basketball };

//   if (!court) {
//     return <div>Court data is not available</div>;
//   }
//   const [modalopen, setModalOpen] = useState(false)
//   const [selectdate, setSelectDate] = useState()
//   const[availableSlot,setAvailableslot]=useState([])

//   useEffect(() => {
//     getSlotdata()
//   }, [selectdate])
//   const getSlotdata = async () => {
//     const Id = court._id
//     console.log(Id);
//     const slotdata = await axios.get('http://localhost:3000/Slot/', {
//       params: {
//         date: selectdate,
//         id: Id
//       }
//     })
//     console.log(slotdata.data);
//        if(slotdata.data){
//         setAvailableslot(slotdata.data)
//        }else{

//        }
//        console.log(availableSlot);
//   }
//   return (

//     <div className="courtdetails ">
//       <h1 className="text-capitalize mt-1">{CourtName}</h1>
//       <div className="first-box row">
//         <div className="img-place col-lg-8">
//           <h4 >{Location}</h4>

//           <div className="court-pic">
//             <img src={pics[0]} alt={`${CourtName} court`} />
//           </div>
//           <div className="sports">
//             <h5 className="text-capitalize mt-1">Sports Available</h5>
//             <div className="sports-available">
//               {AvailableSports.map((sport, index) => (
//                 <div className="sports-img-box" key={index}>
//                   <img src={sportImages[sport]} alt={sport} />
//                   <small>{sport}</small>
//                 </div>
//               ))}
//             </div>

//           </div>
//           <div className="court-amenities">
//             <h5 className="text-capitalize mt-1">Amenities</h5>
//             <div className='amenities-available'>
//               {Amenities.map(item => (
//                 <div className='court-amenities-box'>
//                   <img src={chekk} alt="che" />
//                   <small>{item}</small>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//         <div className="court-book col-lg-4">
//           <button className="text-capitalize" onClick={() => setModalOpen(true)}>Book Now</button>
//           <div className=' border rounded-2 mt-2 px-3'>
//             <h5 className='mt-2'>Price:</h5>
//             <p className='fw-bold'>{court.Price}<small>/Hour</small></p>
//           </div>
//           <div className=' border rounded-2 mt-2 px-3'>
//             <h5>Court Type</h5>
//             <p>{court.CourtType}</p>
//           </div>
//           <div className=' border rounded-2 mt-2 px-3'>
//             <h5>Address</h5>
//             <p>{court.AddressLine1}</p>
//             <p>{court.AddressLine2}</p>
//             <p>{court.AddressLine3}</p>
//           </div>
//         </div>
//       </div>
//       {modalopen && <Bookmodal CloseModal={() => setModalOpen(false)} heading={`${court.CourtName}`} >
//         <div className='d-flex flex-column justify-content-center w-100 p-2'>
//           <label className='text-black' htmlFor="">Select Date</label>
//           <input type="date" className='px-2 border rounded-1'
//             min={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setSelectDate(e.target.value)} />
//         </div>
//         <div>
//           <label htmlFor="">Available Slot</label>
//           <div>
//              {availableSlot && availableSlot.map(slot=>(
//                <span>{slot.name}</span>
//              ))}
//           </div>
//         </div>
//       </Bookmodal>}
//     </div>


//   );
// };

// export default CourtDetail;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './courtdetail.css';
import Football from '../../assets/football.svg';
import Cricket from '../../assets/cricket.svg';
import Tennis from '../../assets/tennis.svg';
import Badminton from '../../assets/badminton.svg';
import Hockey from '../../assets/hockey.svg';
import Basketball from '../../assets/basketball.svg';
import chekk from '../../assets/chekk.svg';
import Bookmodal from '../../components/bookingmodal/Bookmodal';
import axios from 'axios';

const CourtDetail = () => {
  const location = useLocation();
  const { court } = location.state || {};
  const { CourtName, Location, pics, AvailableSports, Amenities } = court || {};

  const sportImages = { Football, Cricket, Tennis, Badminton, Hockey, Basketball };

  if (!court) {
    return <div>Court data is not available</div>;
  }

  const [modalopen, setModalOpen] = useState(false);
  const [selectdate, setSelectDate] = useState('');
  const [availableSlot, setAvailableslot] = useState([]);
  const [selectedslot, setSelectedSlot] = useState([])
  const [price, setPrice] = useState()

  useEffect(() => {
    if (selectdate) {
      setAvailableslot([])
      setSelectedSlot([])
      setPrice(null)
      getSlotdata();
    }
  }, [selectdate]);
  useEffect(() => {
    console.log('Available slots updated:', availableSlot);
  }, [availableSlot]);

  const getSlotdata = async () => {
    const Id = court._id;
    try {
      const response = await axios.get('http://localhost:3000/Slot/', {
        params: {
          date: selectdate,
          id: Id
        }
      });
      console.log('Slot data fetched:', response.data);
      if (response.data) {
        setAvailableslot(response.data);
      } else {
        setAvailableslot([]);
      }
    } catch (error) {
      console.error('Error fetching slot data:', error);
      setAvailableslot([]);
    }
  };

  const Functionselectedslot = (slot) => {
    console.log('slot', slot);
    setSelectedSlot([...selectedslot, slot]);
    console.log('selectedslot', selectedslot);
    console.log('availableslot', availableSlot);
    const newSlot = availableSlot.filter((ele) => ele.slot.id !== slot.slot.id);
    console.log('newslot', newSlot);
    setAvailableslot(newSlot);
  }
  const removeslotfunction = (slot) => {
    const selectslot = selectedslot.filter((item) => item.slot.id !== slot.slot.id);
    setSelectedSlot(selectslot)
    setAvailableslot([...availableSlot, slot])

  }
  useEffect(() => {
    console.log(court.Price);
    let price = selectedslot.length * (court.Price)
    console.log('price', price);
    setPrice(price)
  }, [selectedslot])

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    })
  }
  const booking = async () => {
    if (selectedslot.length > 0) {
      const token = localStorage.getItem('token')
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        ErrorToast("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const slotIds = selectedslot.map((ele) => { return ele._id })
      const orderResponse = await axios.post('http://localhost:3000/Order', {
        amount: price,
        currency: 'INR',
        slotId: slotIds,
        courtId: court._id
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (!orderResponse) {
        alert("Server error. Are you online?");
        return;
      }
      console.log(orderResponse.data);
      console.log(orderResponse);

      const { amount, _id: order_id, currency, receipt } = orderResponse.data
      const options = {
        key: process.env.REACT_APP_RP_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Green-grid Pvt.Ltd",
        description: "Booking Payment",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            receipt,
            slotIds,
            courtId:court._id,
            date:selectdate
          }
          const result=axios.post('')
        }
      }
    }

  }
  return (
    <div className="courtdetails">
      <h1 className="text-capitalize mt-1">{CourtName}</h1>
      <div className="first-box row">
        <div className="img-place col-lg-8">
          <h4>{Location}</h4>
          <div className="court-pic">
            <img src={pics[0]} alt={`${CourtName} court`} />
          </div>
          <div className="sports">
            <h5 className="text-capitalize mt-1">Sports Available</h5>
            <div className="sports-available">
              {AvailableSports.map((sport, index) => (
                <div className="sports-img-box" key={index}>
                  <img src={sportImages[sport]} alt={sport} />
                  <small>{sport}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="court-amenities">
            <h5 className="text-capitalize mt-1">Amenities</h5>
            <div className='amenities-available'>
              {Amenities.map((item, index) => (
                <div className='court-amenities-box' key={index}>
                  <img src={chekk} alt="check" />
                  <small>{item}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="court-book col-lg-4">
          <button className="text-capitalize" onClick={() => setModalOpen(true)}>Book Now</button>
          <div className='border rounded-2 mt-2 px-3'>
            <h5 className='mt-2'>Price:</h5>
            <p className='fw-bold'>{court.Price}<small>/Hour</small></p>
          </div>
          <div className='border rounded-2 mt-2 px-3'>
            <h5>Court Type</h5>
            <p>{court.CourtType}</p>
          </div>
          <div className='border rounded-2 mt-2 px-3'>
            <h5>Address</h5>
            <p>{court.AddressLine1}</p>
            <p>{court.AddressLine2}</p>
            <p>{court.AddressLine3}</p>
          </div>
        </div>
      </div>
      {modalopen && <Bookmodal CloseModal={() => setModalOpen(false)} heading={`${court.CourtName}`}>
        <div className='d-flex flex-column justify-content-center w-100 p-2'>
          <label className='text-black' htmlFor="selectDate">Select Date</label>
          <input
            type="date"
            id="selectDate"
            className='px-2 border rounded-1'
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectDate(e.target.value)}
          />
        </div>
        <div className='p-2'>
          <label className='text-black' htmlFor="availableSlot">Available Slots</label>
          <div id="availableSlot" >
            {availableSlot.length > 0 ? availableSlot.map((slot, index) => (
              <span key={index} onClick={() => Functionselectedslot(slot)}>{slot.slot.name}</span>

            )) : <span className='bg-danger-subtle text-black'>No slots available for the selected date.</span>}
          </div>
          <div className='border border-2  mt-2 rounded'>
            <label className='text-black' htmlFor="">Selected  Slot</label>
            <div className='slotselected'>
              {selectedslot.length > 0 ? (selectedslot.map((slot, index) => (
                <span className='' key={index} onClick={() => removeslotfunction(slot)}>{slot.slot.name}</span>
              ))) : <span className='bg-danger-subtle text-black'>yet not selected</span>}
            </div>
          </div>
          <div className=''>
            {selectedslot.length > 0 &&
              <div className='d-flex flex-column'>
                <label className='text-black' htmlFor="">Price:</label>
                <span className='fw-bold'>{price}/-</span>
              </div>}

          </div>

        </div>
        <div className=' p-1 d-flex justify-content-center flex-wrap'>
          <button className='btn btn-info mx-2' onClick={() => booking()}>Book</button>
          <button className='btn btn-secondary'>Cancel</button>
        </div>
      </Bookmodal>}
    </div>
  );
};

export default CourtDetail;
